import 'package:flutter/material.dart';
import 'package:flutter_client/ui/widgets/auth_form_field.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 25),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CAuthFormField(hintText: 'Email', controller: emailController),
              SizedBox(
                height: 20,
              ),
              CAuthFormField(
                hintText: 'Password',
                controller: passwordController,
                obscureText: true,
              ),
              SizedBox(height: 20,),
              BlueButton(text: 'Login', onPressed: (){})
            ],
          ),
        ),
      ),
    );
  }
}
