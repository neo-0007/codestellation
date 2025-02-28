import 'package:flutter/material.dart';
import 'package:flutter_client/core/theme/text_field_theme.dart';
import 'package:flutter_client/ui/pages/explore_page.dart';
import 'package:flutter_client/ui/pages/home_page.dart';
import 'package:flutter_client/ui/pages/login_page.dart';
import 'package:flutter_client/ui/pages/quotes_page.dart';
import 'package:flutter_client/ui/pages/recording_page.dart';
import 'package:flutter_client/ui/pages/register_page.dart';
import 'package:flutter_client/ui/pages/relax_page.dart';
import 'package:flutter_client/ui/pages/voice_chat_page.dart';
import 'package:google_fonts/google_fonts.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        textTheme:GoogleFonts.robotoTextTheme(),
        inputDecorationTheme: CTextFormFieldTheme.lightTheme
      ),
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: HomePage(),
      ),
    );
  }
}