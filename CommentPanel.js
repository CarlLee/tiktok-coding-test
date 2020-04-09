import React, {Component} from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Comment from './Comment';

export default class CommentPanel extends Component {
  constructor(props) {
    super(props);
    this.text = '';
    this.textInput = React.createRef();
    this.scroller = React.createRef();
  }
  setText(txt) {
    this.text = txt;
  }
  render() {
    let commentList = this.props.comments.map((c, idx) => {
      return (
        <Comment key={idx} {...c} />
      )
    });
    return (
      <View style={styles.container}>
        <ScrollView ref={this.scroller} style={styles.scroller}>
          {commentList}
        </ScrollView>
        <View style={styles.inputBar}>
          <TextInput ref={this.textInput} onChangeText={this.setText.bind(this)} style={styles.commentInput} placeholder="Type comment here..."/>
          <TouchableOpacity stlye={styles.sendBtn} onPress={() => { this.props.onSubmit(this.text); this.textInput.current.clear(); this.scroller.current.scrollToEnd();}}>
            <Image style={styles.sendBtnImg} source={require('./assets/send_btn.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 500,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  scroller: {
    marginBottom: 85
  },
  inputBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    flexGrow: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentInput: {
    height: 80,
    padding: 10,
    flex: 2
  },
  sendBtn: {

  },
  sendBtnImg: {
    width: 50,
    height: 50
  }
});