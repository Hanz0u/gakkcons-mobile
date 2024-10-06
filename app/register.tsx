import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add your sign-up logic here (e.g., API call)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRATION</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button 
        mode="contained" 
        onPress={handleSignUp} 
        style={styles.button} 
        buttonColor="#282726" // Set button color to #282726
      >
        SUBMIT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default SignUpPage;