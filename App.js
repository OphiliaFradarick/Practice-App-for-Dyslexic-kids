import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      display_text: '',
      chunks: [],
      phonic: [],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            backgroundColor: '#C85250',
            justifyContent: 'space-around',
          }}
          centerComponent={{
            text: 'Practice App for Dyslexia',
            style: {
              color: '#E9EAE0',
              fontFamily: 'comic sans ms',
              fontWeight: 'bold',
            },
          }}
        />
        <Image
          style={styles.image}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhvbSzCkRk6_wQ1e0FE44U2pg-h44Zo5aurg&usqp=CAU',
          }}
        />
        <TextInput
          style={styles.textArea}
          placeholder={'Enter a word'}
          placeholderTextColor={'#E7625F'}
          onChangeText={(input) => {
            this.setState({
              text: input,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            var word;
            word = this.state.text.toLowerCase().trim();
            db[word]
              ? (this.setState({ chunks: db[word].chunks }),
                this.setState({ phonic: db[word].phones }))
              : alert("This word doesn't exist in our database!");
          }}>
          <Text style={styles.buttonText}>CLICK HERE</Text>
        </TouchableOpacity>
        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                soundChunk={this.state.phonic[index]}
                wordChunk={this.state.chunks[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EAE0',
    height:"100%"
  },
  textArea: {
    borderWidth: 5,
    marginTop: 50,
    borderColor: '#C85250',
    width: '75%',
    alignSelf: 'center',
    height: 50,
  },
  button: {
    backgroundColor: '#C85250',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#E9EAE0',
    fontFamily: 'comic sans ms',
  },

  image: {
    alignSelf: 'center',
    width: 300,
    height: 200,
    borderRadius: 20,
  },
});
