import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';


const SignUpPage1 = () => {

  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const handleSignUp = () => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
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

      {/* Info Inputs */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
        mode="outlined"
        outlineColor="#282726" 
        theme={{ colors: { primary: '#282726' } }} 
      />

 
      {/* Next Button */}
      <Button 
        mode="contained" 
        onPress={() => router.navigate('./SignUpPage2')}
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
    backgroundColor: '#f5f5f5', 
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 120, 
    height: 120,
    marginBottom: 10,
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
    marginBottom: 17,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginLeft: 230,
  },
});

export default SignUpPage1;
