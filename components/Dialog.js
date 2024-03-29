/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'

import ProfileIcon from './ProfileIcon'
import DialogTitles from './DialogTitles'
import DialogLastDate from './DialogLastDate'
import DialogUnreadCounter from './DialogUnreadCounter'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  border: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
  },
  infoContainer: {
    maxWidth: 75,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 10,
    marginLeft: 5,
  },
})

class Dialog extends Component {
  toChat(dialog) {
    this.props.navigation.navigate('Chat', {
      dialog,
      title: dialog.name,
    })
  }

  render() {
    const {dialog} = this.props
    return (
      <TouchableOpacity onPress={() => this.toChat(dialog)}>
        <View style={styles.container}>
          <ProfileIcon photo={dialog.photo} name={dialog.name} iconSize="large" />
          <View style={styles.border}>
            <DialogTitles name={dialog.name} message={dialog.last_message} />
            <View style={styles.infoContainer}>
              <DialogLastDate
                lastDate={dialog.last_message_date_sent}
                lastMessage={dialog.last_message}
                updatedDate={dialog.updated_date}
              />
              <DialogUnreadCounter unreadMessagesCount={dialog.unread_messages_count} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

// const mapStateToProps = state => ({
//   dialog: state.chat_dialog,
// })

export default Dialog
