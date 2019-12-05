import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button } from 'react-native'
import firebase from 'firebase'

export default class LoginScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
       //this.props.navigation.navigate('Main')
        const { email, password } = this.state
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
    

    render() {
      return (
      <View style={styles.container}>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signupText}>Login</Text>
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
          <TouchableOpacity style={styles.buttonStyle} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>Don't have an account? Sign Up</Text>
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
    top: '20%',
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

