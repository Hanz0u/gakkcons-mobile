import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const SignUpPage3 = () => {
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    // Add your sign-up logic here (API call)
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require("../../assets/images/logo.png")} 
          style={styles.logo} 
        />
      </View>

      <Text style={styles.title}>REGISTRATION</Text>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

      {/* Confirm Password Input */}
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

      {/* Submit Button */}
      <Button 
        mode="contained" 
        onPress={handleSignUp} 
        style={styles.button} 
        buttonColor="#282726" 
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
    backgroundColor: '#FFFFFF', 
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 120, 
    height: 120, 
    resizeMode: 'contain', 
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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

export default SignUpPage3;
