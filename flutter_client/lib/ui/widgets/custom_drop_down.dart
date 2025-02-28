import 'package:flutter/material.dart';

class CDropdownButtonTheme {
  // Static method for light theme
  static DropdownButtonFormField<String> lightTheme(
    BuildContext context,
    List<String> items,
    String? selectedValue,
    String hintText,
    void Function(String?) onValueChanged) {
  return DropdownButtonFormField<String>(
    value: selectedValue,
    hint: Text(hintText),
    onChanged: onValueChanged,
    decoration: InputDecoration(
      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      filled: true,
      fillColor: Color.fromARGB(255, 249, 250, 251),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
            color: Color.fromARGB(255, 203, 213, 219), width: 2),
      ),
    ),
    items: items.map((String item) {
      return DropdownMenuItem<String>(
        value: item,
        child: Text(
          item,
          style: TextStyle(
            color: Theme.of(context).textTheme.bodySmall?.color,
          ),
        ),
      );
    }).toList(),
    style: TextStyle(color: Theme.of(context).textTheme.bodySmall?.color),
  );
}


  // Static method for dark theme
  static DropdownButtonFormField<String> darkTheme(BuildContext context,
      List<String> items, String? selectedValue, String hintText) {
    return DropdownButtonFormField<String>(
      value: selectedValue,
      hint: Text(hintText),
      onChanged: (String? newValue) {
        selectedValue = newValue;
      },
      decoration: InputDecoration(
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        filled: true,
        fillColor: Color.fromARGB(255, 50, 50, 50),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: Colors.white, width: 2),
        ),
      ),
      items: items.map((String item) {
        return DropdownMenuItem<String>(
          value: item,
          child: Text(
            item,
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        );
      }).toList(),
      style: TextStyle(color: Colors.white),
    );
  }
}
