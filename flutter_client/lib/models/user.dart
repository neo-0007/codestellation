import 'dart:convert';

class User {
  final String name;
  final String email;
  final String password;
  final int phone;
  final String gender;
  final DateTime dob;

  User({
    required this.name,
    required this.email,
    required this.password,
    required this.phone,
    required this.gender,
    required this.dob,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
      password: json['password'],
      phone: json['phone'],
      gender: json['gender'],
      dob: DateTime.parse(json['dob']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'password': password,
      'phone': phone,
      'gender': gender,
      'dob': dob.toIso8601String().split('T')[0],
    };
  }

  static User fromJsonString(String jsonString) {
    return User.fromJson(json.decode(jsonString));
  }

  String toJsonString() {
    return json.encode(toJson());
  }
}
