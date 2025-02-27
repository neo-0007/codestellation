import 'package:flutter/material.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';
import 'package:flutter_client/ui/widgets/custom_drop_down.dart';

class RegisterPage2 extends StatefulWidget {
  const RegisterPage2({super.key});

  @override
  State<RegisterPage2> createState() => _RegisterPage2State();
}

class _RegisterPage2State extends State<RegisterPage2> {
  final TextEditingController dateOfBirthController = TextEditingController();
  String? selectedGender; // Must be null initially to avoid dropdown assertion error

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
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              /// Gender Dropdown (Fix applied)
              CDropdownButtonTheme.lightTheme(
                context,
                ['Male', 'Female', 'Other'],
                selectedGender, // Should be null if not selected
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
              BlueButton(text: 'Register', onPressed: (){})
            ],
          ),
        ),
      ),
    );
  }
}
