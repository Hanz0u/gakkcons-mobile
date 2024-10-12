import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const SignUpPage2 = () => {

  const router = useRouter();

  const [Id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [pnum, setpnum] = useState('');

  const handleSignUp = () => {  
    console.log('University ID:', Id);
    console.log('Email:', email);
    console.log('Phone number:', pnum);
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

      {/* Email Input */}
      <Text style={styles.label}>Educational Institution</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

      {/* ID Input */}
      <TextInput
        label="University ID"
        value={Id}
        onChangeText={text => setId(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

      {/* Phone number Input */}
      <TextInput
        label="Phone number"
        value={pnum}
        onChangeText={text => setpnum(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

      {/* Next Button */}
      <Button 
        mode="contained" 
        onPress={() => router.navigate('./SignUpPage3')}
        style={styles.button} 
        buttonColor="#282726" 
      >
        NEXT
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
    marginLeft: 230,
  },
});

export default SignUpPage2;
