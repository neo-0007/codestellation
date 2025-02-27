import 'package:flutter/material.dart';
import 'package:flutter_client/core/theme/text_field_theme.dart';
import 'package:flutter_client/ui/pages/home_page.dart';
import 'package:flutter_client/ui/pages/login_page.dart';
import 'package:flutter_client/ui/pages/register_page.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        inputDecorationTheme: CTextFormFieldTheme.lightTheme
      ),
      home: Scaffold(
        body: HomePage(),
      ),
    );
  }
}