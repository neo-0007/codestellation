import 'package:flutter/material.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/happy.jpg',
                height: 200,
              ),
              SizedBox(height: 20,),
              BlueButton(text: 'Voice Chat', onPressed: (){})
            ],
          ),
        ),
      ),
    );
  }
}
