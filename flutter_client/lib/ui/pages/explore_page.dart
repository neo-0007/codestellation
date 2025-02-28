import 'package:flutter/material.dart';
import 'package:flutter_client/providers/mood_provider.dart';
import 'package:flutter_client/ui/pages/meditation_page.dart';
import 'package:flutter_client/ui/pages/quotes_page.dart';
import 'package:flutter_client/ui/pages/relax_page.dart';
import 'package:provider/provider.dart';

class ExplorePage extends StatelessWidget {
  ExplorePage({super.key});


  final List<Map<String, dynamic>> items = [
    {"title": "Music Session", "icon": Icons.music_note, "color": Colors.blue},
    {"title": "Surprise Me", "icon": Icons.casino, "color": Colors.purple},
    {
      "title": "Meditate",
      "icon": Icons.self_improvement,
      "color": Colors.green
    },
    {"title": "Relax Mode", "icon": Icons.spa, "color": Colors.orange},
  ];

  void _onItemTap(BuildContext context, int index) {
    final moodProvider = Provider.of<MoodProvider>(context, listen: false);
    if (items[index]["title"] == "Relax Mode") {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => BreathingExerciseScreen()),
      );
    } else if (items[index]["title"] == "Surprise Me") {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) {
            return QuotesScreen(mood: moodProvider.mood!.name);
          },
        ),
      );
    }else if(items[index]["title"] == "Meditate"){
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) {
            return MeditationScreen(userMood: moodProvider.mood!,);
          },
        ),
      );
    } 
    
    else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("${items[index]["title"]} coming soon!")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Wellness Activities",
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.blue,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () => _onItemTap(context, index),
              child: Container(
                height: 100,
                margin: EdgeInsets.symmetric(vertical: 12),
                padding: EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: items[index]["color"]!.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: items[index]["color"]!.withOpacity(0.6),
                    width: 2,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(items[index]["icon"],
                        color: items[index]["color"], size: 40),
                    SizedBox(width: 16),
                    Text(
                      items[index]["title"],
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: items[index]["color"],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
