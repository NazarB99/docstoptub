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
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {Button, Input, CheckBox} from 'react-native-elements'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

// import Accordion from 'react-native-collapsible/Accordion';
import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
// import PushNotificationService from '../config/PushNotificationConfig'
import {getTasks} from '../actions/tasksActions'
import {addTemplate} from '../actions/templateActions'

const styles = StyleSheet.create({
  input: {
    // backgroundColor: GREY_COLOR,
    color: 'black',
  },
})

class AddTemplate extends Component {
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
      tasks: [],
    }
  }

  addOrDeleteTask = id => {
    this.s
  }

  onChangeText = (field, text) => {
    this.setState({[field]: text})
  }

  onSubmit = () => {
    const {title, description, type, is_patient} = this.state
    this.props
      .addTemplate(
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
          Добавить Шаблон
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
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1, flexWrap: 'wrap'}}>
            <TouchableOpacity
              style={{
                borderColor: 'rgb(214, 212, 212)',
                borderWidth: 1,
                alignSelf: 'center',
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  fontFamily: 'Roboto-Bold',
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                Выберите задания для шаблона лечения
              </Text>
            </TouchableOpacity>
            {this.state.tasks.map(item => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: 'rgba(214, 212, 212, 0.5)',
                  borderBottomWidth: 0.6,
                }}
              >
                <Text style={{flex: 2}}>{item.title}</Text>
                <Button
                  buttonStyle={{flex: 1}}
                  icon={<Icon color="#db5e42" name="times-circle" />}
                />
              </View>
            ))}
          </View>
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
  tasks: state.tasks,
})

const mapDispatchToProps = dispatch => ({
  addTemplate: (data, token) => dispatch(addTemplate(data, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTemplate)
