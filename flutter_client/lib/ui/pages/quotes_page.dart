import 'package:flutter/material.dart';
import 'package:flutter_client/providers/api_key_provider.dart';
import 'package:flutter_client/services/quote_generator.dart';
import 'package:provider/provider.dart';

class QuotesScreen extends StatefulWidget {
  final String mood;

  const QuotesScreen({required this.mood, super.key});

  @override
  _QuotesScreenState createState() => _QuotesScreenState();
}

class _QuotesScreenState extends State<QuotesScreen> {
  String quote = "Loading...";
  String author = "";
  List<Color> gradientColors = [Colors.grey.shade800, Colors.grey.shade500];
  late QuoteGenerator quoteGenerator;

  @override
  void initState() {
    super.initState();
    final apiKey = Provider.of<ApiKeyProvider>(context, listen: false).geminiKey;
    quoteGenerator = QuoteGenerator(apiKey);
    fetchQuote();
  }

  Future<void> fetchQuote() async {
    final data = await quoteGenerator.fetchQuote(widget.mood);
    setState(() {
      quote = data["quote"];
      author = data["author"];
      gradientColors = data["colors"];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradientColors,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedOpacity(
                  opacity: 1.0,
                  duration: const Duration(seconds: 2),
                  child: Text(
                    quote,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontStyle: FontStyle.italic,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Text(
                  "- $author",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 30),
                ElevatedButton(
                  onPressed: fetchQuote,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white24,
                    padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
                  ),
                  child: const Text("New Quote", style: TextStyle(color: Colors.white)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
