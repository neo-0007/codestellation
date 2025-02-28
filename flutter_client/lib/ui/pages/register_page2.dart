import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_client/models/user.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';
import 'package:flutter_client/ui/widgets/custom_drop_down.dart';
import 'package:flutter_client/ui/pages/login_page.dart';

class RegisterPage2 extends StatefulWidget {
  const RegisterPage2({
    super.key,
    required this.name,
    required this.email,
    required this.password,
    required this.phone,
  });

  final String name;
  final String email;
  final String password;
  final String phone;

  @override
  State<RegisterPage2> createState() => _RegisterPage2State();
}

class _RegisterPage2State extends State<RegisterPage2> {
  final TextEditingController dateOfBirthController = TextEditingController();
  String? selectedGender;
  bool isLoading = false;

  Future<void> _registerUser() async {
    if (!_validateInputs()) return;

    setState(() {
      isLoading = true;
    });

    try {
      final response = await _sendRegistrationRequest();
      _handleRegistrationResponse(response);
    } catch (e) {
      _handleError(e);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  bool _validateInputs() {
    if (selectedGender == null || dateOfBirthController.text.isEmpty) {
      _showMessage("Please select gender and date of birth.");
      return false;
    }

    if (!_isValidDate(dateOfBirthController.text)) {
      _showMessage("Invalid date format. Please use dd/MM/yyyy.");
      return false;
    }

    return true;
  }

  bool _isValidDate(String date) {
    try {
      List<String> dateParts = date.split('/');
      if (dateParts.length != 3) return false;

      int day = int.parse(dateParts[0]);
      int month = int.parse(dateParts[1]);
      int year = int.parse(dateParts[2]);

      // Check if the date is valid
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
        return false;
      }

      // Try parsing the date
      DateTime.parse(
          "$year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}");
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<http.Response> _sendRegistrationRequest() async {
    String formattedDob = _formatDate(dateOfBirthController.text);
    print("📅 Original Date: ${dateOfBirthController.text}");
    print("📅 Formatted Date: $formattedDob");

    try {
      DateTime parsedDate = DateTime.parse(formattedDob);
      print("📅 Parsed Date: $parsedDate");
    } catch (e) {
      print("❌ Invalid Date: $e");
      _showMessage("Invalid date. Please enter a valid date.");
      throw Exception("Invalid date format");
    }

    User user = User(
      name: widget.name,
      email: widget.email,
      password: widget.password,
      phone: int.parse(widget.phone),
      gender: selectedGender!,
      dob: DateTime.parse(formattedDob),
    );

    print("📌 User Object: $user");
    print("📌 JSON Payload: ${user.toJsonString()}");

    return await http.post(
      Uri.parse(
          'http://localhost:3000/api/auth/register'),
      headers: {"Content-Type": "application/json"},
      body: user.toJsonString(),
    );
  }

  void _handleRegistrationResponse(http.Response response) {
    if (response.statusCode == 201) {
      _showMessage("Registration Successful!", isSuccess: true);
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
        (route) => false,
      );
    } else {
      final responseBody = jsonDecode(response.body);
      final errorMessage = responseBody['message'] ?? "Failed to register.";
      _showMessage(errorMessage);
    }
  }

  void _handleError(dynamic error) {
    print("❌ Error Occurred: $error");
    _showMessage("Error: $error");
  }

  String _formatDate(String date) {
    List<String> dateParts = date.split('/');
    int day = int.parse(dateParts[0]);
    int month = int.parse(dateParts[1]);
    int year = int.parse(dateParts[2]);

    // Ensure two digits for month and day
    String formattedDay = day.toString().padLeft(2, '0');
    String formattedMonth = month.toString().padLeft(2, '0');

    return "$year-$formattedMonth-$formattedDay";
  }

  void _showMessage(String message, {bool isSuccess = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isSuccess ? Colors.green : Colors.red,
      ),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (pickedDate != null) {
      setState(() {
        dateOfBirthController.text =
            "${pickedDate.day}/${pickedDate.month}/${pickedDate.year}";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              /// Gender Dropdown
              CDropdownButtonTheme.lightTheme(
                context,
                ['Male', 'Female', 'Other'],
                selectedGender,
                'Gender',
                (String? newValue) {
                  setState(() {
                    selectedGender = newValue;
                  });
                },
              ),

              const SizedBox(height: 20),

              /// Date of Birth Picker
              TextField(
                controller: dateOfBirthController,
                readOnly: true,
                decoration: InputDecoration(
                  labelText: "Date of Birth",
                  hintText: "Select your birth date",
                  border: OutlineInputBorder(),
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.calendar_today),
                    onPressed: () => _selectDate(context),
                  ),
                ),
              ),

              const SizedBox(height: 20),

              /// Register Button
              isLoading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Colors.white,
                      ),
                    )
                  : BlueButton(
                      text: isLoading ? 'Registering...' : 'Register',
                      onPressed: () {
                        isLoading ? null : _registerUser();
                      },
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
