import 'package:flutter/material.dart';

class CAuthFormField extends StatelessWidget {
  const CAuthFormField({
    super.key,
    required this.hintText,
    this.obscureText = false,
    this.validator,
    required this.controller,
  });

  final String hintText;
  final bool obscureText;
  final String? Function(String?)? validator;
  final TextEditingController? controller;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      child: TextFormField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          hintText: hintText,
          errorStyle: TextStyle(fontSize: 10),
        ),
        validator: validator,
      ),
    );
  }
}
