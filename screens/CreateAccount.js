import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import Ajv from 'ajv';
import lexicon from '../lexicons/createaccount.json';
import axios from 'axios';

const CreateAccountForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const ajv = new Ajv();
    ajv.addFormat('email', /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);

    const validate = ajv.compile(lexicon.defs.main.input.schema);

    const formData = {
      email: email,
      password: password
    };

    const isValid = validate(formData);

    if (isValid) {
      try {
        // Send a POST request to the /accounts endpoint
        await axios.post('http://localhost:3000/accounts', formData);
        setEmail('');
        setPassword('');
        setError('');
        navigation.navigate('Home');
      } catch (error) {
        setError('Failed to create account');
        console.error(error);
      }
    } else {
      const validationErrors = validate.errors;
      const errorMessage = validationErrors.map(error => error.message).join('\n');
      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.buttoncontainer}>
      <Button
  title="Create account"
  onPress={handleLogin}
  style={styles.button}
/>
      {error ? <Text>{error}</Text> : null}
      </View>
    </View>
  );
};

export default CreateAccountForm;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008081',
    alignItems: 'center',
    justifyContent: 'center',
  },
button:{
  borderRadius: 10,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  backgroundColor: '#0000FF',
},
buttoncontainer:{
  width: 320,
  height: 68,
  alignItems: 'flex-end',
  justifyContent: 'center',
  marginHorizontal: 20,
  padding: 5,
  marginBottom:30
},
input: {
  width: 200,
  height: 40,
  borderRadius: 8, 
  borderWidth: 1, 
  padding: 10,
  
},
});

  

  