/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import ConnectyCube from 'connectycube-reactnative'
import {Alert, Platform} from 'react-native'

class CallingService {
  getUserMedia(session) {
    return new Promise((resolve, reject) => {
      session.getUserMedia(
        {
          audio: true,
          video: {facingMode: 'user'},
        },
        (error, stream) => {
          error ? reject(error) : resolve(stream)
        }
      )
    })
  }

  switchCamera(localStream) {
    // MediaStreamTrack.prototype._switchCamera()
    // switch the front/back cameras in a video track on the fly, without the need for adding/removing tracks or renegotiating
    localStream.getVideoTracks().forEach(track => track._switchCamera())
  }

  getVideoDevices() {
    return new Promise((resolve, reject) => {
      ConnectyCube.videochat.getMediaDevices('videoinput').then(devices => {
        devices ? resolve(devices) : reject()
      })
    })
  }

  createVideoSession(calleesIds) {
    return new Promise((resolve, reject) => {
      const sessionType = ConnectyCube.videochat.CallType.VIDEO // AUDIO is also possible
      const additionalOptions = {}
      const session = ConnectyCube.videochat.createNewSession(
        calleesIds,
        sessionType,
        additionalOptions
      )
      resolve(session)
    })
  }

  initiateCall(session) {
    const extension = {filter: '0'}
    session.call(extension, (error) => {})
  }

  acceptCall(session) {
    const extension = {}
    session.accept(extension)
  }

  rejectCall(session) {
    const extension = {}
    session.reject(extension)
  }

  finishCall(session) {
    const extension = {}
    session.stop(extension)

    ConnectyCube.videochat.clearSession(session.ID)
  }

  muteAudio(session) {
    session.mute('audio')
  }

  unmuteAudio(session) {
    session.unmute('audio')
  }

  processOnUserNotAnswer(session, userId) {
    console.log('CallingService processOnUserNotAnswer', userId)

    Alert.alert('An opponent did not answer', '', [{text: 'Ok', onPress: () => {}}], {
      cancelable: true,
    })
  }

  processOnAcceptCallListener(session, extension) {}

  processOnRejectCallListener(session, extension) {
    ConnectyCube.videochat.clearSession(session.ID)

    Alert.alert('An opponent rejected the call request', '', [{text: 'Ok', onPress: () => {}}], {
      cancelable: true,
    })
  }

  processOnStopCallListener(session, extension) {
    ConnectyCube.videochat.clearSession(session.ID)

    Alert.alert('The call is finished', '', [{text: 'Ok', onPress: () => {}}], {cancelable: true})
  }
}

// create instance
const Calling = new CallingService()

// lock instance
Object.freeze(Calling)

export default Calling
