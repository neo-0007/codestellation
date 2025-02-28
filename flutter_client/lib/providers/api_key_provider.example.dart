import 'package:flutter/material.dart';

class ApiKeyProvider extends ChangeNotifier {
  String geminiApiKey = "YOUR-GEMINI-API-KEY";

  String get geminiKey => geminiApiKey;
}
