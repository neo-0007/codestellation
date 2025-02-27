import 'package:flutter/material.dart';
import 'package:flutter_client/ui/widgets/auth_form_field.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';

class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController nameController = TextEditingController();
    TextEditingController emailController = TextEditingController();
    TextEditingController phoneController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    TextEditingController confirmPasswordController = TextEditingController();
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CAuthFormField(
                hintText: 'Name',
                controller: nameController,
              ),
              SizedBox(
                height: 10,
              ),
              CAuthFormField(
                hintText: 'Email',
                controller: emailController,
              ),
              SizedBox(
                height: 10,
              ),
              CAuthFormField(
                hintText: 'Phone',
                controller: phoneController,
              ),
              SizedBox(
                height: 10,
              ),
              CAuthFormField(
                hintText: 'Password',
                controller: passwordController,
                obscureText: true,
              ),
              SizedBox(
                height: 10,
              ),
              CAuthFormField(
                hintText: 'Confirm Password',
                controller: confirmPasswordController,
                obscureText: true,
              ),
              SizedBox(
                height: 25,
              ),
              BlueButton(text: 'Continue', onPressed: (){})
            ],
          ),
        ),
      ),
    );
  }
}
