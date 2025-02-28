import 'package:flutter/material.dart';
import 'package:flutter_client/providers/mood_provider.dart';
import 'package:flutter_client/ui/pages/explore_page.dart';
import 'package:flutter_client/ui/pages/voice_chat_page.dart';
import 'package:flutter_client/ui/widgets/blue_button.dart';
import 'package:flutter_client/ui/widgets/image_carousal.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    final moodProvider = Provider.of<MoodProvider>(context);
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            _scaffoldKey.currentState?.openDrawer();
          },
          icon: Icon(Icons.menu, color: Colors.white),
        ),
        title: Text(
          'XYZ',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.blue,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Colors.blue),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 30,
                    backgroundColor: Colors.white,
                    child: Icon(Icons.person, size: 40, color: Colors.blue),
                  ),
                  SizedBox(height: 10),
                  Text(
                    "Welcome, User!",
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ],
              ),
            ),
            ListTile(
              leading: Icon(Icons.person),
              title: Text('Profile'),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('Settings'),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.dashboard),
              title: Text('Dashboard'),
              onTap: () {
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Logout'),
              onTap: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              (moodProvider.mood == MoodType.none)
                  ? ImageCarousel(
                      imagePaths: [
                        'assets/amazed.jpg',
                        'assets/angry.jpg',
                        'assets/love.jpg',
                        'assets/happy.jpg',
                        'assets/numb.jpg',
                        'assets/shy.jpg',
                        'assets/sleepy.jpg',
                        'assets/tired.jpg',
                      ],
                      duration: Duration(seconds: 1),
                    )
                  : Image.asset('assets/${moodProvider.mood!.name}.jpg',
                      height: 200),
              SizedBox(height: 40),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 60),
                child: Row(
                  children: [
                    Expanded(
                      child: BlueButton(
                        text: 'Chat',
                        onPressed: () {
                          moodProvider.updateMood(MoodType.happy);
                        },
                      ),
                    ),
                    SizedBox(width: 20),
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.blue,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return VoiceChatPage(
                                  onMoodAnalyzed: (MoodType mood,int stressLevel) {
                                    print("🔹 Received mood: ${mood.name}, 🔹 Received stress level: $stressLevel");
                                    moodProvider.updateMood(mood);


                                  },
                                );
                              },
                            ),
                          );
                        },
                        icon: Icon(Icons.mic, color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 60),
                child: BlueButton(
                  text: 'Activities',
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ExplorePage()),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
