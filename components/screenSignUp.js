import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';

const API_URL = 'https://6722030b2108960b9cc28724.mockapi.io/loginApp'; // URL API của bạn

export default function ScreenSignUp({ navigation }) {
  const [countryCode, setCountryCode] = useState('VN');
  const [callingCode, setCallingCode] = useState('84');
  const [country, setCountry] = useState(null);
  const [placeholder, setPlaceholder] = useState('+84 Mobile Number');
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerification, setIsVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const DEFAULT_OTP = '1111'; // Mã OTP mặc định

  const onSelect = (selectedCountry) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setCallingCode(selectedCountry.callingCode[0]);
    setPlaceholder(`+${selectedCountry.callingCode[0]} Mobile Number`);
  };

  const handleContinue = async () => {
    // Kiểm tra số điện thoại tồn tại trong API
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const userExists = users.find(user => user.phoneNumber === phoneNumber);

      if (userExists) {
        setErrorMessage('This phone number already has an account.');
      } else {
        setErrorMessage('');
        setIsVerification(true);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRegister = async () => {
    if (verificationCode === DEFAULT_OTP) {
      // Lưu tài khoản mới vào API
      const newUser = { phoneNumber, password };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          Alert.alert('Registration Successful!', 'You can now log in.');
          setModalVisible(false);
          setPhoneNumber('');
          setPassword('');
          setVerificationCode('');
          setIsVerification(false);
        } else {
          Alert.alert('Registration Failed', 'Please try again.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      Alert.alert('Invalid verification code.');
    }
  };

  const handleLogin = async () => {
    // Kiểm tra đăng nhập với API
    try {
      const response = await fetch(API_URL);
      const users = await response.json();
      const user = users.find(
        user => user.phoneNumber === phoneNumber && user.password === password
      );

      if (user) {
        navigation.navigate('ScreenHome');
        setModalVisible(false);
      } else {
        setErrorMessage('Invalid phone number or password. Please create a new account.');
        setIsVerification(false);
        setModalVisible(true); // Hiển thị modal để tạo tài khoản mới nếu đăng nhập thất bại
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Create an account</Text>
        <View style={styles.boxEnterNumber}>
          <Text style={styles.textEnterNumber}>Enter your mobile number:</Text>
          <View style={styles.boxInputSDT}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCountryNameButton={false}
              onSelect={onSelect}
              withCallingCode
              withAlphaFilter
              containerButtonStyle={styles.seclectNation}
            />
            <TextInput
              style={styles.inputSDT}
              placeholder={placeholder}
              placeholderTextColor="#A9A9A9"
              keyboardType="phone-pad"
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.btnContinue} onPress={handleContinue}>
            <Text style={styles.textBtnContinue}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.textContent1}>or</Text>
        <View style={styles.loginWith}>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginApple]}>
            <AntDesign name="apple-o" size={20} color="black" />
            <Text style={[styles.textLoginApple, styles.textLoginW]}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginFB]}>
            <Icons name='logo-facebook' color='#4698D6' size={20} />
            <Text style={[styles.textLoginFB, styles.textLoginW]}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginW, styles.colorLoginGG]}>
            <Icons name='logo-google' color='#DB4F57' size={20} />
            <Text style={[styles.textLoginGG, styles.textLoginW]}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.textContent2}>By signing up, you agree to our{'\n'}<Text style={styles.underlinedText}>Terms of Service</Text> and <Text style={styles.underlinedText}>Privacy Policy</Text></Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>Already had an account?</Text>
        <TouchableOpacity  onPress={() => setModalVisible(true)}>
          <Text style={[styles.textLogin, styles.underlinedText]}>Log in</Text>
        </TouchableOpacity>
      </View>

    {/* Modal for Sign Up */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {isVerification ? (
              <>
                <Text style={styles.modalTitle}>Complete Registration</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  onChangeText={setPassword}
                  value={password}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Verification Code"
                  placeholderTextColor="#A9A9A9"
                  onChangeText={setVerificationCode}
                  value={verificationCode}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleRegister}>
                  <Text style={styles.textBtnContinue}>Register</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Log In</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="phone-pad"
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  onChangeText={setPassword}
                  value={password}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
                  <Text style={styles.textBtnContinue}>Log In</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 20
  },
  textHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    height: '30%',
  },
  boxEnterNumber: {
    backgroundColor: '#Fff',
    height: '70%',
    justifyContent: 'space-between'
  },
  textEnterNumber: {
    fontSize: 20,
  },
  boxInputSDT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  seclectNation: {
    width: 90,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSDT: {
    width: '74%',
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 5,
    paddingLeft: 10
  },
  btnContinue: {
    borderRadius: 5,
    height: 60,
    backgroundColor: '#00BDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textBtnContinue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  textContent1: {
    fontSize: 15,
    color: 'gray',
    marginTop: 7
  },
  loginW: {
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginWith: {
    width: '100%',
    marginTop: 15
  },
  textLoginW: {
    marginLeft: 10,
    fontSize: 18,
  },
  textContent2: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 5
  },
  underlinedText: {
    textDecorationLine: 'underline',
  },
  colorLoginFB: {
    borderColor: '#4698D6',
  },
  textLoginFB: {
    color: '#4698D6'
  },
  colorLoginGG: {
    borderColor: '#DB4F57',
  },
  textLoginGG: {
    color: '#DB4F57'
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFooter: {
    fontSize: 18,
    paddingRight: 10,
    marginBottom: 15
  },
  textLogin: {
    fontSize: 18,
    color: '#00BDD5',
    marginBottom: 15
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20
  },
  modalInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10
  },
  modalButton: {
    backgroundColor: '#00BDD5',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%'
  },
  closeModal: {
    marginTop: 15,
    color: 'red'
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});