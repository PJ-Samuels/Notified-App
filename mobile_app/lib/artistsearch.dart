import 'package:flutter/material.dart';
import 'package:mobile_app/secrets.dart';
import 'package:spotify_sdk/spotify_sdk.dart';
// import "secrets.dart";

class ArtistSearch extends StatefulWidget {
  final int user_id;
  ArtistSearch({Key? key, required String user_id})
      : user_id = int.parse(user_id),
        super(key: key);

  @override
  _ArtistSearchState createState() => _ArtistSearchState();
}

class _ArtistSearchState extends State<ArtistSearch> {
  var spotifyClientId = spotifyClientIdImport;
  var spotifyRedirectUrl = "spotify-ios-quick-start://spotify-login-callback";
  late int user_id;

  Future<void> authenticateSpotify() async {
    final authenticationToken = await SpotifySdk.getAccessToken(
      clientId: spotifyClientId,
      redirectUrl: spotifyRedirectUrl,
      scope:
          'user-read-email playlist-read-private playlist-read-collaborative',
    );
    print(authenticationToken);
  }

  @override
  void initState() {
    super.initState();
    user_id = widget.user_id;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Notified User Dashboard'),
        ),
        body: Column(children: [
          Text("artist Search"),
          TextField(
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Artist Name',
            ),
          ),
          ElevatedButton(
            onPressed: () => authenticateSpotify(),
            child: const Text('Authenticate Spotify'),
          ),
        ]));
  }
}
