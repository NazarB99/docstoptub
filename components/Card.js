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

import BlinkDot from './BlinkDot'

const styles = StyleSheet.create({
  card: {
    height: 110,
    flexDirection: 'row',
    borderBottomColor: 'rgba(214, 212, 212, 0.5)',
    borderBottomWidth: 0.6,
  },
  wrapper: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoSection: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    minWidth: '30%',
  },
  infoSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    alignItems: 'center',
    // minWidth: '50%',
  },
  connectSection: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const getParsedTime = time => moment(time).format('DD MMMM YYYY HH:mm')

class Card extends Component {
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
    const {patient} = this.props
    return (
      <View style={styles.card}>
        <View style={styles.photoSection}>
          <Image
            source={
              patient.photo !== ''
                ? {uri: patient.photo}
                : patient.gender === 'male'
                ? require('../assets/images/placeholder.jpeg')
                : require('../assets/images/female-placeholder.jpg')
            }
            style={styles.image}
          />
        </View>
        <View style={styles.infoSection}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.name}
          >{`${this.props.patient.firstname} ${this.props.patient.lastname}`}</Text>
          <View style={styles.connectSection}>
            <Button
              icon={<Icon name="phone" size={22} color={MAIN_COLOR} />}
              buttonStyle={{backgroundColor: 'transparent', padding: 0}}
            />
            <Button
              buttonStyle={{backgroundColor: 'transparent', padding: 0}}
              icon={<Icon name="video" style={{marginLeft: 15}} size={22} color={MAIN_COLOR} />}
            />
            <Button
              buttonStyle={{backgroundColor: 'transparent', padding: 0}}
              icon={
                <Icon
                  name="comment-alt"
                  style={{marginLeft: 15}}
                  size={22}
                  color={MAIN_COLOR}
                  regular
                />
              }
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Card
