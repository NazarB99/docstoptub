/* eslint-disable import/no-named-as-default */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable no-new */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {Component} from 'react'
import {View, StyleSheet, AppState} from 'react-native'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import Icon from 'react-native-vector-icons/FontAwesome5'

import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import TasksScreen from './screens/TasksScreen'
import AddTaskScreen from './screens/AddTaskScreen'
import AddTemplateScreen from './screens/AddTemplateScreen'
import TemplateScreen from './screens/TemplateScreen'
import AddPatientScreen from './screens/AddPatientScreen'
import {store, persistor} from './store'
import {MAIN_COLOR, GREY_COLOR} from './config/Constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const StackNav = createStackNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen,
    AddPatient: AddPatientScreen,
  },
  {
    initialRouteName: 'Login',
  }
)

const TaskNavigator = createStackNavigator(
  {
    Task: TasksScreen,
    AddTask: AddTaskScreen,
  },
  {
    initialRouteName: 'Task',
  }
)

const TemplateNavigator = createStackNavigator(
  {
    Template: TemplateScreen,
    AddTemplate: AddTemplateScreen,
  },
  {
    initialRouteName: 'Template',
  }
)

const TabNav = createBottomTabNavigator(
  {
    FStackNav: {
      screen: StackNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />,
      },
    },
    Task: {
      screen: TaskNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="thumbtack" size={20} color={tintColor} />,
      },
    },
    Template: {
      screen: TemplateNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="tasks" size={20} color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'FStackNav',
    tabBarOptions: {
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: GREY_COLOR,
    },
  }
)

const AppNavigatior = createAppContainer(TabNav)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={styles.container}>
        <AppNavigatior style={{flex: 1}} />
      </View>
    </PersistGate>
  </Provider>
)

export default App
