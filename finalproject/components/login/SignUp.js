import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class SignUpScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        return (
        <View style={styles.container}>
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupText}>Create an Account</Text>
            {this.state.errorMessage &&
            <Text style={{ color: 'red', textAlign : 'center'}}>
                {this.state.errorMessage}
            </Text>}
          </View>


          <View style = {styles.textInputContainer}>
            <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            />
            <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            />
          </View>
          
          <View style = {styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
            title="Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonText :{
    fontSize : 15,
    fontStyle : 'normal',
    color : '#423D39',

    textAlign : 'center'
  },
  buttonStyle: {
    height: 30,
    justifyContent : 'center',
    backgroundColor : '#FF831D'
  },
  buttonContainer : {
    top : '45%',
    flexDirection : 'column',
    height: 100,
    justifyContent : 'space-evenly'

  },
  textInputContainer : {
    flexDirection : 'column',
    width : '90%',
    alignItems : 'center',
    top: '30%'
  },
  signupTextContainer : {
    height : 30,
    width: '100%',
    top: '30%',
  },
  signupText : {
    fontSize : 20,
    fontStyle : 'italic',
    color : '#423D39',

    textAlign : 'center'

  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
