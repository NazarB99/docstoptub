/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'

// import BlinkDot from './BlinkDot'

const styles = StyleSheet.create({
  card: {
    height: 90,
    flexDirection: 'row',
    borderBottomColor: 'rgba(214, 212, 212, 0.5)',
    borderBottomWidth: 0.6,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
    fontSize: 20,
    flex: 2,
    marginLeft: 10,
  },
  connectSection: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

const getParsedTime = time => moment(time).format('DD MMMM YYYY HH:mm')

class TaskCard extends Component {
  state = {
    expand: false,
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.onPress()
    // }, 1800)
    // this.onPress()
    // console.log(this.isLate(this.props.schedule.time))
  }

  toggleDescription = () => {
    this.setState({expand: !this.state.expand})
  }

  isLate = date => {
    console.log('now date')
    console.log(Date.now().toString())
    const isbefore = moment(date).isBefore(moment(Date.now()))
    return isbefore
  }

  getPhoto = patient => {
    if (patient.photo !== '') {
      return {uri: patient.photo}
    }
    if (patient.gender === 'male') {
      return '../assets/images/placeholder.jpeg'
    }
    return '../assets/images/female-placeholder.jpg'
  }

  // {
  //   backgroundColor: this.state.backgroundColor.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: ['#dd6b7f', '#fff'],
  //   }),
  // },

  render() {
    const {task} = this.props
    return (
      <View style={styles.card}>
        {/* <View style={styles.infoSection}> */}
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {task.title}
        </Text>
        <View style={styles.connectSection}>
          <Button
            icon={<Icon name="edit" size={22} color={MAIN_COLOR} />}
            buttonStyle={{backgroundColor: 'transparent', padding: 0}}
          />
          <Button
            buttonStyle={{backgroundColor: 'transparent', padding: 0}}
            icon={<Icon name="trash-alt" style={{marginLeft: 15}} size={22} color={MAIN_COLOR} />}
          />
        </View>
        {/* </View> */}
      </View>
    )
  }
}

export default TaskCard
