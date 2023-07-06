import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Login Successful', data.message);
        navigation.navigate('BMI');
      } else {
        Alert.alert('Invalid Credentials', data.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#008081' }}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
