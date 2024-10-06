import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginPage from './login';
import SignUpPage from './register';

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginPage />
    </SafeAreaView>
  );
};

export default index;