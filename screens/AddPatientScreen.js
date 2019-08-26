/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Picker, Text, StyleSheet, ScrollView} from 'react-native'
import {Button, Input, CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
// import Accordion from 'react-native-collapsible/Accordion';

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import Card from '../components/Card'
// import PushNotificationService from '../config/PushNotificationConfig'
import {getPatients, addPatient} from '../actions/userActions'

const styles = StyleSheet.create({
  input: {
    // backgroundColor: GREY_COLOR,
    color: 'black',
  },
})

class AddPatient extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: GREY_COLOR,
    },
    headerTintColor: GREY_COLOR,
  })

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      firstname: '',
      lastname: '',
      password: '',
      login: '',
      contact: '',
      address: '',
      birthday: new Date(),
      description: '',
      photo: '',
      gender: '',
    }

    this.pushService
  }

  onChangeText = (field, text) => {
    this.setState({[field]: text})
  }

  onSubmit = () => {
    const {
      firstname,
      lastname,
      password,
      login,
      contact,
      address,
      birthday,
      description,
      photo,
      gender,
    } = this.state
    console.log(moment(birthday).format())
    this.props
      .addPatient(
        {
          firstname,
          lastname,
          password,
          login,
          contact,
          address,
          role: 'patient',
          birthday: moment(birthday).format(),
          description,
          photo,
          gender,
        },
        this.props.current_user.user.token
      )
      .then(result => {
        console.log(result)
        this.props.navigation.goBack()
      })
      .catch(err => {
        console.log(err)
        alert('Произошла ошибка видимо вы не заполнили обязательные поля')
      })
    // this.props.getPatients(this.props.current_user.user.token)
  }

  render() {
    return (
      <ScrollView>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontFamily: 'Roboto-Bold',
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Добавить пациента
        </Text>
        <Input
          inputContainerStyle={styles.input}
          placeholder="Имя"
          onChangeText={text => this.onChangeText('firstname', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Фамилия"
          onChangeText={text => this.onChangeText('lastname', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Адрес"
          onChangeText={text => this.onChangeText('address', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Контактный телефон"
          onChangeText={text => this.onChangeText('contact', text)}
        />
        {/* <Picker
          // style={Platform.OS === 'ios' ? {height: 60, marginTop: 10, marginBottom: 10} : {}}
          selectedValue={this.state.gender}
          onValueChange={itemValue => this.setState({gender: itemValue})}
        >
          <Picker.Item label="Женский" value="female" />
          <Picker.Item label="Мужской" value="male" />
        </Picker> */}
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontFamily: 'Roboto-Bold',
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Выберите пол
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <CheckBox
            center
            title="Женский"
            onPress={() => this.setState({gender: 'female'})}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.gender === 'female'}
          />
          <CheckBox
            center
            title="Мужской"
            onPress={() => this.setState({gender: 'male'})}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.gender === 'male'}
          />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontFamily: 'Roboto-Bold',
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Дата рождения
        </Text>
        <DatePicker
          style={{alignSelf: 'center'}}
          date={this.state.birthday}
          mode="date"
          onDateChange={date => this.setState({birthday: date})}
          locale="ru"
        />
        <Input
          inputContainerStyle={[styles.input, {height: 90}]}
          placeholder="Описание"
          multiline
          onChangeText={text => this.onChangeText('description', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Логин"
          onChangeText={text => this.onChangeText('login', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          secureTextEntry
          placeholder="Пароль"
          onChangeText={text => this.onChangeText('password', text)}
        />
        <Button
          title="Submit"
          onPress={() => this.onSubmit()}
          containerStyle={{marginTop: 10, paddingLeft: 20, paddingRight: 20, marginBottom: 20}}
          buttonStyle={{backgroundColor: MAIN_COLOR}}
          titleStyle={{color: GREY_COLOR}}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  connected: state.chat_connection,
  user: state.chat_user,
  selected: state.chat_selected,
  dialogs: state.chat_dialogs,
  current_user: state.user,
})

const mapDispatchToProps = dispatch => ({
  getPatients: token => dispatch(getPatients(token)),
  addPatient: (user, token) => dispatch(addPatient(user, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPatient)
