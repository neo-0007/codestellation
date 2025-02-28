import 'dart:async';
import 'package:flutter/material.dart';

class ImageCarousel extends StatefulWidget {
  final List<String> imagePaths; // List of image paths
  final Duration duration; // Duration between image changes

  const ImageCarousel({
    super.key,
    required this.imagePaths,
    this.duration = const Duration(seconds: 3), // Default interval is 3 sec
  });

  @override
  _ImageCarouselState createState() => _ImageCarouselState();
}

class _ImageCarouselState extends State<ImageCarousel> {
  int _currentIndex = 0;
  late Timer _timer;

  @override
  void initState() {
    super.initState();
    _startImageRotation();
  }

  void _startImageRotation() {
    _timer = Timer.periodic(widget.duration, (timer) {
      setState(() {
        _currentIndex = (_currentIndex + 1) % widget.imagePaths.length;
      });
    });
  }

  @override
  void dispose() {
    _timer.cancel(); // Stop the timer when widget is removed
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200, // Adjust size as needed
      width: double.infinity,
      child: AnimatedSwitcher(
        duration: Duration(milliseconds: 500), // Smooth fade effect
        transitionBuilder: (Widget child, Animation<double> animation) {
          return FadeTransition(opacity: animation, child: child);
        },
        child: Image.asset(
          widget.imagePaths[_currentIndex],
          key: ValueKey<int>(_currentIndex), // Unique key to track changes
          fit: BoxFit.cover, // Adjust as needed
        ),
      ),
    );
  }
}
