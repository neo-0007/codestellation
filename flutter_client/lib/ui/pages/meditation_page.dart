import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:provider/provider.dart';
import 'package:flutter_client/providers/mood_provider.dart';
import 'package:flutter_client/providers/api_key_provider.dart';

class MeditationScreen extends StatefulWidget {
  final MoodType userMood;

  const MeditationScreen({super.key, required this.userMood});

  @override
  State<MeditationScreen> createState() => _MeditationScreenState();
}

class _MeditationScreenState extends State<MeditationScreen> {
  late PageController _pageController;
  List<String> meditationSteps = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _fetchMeditationGuide();
  }

  Future<void> _fetchMeditationGuide() async {
    final apiKey = Provider.of<ApiKeyProvider>(context, listen: false).geminiKey;
    final model = GenerativeModel(model: 'gemini-2.0-flash', apiKey: apiKey);

    String prompt =
        "Provide a guided meditation in 5-7 steps tailored for someone feeling ${widget.userMood.name}. "
        "Each step should be clear and concise. Separate each step with '##'. "
        "Example:\n"
        "1. Close your eyes and take a deep breath.##"
        "2. Focus on the feeling of the air entering your lungs.##"
        "3. Let go of any tension in your body.";

    try {
      final response = await model.generateContent([Content.text(prompt)]);
      String rawText = response.text ?? "";
      setState(() {
        meditationSteps = rawText.split("##").map((step) => step.trim()).toList();
        isLoading = false;
      });
    } catch (e) {
      print("Error fetching meditation guide: $e");
      setState(() {
        meditationSteps = ["Sorry, we couldn't load the meditation guide."];
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blueGrey, Colors.teal],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: isLoading
            ? const Center(child: CircularProgressIndicator(color: Colors.white))
            : Column(
                children: [
                  const SizedBox(height: 60),
                  const Text(
                    "🧘 Guided Meditation",
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  Expanded(
                    child: PageView.builder(
                      controller: _pageController,
                      itemCount: meditationSteps.length,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 30),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                "Step ${index + 1}",
                                style: const TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              const SizedBox(height: 20),
                              Text(
                                meditationSteps[index],
                                style: const TextStyle(
                                  fontSize: 18,
                                  color: Colors.white70,
                                  fontStyle: FontStyle.italic,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 40),
                              if (index == meditationSteps.length - 1) // Show exit button on last step
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: Colors.white,
                                    foregroundColor: Colors.teal[800],
                                    padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12),
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                                  ),
                                  onPressed: () {
                                    Navigator.pop(context);
                                  },
                                  child: const Text("Exit Meditation"),
                                ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: LinearProgressIndicator(
                      value: meditationSteps.isNotEmpty
                          ? (_pageController.hasClients
                              ? _pageController.page! / (meditationSteps.length - 1)
                              : 0)
                          : 0,
                      minHeight: 8,
                      backgroundColor: Colors.white30,
                      valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  ),
                ],
              ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.teal[400],
        onPressed: () {
          if (_pageController.page! < meditationSteps.length - 1) {
            _pageController.nextPage(
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeInOut,
            );
          }
        },
        child: const Icon(Icons.navigate_next, color: Colors.white),
      ),
    );
  }
}
