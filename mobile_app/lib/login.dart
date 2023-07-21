import 'package:flutter/material.dart';
import 'package:postgres/postgres.dart';
import 'package:bcrypt/bcrypt.dart';
import 'userdashboard.dart';

class Login extends StatefulWidget {
  const Login({super.key});
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  late PostgreSQLConnection _connection;

  // Future<void> testPostgreSQLConnection() async {
  //   PostgreSQLConnection connection = PostgreSQLConnection(
  //     '192.168.1.173', // Replace with the actual network IP of your PostgreSQL server.
  //     5432, // The port number should be 5432 for PostgreSQL.
  //     'Notified', // The database name.
  //     username: 'postgres',
  //     password: 'Oliver29',
  //   );

  //   try {
  //     await connection.open(); // Open the connection.
  //     print('Connection successful!');
  //     final results = await connection.query(
  //       'SELECT email, password FROM "Users" WHERE email = @email',
  //       substitutionValues: {'email': 'osamuels@bu.edu'},
  //     );
  //     String password = "123";
  //     final storedPassword = results[0][1];
  //     final bool isPasswordCorrect = BCrypt.checkpw(password, storedPassword);
  //     if (isPasswordCorrect) {
  //       print('Password is correct');
  //       final results = await connection.query(
  //         'SELECT id FROM "Users" WHERE email = @email AND password = @password',
  //         substitutionValues: {
  //           'email': 'osamuels@bu.edu',
  //           'password': storedPassword
  //         },
  //       );
  //       print(results[0][0]);
  //       valid_login(user_id: (results[0][0]).toString());
  //     }
  //     print("results" + results[0][0]);

  //     // Perform database operations here if needed.

  //     //await connection.close(); // Close the connection when done.
  //   } catch (e) {
  //     print('Error during connection: $e');
  //   }
  // }

  @override
  void initState() {
    super.initState();
    _passwordController.addListener(() {
      final String text = _passwordController.text.toLowerCase();
      _passwordController.value = _passwordController.value.copyWith(
        text: text,
        selection:
            TextSelection(baseOffset: text.length, extentOffset: text.length),
        composing: TextRange.empty,
      );
    });
    _emailController.addListener(() {
      final String text = _emailController.text.toLowerCase();
      _emailController.value = _emailController.value.copyWith(
        text: text,
        selection:
            TextSelection(baseOffset: text.length, extentOffset: text.length),
        composing: TextRange.empty,
      );
    });
    _connection = PostgreSQLConnection(
      // final String apiUrl = 'http://192.168.1.173:your_port_number';
      '192.168.1.173',
      5432,
      'Notified',
      username: 'postgres',
      password: 'Oliver29',
    );
  }

  @override
  void dispose() {
    _passwordController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  void valid_login({required String user_id}) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => UserDashboard(user_id: user_id)),
    );
  }

  Future<void> _handleSubmit() async {
    String email = _emailController.text;
    String password = _passwordController.text;
    print('Submitting email: $email');
    print('Submitting password: $password');

    await _connection.open();
    final results = await _connection.query(
      'SELECT email, password FROM "Users" WHERE email = @email',
      substitutionValues: {'email': email},
    );

    print(results);
    if (results.isNotEmpty) {
      final storedPassword = results[0][1];
      final bool isPasswordCorrect = BCrypt.checkpw(password, storedPassword);
      if (isPasswordCorrect) {
        print('Password is correct');
        // testPostgreSQLConnection();
        final results = await _connection.query(
          'SELECT id FROM "Users" WHERE email = @email AND password = @password',
          substitutionValues: {'email': email, 'password': storedPassword},
        );
        print(results[0][0]);
        valid_login(user_id: (results[0][0]).toString());
      } else {
        print('Password is incorrect');
      }
    } else {
      print('No user found with email: $email');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notified Login'),
      ),
      body: Center(
        child: Column(
          children: [
            const Text(
              'Login Page',
              style: TextStyle(fontSize: 24),
            ),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: "Enter your email",
              ),
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                labelText: "Enter your password",
              ),
            ),
            ElevatedButton(
              onPressed: _handleSubmit,
              child: const Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }
}
