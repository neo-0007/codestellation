import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:provider/provider.dart';
import 'package:flutter_client/providers/api_key_provider.dart';
import 'package:flutter_client/providers/mood_provider.dart';

class MusicRecommendationScreen extends StatefulWidget {
  final MoodType userMood;

  const MusicRecommendationScreen({super.key, required this.userMood});

  @override
  State<MusicRecommendationScreen> createState() => _MusicRecommendationScreenState();
}

class _MusicRecommendationScreenState extends State<MusicRecommendationScreen> {
  List<Map<String, String>> musicTracks = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchMusicRecommendations();
  }

  Future<void> _fetchMusicRecommendations() async {
  final apiKey = Provider.of<ApiKeyProvider>(context, listen: false).geminiKey;
  final model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: apiKey);

  print("🔍 Fetching songs for mood: ${widget.userMood.name}");

  String prompt =
      "Recommend 5 music tracks for someone feeling ${widget.userMood.name}. "
      "Format: Song Title - Artist";

  try {
    final response = await model.generateContent([Content.text(prompt)]);

    if (response.text == null || response.text!.trim().isEmpty) {
      print("🚨 Empty response from Gemini!");
      setState(() {
        isLoading = false;
      });
      return;
    }

    String rawText = response.text!;
    print("✅ Gemini Response: $rawText");

    // 🛠️ New Parsing Logic: Split by newlines
    List<String> lines = rawText.split("\n").map((line) => line.trim()).toList();
    
    musicTracks = lines
        .where((line) => line.contains(" - ")) // Only keep lines with " - "
        .map((line) {
          List<String> parts = line.split(" - ");
          return {"title": parts[0].trim(), "artist": parts[1].trim()};
        })
        .toList();

    print("🎵 Extracted Tracks: $musicTracks");

    setState(() {
      isLoading = false;
    });
  } catch (e) {
    print("❌ Error fetching music: $e");
    setState(() {
      musicTracks = [
        {"title": "Default Angry Track", "artist": "Unknown"}
      ];
      isLoading = false;
    });
  }
}



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("🎵 Mood-Based Music",style: TextStyle(
          color: Colors.white
        ),),
        backgroundColor: Colors.blue,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: ListView.builder(
                itemCount: musicTracks.length,
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 5,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    child: ListTile(
                      leading: const Icon(Icons.music_note, size: 40, color: Colors.deepPurple),
                      title: Text(
                        musicTracks[index]["title"]!,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(
                        "by ${musicTracks[index]["artist"]!}",
                        style: const TextStyle(fontSize: 16, color: Colors.grey),
                      ),
                    ),
                  );
                },
              ),
            ),
    );
  }
}
