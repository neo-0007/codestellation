import 'package:flutter/material.dart';
import 'package:flutter_client/myapp.dart';
import 'package:flutter_client/providers/api_key_provider.dart';
import 'package:flutter_client/providers/mood_provider.dart';
import 'package:provider/provider.dart';

  void main() {
    WidgetsFlutterBinding.ensureInitialized();
    runApp(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => MoodProvider()),
          ChangeNotifierProvider(create: (_)=> ApiKeyProvider()),
        ],
        child: MyApp(),
      ),
    );
  }
