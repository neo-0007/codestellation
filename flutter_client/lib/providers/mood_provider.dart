import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;

// Define allowed mood types
enum MoodType { happy, sad, amazed, angry, disappointed, love, numb, shy, sleepy,tired, none}

// MoodProvider using ChangeNotifier
class MoodProvider extends ChangeNotifier {
  MoodType? _mood = MoodType.none;

  // Getter to access the current mood
  MoodType? get mood => _mood;

  // Fetch mood from backend
  // Future<void> fetchMood() async {
  //   try {
  //     final response = await http.get(Uri.parse('https://your-api.com/get-mood'));

  //     if (response.statusCode == 200) {
  //       final data = jsonDecode(response.body);
  //       String? moodString = data['mood']; // Example: "happy", "sad", etc.

  //       if (moodString != null && _isValidMood(moodString)) {
  //         _mood = _stringToMoodType(moodString);
  //       } else {
  //         _mood = null;
  //       }

  //       notifyListeners(); // Notify UI to update
  //     } else {
  //       print("Error fetching mood: ${response.statusCode}");
  //     }
  //   } catch (e) {
  //     print("Exception fetching mood: $e");
  //   }
  // }

  // Update the mood
  void updateMood(MoodType newMood) {
    _mood = newMood;
    notifyListeners();
  }

  // Reset mood to null
  void resetMood() {
    _mood = null;
    notifyListeners();
  }

  // Validate if the mood string is in our allowed list
  // bool _isValidMood(String moodString) {
  //   return MoodType.values.any((mood) => mood.toString().split('.').last == moodString);
  // }

  // // Convert string to MoodType enum
  // MoodType? _stringToMoodType(String moodString) {
  //   try {
  //     return MoodType.values.firstWhere((mood) => mood.toString().split('.').last == moodString);
  //   } catch (e) {
  //     return null; // Return null if the mood is invalid
  //   }
  // }
}
