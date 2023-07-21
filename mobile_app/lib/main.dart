import 'package:flutter/material.dart';
import 'login.dart';
import 'signup.dart';
import 'package:spotify_sdk/spotify_sdk.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Notified App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
            seedColor: const Color.fromARGB(255, 48, 189, 29)),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Notified Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var spotifyClientId = "b9bd5d60afce4b29bc880a786130628e";
  var spotifyRedirectUrl = "spotify-ios-quick-start://spotify-login-callback";
  // int _counter = 0;
  // void _incrementCounter() {
  //   setState(() {
  //     _counter++;
  //   });
  // }
  Future<void> authenticateSpotify() async {
    final authenticationToken = await SpotifySdk.getAccessToken(
      clientId: spotifyClientId,
      redirectUrl: spotifyRedirectUrl,
      scope:
          'user-read-email playlist-read-private playlist-read-collaborative',
    );
    print(authenticationToken);
  }

  void _loginButtonClick() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const Login()),
    );
    // authenticateSpotify();
    print('Button clicked!');
  }

  void _signUpButtonClick() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const SignUp()),
    );
    print('Button clicked!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Notified Login',
            ),
            ElevatedButton(
              onPressed: _loginButtonClick,
              child: const Text('Login'),
            ),
            ElevatedButton(
              onPressed: _signUpButtonClick,
              child: const Text('Sign Up'),
            ),
          ],
        ),
      ),
    );
  }
}
