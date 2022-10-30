import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default class PhonicSoundButton extends React.Component {
  constructor() {
    super();
    this.state = { pressButtonIndex: '' };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            pressButtonIndex: this.props.buttonIndex,
          });
          this.playSound(this.props.soundChunk);
        }}
        style={
          this.props.buttonIndex === this.state.pressButtonIndex
            ? [styles.button, { backgroundColor: '#FFB7B0' }]
            : [styles.button]
        }>
        <Text
          style={
            this.props.buttonIndex === this.state.pressButtonIndex
              ? [styles.text, { color: '#C85250' }]
              : [styles.text]
          }>
          {this.props.wordChunk}
        </Text>
      </TouchableOpacity>
    );
  }
  playSound = async (soundChunk) => {
    var soundURL =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync({ uri: soundURL }, { shouldPlay: true });
  };
}
const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    fontSize: '30',
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#C85250',
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    height: 50,
  },
});
