import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter/material.dart';
import 'package:flutter_client/providers/api_key_provider.dart';
import 'package:flutter_client/providers/mood_provider.dart';
import 'package:provider/provider.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:google_generative_ai/google_generative_ai.dart';

class VoiceChatPage extends StatefulWidget {
  final Function(MoodType mood, int stressLevel)? onMoodAnalyzed;

  const VoiceChatPage({super.key, this.onMoodAnalyzed});

  @override
  State<VoiceChatPage> createState() => _VoiceChatPageState();
}

class _VoiceChatPageState extends State<VoiceChatPage> {
  bool isSpeaking = false;
  late stt.SpeechToText _speechToText;
  String text = "Press the button and start speaking...";
  String fullSpeech = "";
  List<Map<String, String>> chatHistory = [];


  @override
  void initState() {
    super.initState();
    _speechToText = stt.SpeechToText();
  }

 @override
void dispose() {
  _analyzeMood().then((result) {
    widget.onMoodAnalyzed?.call(result.$1, result.$2); // Send mood and stress level back
  });

  super.dispose();
}


 Future<(MoodType, int)> _analyzeMood() async {
  if (chatHistory.isEmpty || !mounted) {
    print("❌ Skipping mood analysis: Chat history empty or widget unmounted.");
    return (MoodType.numb, 0);
  }

  print("📢 Analyzing mood... Sending chat history to Gemini API");

  try {
    final apiKey = Provider.of<ApiKeyProvider>(context, listen: false).geminiKey;
    final model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: apiKey);

    String conversation = chatHistory.map((message) {
      return message.containsKey("user")
          ? "User: ${message["user"]}"
          : "Bot: ${message["bot"]}";
    }).join("\n");

    final response = await model.generateContent([
      Content.text(
          "Analyze the following conversation and determine the user's mood. "
          "Return only one of these moods: happy, sad, amazed, angry, disappointed, love, numb, shy, sleepy, tired. "
          "If unsure, return 'numb'.\n\n"
          "Also, provide an estimated stress level as a percentage (0-100%). "
          "Example output: 'Mood: sad, Stress: 80%' \n\n$conversation")
    ]);

    print("📩 API Response: ${response.text}");

    String moodResponse = response.text?.toLowerCase() ?? "mood: numb, stress: 0%";

    // Extract Mood
    MoodType detectedMood = MoodType.numb;
    for (var mood in MoodType.values) {
      if (moodResponse.contains(mood.toString().split('.').last)) {
        detectedMood = mood;
        break;
      }
    }

    // Extract Stress Percentage
    RegExp stressRegex = RegExp(r"stress:\s*(\d+)%", caseSensitive: false);
    int stressLevel = 0;
    Match? match = stressRegex.firstMatch(moodResponse);
    if (match != null) {
      stressLevel = int.parse(match.group(1)!);
    }

    print("\n✅ Mood Analyzed: ${detectedMood.name.toUpperCase()}, Stress: $stressLevel%");

    return (detectedMood, stressLevel);
  } catch (e) {
    print("\n❌ Error analyzing mood: $e\n");
    return (MoodType.numb, 0);
  }
}


  void _toggleRecording() async {
    if (isSpeaking) {
      setState(() {
        isSpeaking = false;
        text = "Processing...";
      });
      await _speechToText.stop();

      if (fullSpeech.isNotEmpty) {
        chatHistory.add({"user": fullSpeech});
        print("\ud83d\udde3\ufe0f User: $fullSpeech");
        await _sendToGemini(fullSpeech);
        fullSpeech = "";
      } else {
        setState(() {
          text = "No speech detected.";
        });
      }
    } else {
      bool available = await _speechToText.initialize();
      if (available) {
        setState(() {
          isSpeaking = true;
          text = "Listening...";
          fullSpeech = "";
        });

        _speechToText.listen(
          onResult: (result) {
            setState(() {
              text = result.recognizedWords;
              fullSpeech = result.recognizedWords;
            });
          },
          listenOptions: stt.SpeechListenOptions(
            cancelOnError: true,
          ),
        );
      } else {
        setState(() {
          isSpeaking = false;
          text = "Speech recognition not available";
        });
      }
    }
  }

  Future<void> _sendToGemini(String userText) async {
    try {
      final apiKey = Provider.of<ApiKeyProvider>(context, listen: false).geminiKey;
      final model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: apiKey);
      final response = await model.generateContent([
        Content.text(
            'An AI-powered mental health assistant. Provide emotional support and friendly responses. Keep answers concise and human-like.'),
        Content.text(userText),
      ]);
      String botResponse = response.text ?? "No response";

      setState(() {
        chatHistory.add({"bot": botResponse});
        text = "Press the button and start speaking...";
      });

      print("\ud83e\udd16 Gemini: $botResponse");
    } catch (e) {
      setState(() {
        chatHistory.add({"bot": "Error: Failed to get response"});
        text = "Error processing request.";
      });
      print("\ud83e\udd16 Gemini: Error: Failed to get response");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        reverse: true,
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                text,
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              Divider(),
              SizedBox(height: 10),
              ...chatHistory.map((message) {
                bool isUser = message.containsKey("user");
                return Container(
                  margin: EdgeInsets.symmetric(vertical: 5),
                  padding: EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: isUser ? Colors.blueAccent : Colors.grey[300],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  alignment:
                      isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Text(
                    isUser ? "${message['user']}" : "${message['bot']}",
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: isUser ? FontWeight.bold : FontWeight.normal,
                      color: isUser ? Colors.white : Colors.black,
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: AvatarGlow(
        animate: isSpeaking,
        glowColor: Colors.blue,
        child: FloatingActionButton(
          backgroundColor: Colors.blue,
          onPressed: _toggleRecording,
          child: Icon(
            isSpeaking ? Icons.stop : Icons.mic,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
