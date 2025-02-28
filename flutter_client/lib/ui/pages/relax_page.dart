import 'dart:async';
import 'package:flutter/material.dart';

class BreathingExerciseScreen extends StatefulWidget {
  const BreathingExerciseScreen({super.key});

  @override
  _BreathingExerciseScreenState createState() =>
      _BreathingExerciseScreenState();
}

class _BreathingExerciseScreenState extends State<BreathingExerciseScreen> {
  double _size = 100;
  bool _isExpanding = true;
  String _breathText = "Breathe In";
  int _remainingTime = 30; 
  Timer? _timer;
  Timer? _breathingTimer;

  @override
  void initState() {
    super.initState();
    _startBreathing();
    _startTimer();
  }

  void _startBreathing() {
    _breathingTimer = Timer.periodic(Duration(seconds: 4), (timer) {
      setState(() {
        _size = _isExpanding ? 200 : 100;
        _breathText = _isExpanding ? "Breathe In" : "Breathe Out";
        _isExpanding = !_isExpanding;
      });
    });
  }

  void _startTimer() {
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (_remainingTime > 0) {
        setState(() {
          _remainingTime--;
        });
      } else {
        _timer?.cancel();
        _breathingTimer?.cancel();
        Navigator.pop(context); 
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _breathingTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              _breathText,
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 20),
            AnimatedContainer(
              duration: Duration(seconds: 4),
              curve: Curves.easeInOut,
              width: _size,
              height: _size,
              decoration: BoxDecoration(
                color: Colors.blue.withOpacity(0.6),
                shape: BoxShape.circle,
              ),
            ),
            SizedBox(height: 40),
            Text(
              "Time Left: $_remainingTime sec",
              style: TextStyle(
                fontSize: 18,
                color: Colors.white70,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
