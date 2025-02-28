import 'package:flutter/material.dart';

enum MoodType {
  happy,
  sad,
  amazed,
  angry,
  disappointed,
  love,
  numb,
  shy,
  sleepy,
  tired
}

class MoodProvider extends ChangeNotifier {
  MoodType? _mood = MoodType.angry;

  MoodType? get mood => _mood;

  bool get hasMood => _mood != null;

  /// Updates the current mood and notifies listeners
  void updateMood(MoodType newMood) {
    print('Updating mood....');
    if (_mood != newMood) {
      _mood = newMood;
      notifyListeners();
    }
  }

  /// Resets the mood to null and notifies listeners
  void resetMood() {
    _mood = null;
    notifyListeners();
  }
}
