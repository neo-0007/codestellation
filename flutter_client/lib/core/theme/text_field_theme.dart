import 'package:flutter/material.dart';

class CTextFormFieldTheme {
  // Static method for light theme
  static InputDecorationTheme lightTheme = InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: const Color.fromARGB(255, 203, 213, 219), width: 2),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: const Color.fromARGB(255, 203, 213, 219), width: 2),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: const Color.fromARGB(255, 156, 163, 175), width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: Colors.red, width: 2), 
    ),

    filled: true,
    fillColor: Color.fromARGB(255,249, 250, 251),
    hintStyle: TextStyle(color: const Color.fromARGB(146, 55, 65, 81),fontSize: 15), 
  );

  // Static method for dark theme 
  static InputDecorationTheme darkTheme = InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: Colors.white, width: 2),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: Colors.white, width: 2),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: Colors.white, width: 2),
    ),
    hintStyle: TextStyle(color: Colors.white70), 
  );
}
