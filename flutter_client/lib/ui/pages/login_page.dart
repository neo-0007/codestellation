import 'package:flutter/material.dart';
import 'package:flutter_client/ui/pages/register_page.dart';
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
              SizedBox(
                height: 20,
              ),
              BlueButton(
                text: 'Login',
                onPressed: () {},
              ),
              SizedBox(height: 20,),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Don't have an account?  ",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 14,
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return RegisterPage();
                          },
                        ),
                        (route) => true,
                      );
                    },
                    child: const Text(
                      "Register",
                      style: TextStyle(
                        color: Colors.blue,
                        fontSize: 14,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
