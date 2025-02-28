import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

class QuoteGenerator {
  final String apiKey;

  late GenerativeModel model;

  QuoteGenerator(this.apiKey) {
    model = GenerativeModel(model: "gemini-2.0-flash", apiKey: apiKey);
  }

  Future<Map<String, dynamic>> fetchQuote(String mood) async {
    final prompt = '''
    Generate an inspirational quote based on the mood: "$mood".
    Respond in JSON format:
    {
      "quote": "Your inspiring quote here",
      "author": "Author name"
    }
    '''; 

    try {
      final content = await model.generateContent([Content.text(prompt)]);
      final responseText = content.text;

      if (responseText == null || responseText.isEmpty) {
        throw Exception("Empty response from Gemini API");
      }

      String cleanedResponse = responseText
          .replaceAll("```json", "")
          .replaceAll("```", "")
          .trim();

      final jsonResponse = jsonDecode(cleanedResponse);

      return {
        "quote": jsonResponse["quote"] ?? "No quote found",
        "author": jsonResponse["author"] ?? "Unknown",
        "colors": _getBlueGradient(), // Always blue gradient
      };
    } catch (e) {
      print("Error: $e");
      return {
        "quote": "Error fetching quote.",
        "author": "",
        "colors": _getGreyGradient(), // Grey gradient on error
      };
    }
  }

  /// Returns a blue gradient
  List<Color> _getBlueGradient() {
    return [Colors.blue.shade900, Colors.blue.shade400];
  }

  /// Returns a grey gradient (for errors)
  List<Color> _getGreyGradient() {
    return [Colors.grey.shade800, Colors.grey.shade500];
  }
}
