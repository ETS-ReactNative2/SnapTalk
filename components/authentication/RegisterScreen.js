import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Fire from '../firebase/Fire';
import ImagePicker from 'react-native-image-picker';

export default class RegisterScreen extends React.Component {

  state = {
    user: {
      name: '',
      email: '',
      password: '',
      avatar: null
    }
  };

  handlePickAvatar = async () => {
    ImagePicker.launchImageLibrary(
      {aspect: [4, 3], mediaType: 'photo'},
      response => {
        console.log('Response =', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {uri: response.uri};
          this.setState({user: {...this.state.user, avatar: response.uri}});
        }
      },
    );
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={true}>
          <Text style={styles.greeting}>{'Sign up to get started'}</Text>

          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarPlaceHolder}
              onPress={this.handlePickAvatar}>
              <Image
                source={{uri: this.state.user.avatar}}
                style={styles.avatar}></Image>
              <Icon
                name="ios-add"
                size={40}
                color="#FFF"
                style={styles.addPictureIcon}></Icon>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={name =>
                  this.setState({user: {...this.state.user, name}})
                }
                value={this.state.user.name}></TextInput>
            </View>

            <View style={styles.emailBox}>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={email =>
                  this.setState({user: {...this.state.user, email}})
                }
                value={this.state.user.email}></TextInput>
            </View>

            <View style={styles.passwordBox}>
              <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password =>
                    this.setState({user: {...this.state.user, password}})
                  }
                  value={this.state.user.password}></TextInput>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.signUp}>Sign up</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    marginTop: 0,
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 30,
    backgroundColor: 'purple',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    marginTop: 25,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceHolder: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E2E6',
    borderRadius: 50,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    color: '#FFF',
    fontWeight: '500',
  },
  passwordBox: {
    marginTop: 32,
  },
  addPictureIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer:
  {
    alignItems: 'center', 
    width: '100%'
  },
  emailBox:
  {
    marginTop: 32
  }
});