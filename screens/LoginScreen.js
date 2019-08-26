/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {userLogin} from '../actions/chatUserActions'
import User from '../config/UserConfig'
import {login} from '../actions/userActions'

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    this.checkIfLoggedInAndGoToMain(this.props)
  }

  componentWillReceiveProps(props) {
    this.checkIfLoggedInAndGoToMain(props)
  }

  checkIfLoggedInAndGoToMain = state => {
    if (state.user.user && state.user.user.id) {
      User.autologin()
        .then(this.props.userLogin)
        .catch(() => this.signIn(state.user.user))
      state.navigation.replace('Main')
    }
  }

  signIn = user => {
    const {chat_mail, login, password} = user
    if (!login.trim() && !chat_mail.trim()) {
      alert('Warning.\n\nFill the fields to login.')
      return
    }

    User.signin({login, chat_mail, password})
      .then(this.props.userLogin)
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
  }

  onChangeText = (text, field) => {
    this.setState({[field]: text})
  }

  onButtonSubmit = () => {
    const {username, password} = this.state
    this.props.login(username, password)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <View style={{alignItems: 'center'}}>
          <Icon name="medrt" size={50} />
        </View>
        <View>
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={text => {
              this.onChangeText(text, 'username')
            }}
          />
          <Input
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            onChangeText={text => {
              this.onChangeText(text, 'password')
            }}
          />
        </View>
        <Button buttonStyle={{marginTop: 10}} title="Login" onPress={this.onButtonSubmit} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  {login, userLogin}
)(LoginScreen)
