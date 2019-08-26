/* eslint-disable camelcase */
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
import {View, AppState, ActivityIndicator, Alert, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ConnectyCube from 'connectycube-reactnative'
import {connect} from 'react-redux'
// import Accordion from 'react-native-collapsible/Accordion';

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import TaskCard from '../components/TaskCard'
import appConfig from '../app.json'
import Message from '../models/Message'
// import User from '../config/UserConfig'
import Chat from '../config/ChatConfig'
import CallingService from '../config/CallingConfig'
// import PushNotificationService from '../config/PushNotificationConfig'
import {userLogin} from '../actions/chatUserActions'
import {fetchDialogs, sortDialogs} from '../actions/chatDialogsActions'
import {chatConnected, chatDisconnected} from '../actions/chatConnectionActions'
import {pushMessage} from '../actions/chatMessagesActions'
import {getTasks} from '../actions/tasksActions'
import {
  userIsCalling,
  videoSessionObtained,
  clearVideoSession,
  localVideoStreamObtained,
  remoteVideoStreamObtained,
  setActiveVideoDevice,
  clearVideoStreams,
  setMediaDevices,
  callInProgress,
} from '../actions/chatVideoActions'

class TasksScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title') || '',
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: GREY_COLOR,
    },
  })

  constructor(props) {
    super(props)

    this.state = {
      appIsActive: true,
      waitConnect: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.props.getTasks(this.props.current_user.user.token)
  }

  // getNotCompleted = () => this.props.current_user.patients.filter(item => item.is_done !== true)

  renderItem = item => <TaskCard task={item} />

  onRefresh = () => {
    // this.setState({refreshing: true})
    const {getTasks, current_user} = this.props
    getTasks(current_user.user.token)
  }

  render() {
    return this.state.loading || this.props.tasks.loading ? (
      <View
        style={{
          flex: 1,
          // paddingLeft: 10,
          // paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={MAIN_COLOR} size="large" />
      </View>
    ) : (
      <View style={{flex: 1}}>
        <FlatList
          refreshing={this.props.tasks.loading}
          onRefresh={this.onRefresh}
          data={this.props.tasks.tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: MAIN_COLOR,
              width: 60,
              height: 60,
              borderColor: '#000',
              borderRadius: 40,
            }}
            onPress={() => {
              this.props.navigation.navigate('AddTask')
            }}
            icon={<Icon name="plus" size={30} color={GREY_COLOR} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  current_user: state.user,
})

const mapDispatchToProps = dispatch => ({
  getTasks: token => dispatch(getTasks(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksScreen)
