import 'package:flutter/material.dart';
import 'package:postgres/postgres.dart';
import 'package:flutter/services.dart';
import 'artistSearch.dart';

class UserDashboard extends StatefulWidget {
  final int user_id;
  UserDashboard({Key? key, required String user_id})
      : user_id = int.parse(user_id),
        super(key: key);

  @override
  _UserDashboardState createState() => _UserDashboardState(user_id: user_id);
}

class _UserDashboardState extends State<UserDashboard> {
  var spotifyClientId = "b9bd5d60afce4b29bc880a786130628e";
  var spotifyRedirectUrl = "spotify-ios-quick-start://spotify-login-callback";
  final int user_id;
  _UserDashboardState({required this.user_id});
  late PostgreSQLConnection _connection;
  List<Map<String, dynamic>> artistData = [];

  @override
  void initState() {
    super.initState();
    _connection = PostgreSQLConnection(
      '192.168.1.173',
      5432,
      'Notified',
      username: 'postgres',
      password: 'Oliver29',
    );
    retrieve_artists();
  }


  Future<void> retrieve_artists() async {
    await _connection.open();
    final results = await _connection.query(
      'SELECT * FROM "Subscribed_Artists" WHERE user_id = @user_id',
      substitutionValues: {'user_id': user_id},
    );
    setState(() {
      artistData = results.map((row) => row.toColumnMap()).toList();
    });
  }

  final MethodChannel _channel = const MethodChannel('spotify_ios_plugin');
  Future<void> authenticateSpotify(String clientId, String redirectUrl) async {
    try {
      await _channel.invokeMethod('authenticateSpotify', {
        'clientId': clientId,
        'redirectUrl': redirectUrl,
      });
    } catch (e) {
      // print('Error occurred during Spotify authentication: $e');
      // Handle the error
    }
  }
  void _handleSearch({required String user_id}){
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ArtistSearch(user_id: user_id)),
    );
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notified User Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed:() => _handleSearch(user_id: user_id.toString()),
          ),
        ],
      ),
      body: artistData.isEmpty
          ? const Center(
              child: Text('No artists found'),
            )
          : ListView.builder(
              itemCount: artistData.length,
              itemBuilder: (context, index) {
                final artist = artistData[index];
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Artist Name: ${artist['artist_name']}',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Image.network(
                      artist['artist_img'],
                      width: 200,
                      height: 200,
                    ),
                    const Divider(), // Add a divider between each artist
                  ],
                );
              },
            ),
    );
  }
}
