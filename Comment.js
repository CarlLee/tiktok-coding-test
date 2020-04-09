import React, {Component} from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.userRow}>
          <Image style={styles.avatar} source={require('./assets/avatar.png')} />
          <Text style={styles.username}>{this.props.username}</Text>
        </View>
        <Text style={styles.content}>{this.props.content}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  userRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc'
  },
  username: {
    color: '#666',
    fontSize: 16,
    marginLeft: 10
  },
  content: {
    fontSize: 18,
    padding: 10
  }
});