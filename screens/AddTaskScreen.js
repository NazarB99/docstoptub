/* eslint-disable react/no-access-state-in-setstate */
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
import {connect} from 'react-redux'

// import Accordion from 'react-native-collapsible/Accordion';
import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
// import PushNotificationService from '../config/PushNotificationConfig'
import {addTask} from '../actions/tasksActions'

const styles = StyleSheet.create({
  input: {
    // backgroundColor: GREY_COLOR,
    color: 'black',
  },
})

class AddTask extends Component {
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
      title: '',
      description: '',
      type: '',
      is_patient: false,
    }
  }

  onChangeText = (field, text) => {
    this.setState({[field]: text})
  }

  onSubmit = () => {
    const {title, description, type, is_patient} = this.state
    this.props
      .addTask(
        {
          title,
          description,
          type,
          is_patient,
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
          Добавить Задачу
        </Text>
        <Input
          inputContainerStyle={styles.input}
          placeholder="Заголовок"
          onChangeText={text => this.onChangeText('title', text)}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Описание"
          onChangeText={text => this.onChangeText('description', text)}
        />
        {/* <Picker
          // style={Platform.OS === 'ios' ? {height: 60, marginTop: 10, marginBottom: 10} : {}}
          selectedValue={this.state.type}
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
          Выберите тип
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <CheckBox
            center
            title="Обследование"
            onPress={() => this.setState({type: 'observe'})}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.type === 'observe'}
          />
          <CheckBox
            center
            title="Лекарство"
            onPress={() => this.setState({type: 'treatment'})}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.type === 'treatment'}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <CheckBox
            title="Разрешение пациенту выполнять задачу"
            onPress={() => this.setState({is_patient: !this.state.is_patient})}
            checked={this.state.is_patient}
          />
        </View>
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
  current_user: state.user,
})

const mapDispatchToProps = dispatch => ({
  addTask: (user, token) => dispatch(addTask(user, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask)
