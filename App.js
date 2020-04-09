import React, {Component} from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Video } from 'expo-av';
import ViewPager from '@react-native-community/viewpager';
import CommentPanel from './CommentPanel';
import data from './data.json';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function positiveMod(i, n) {
  return ((i % n) + n) % n;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = data;
    this.currentIndex = 1;
    this.state = {
      vids: this.populateVids(),
      panelBottom: new Animated.Value(-windowHeight)
    };
    this.viewPager = React.createRef();
  }
  onPageSelected(e) {
    let position = e.nativeEvent.position;
    let shouldUpdate = false;
    if(position == 0) {
      this.currentIndex--;
      shouldUpdate = true;
    } else if(position == 2) {
      this.currentIndex++;
      shouldUpdate = true;
    }

    if(shouldUpdate) {
      this.setState({
        vids: this.populateVids()
      });
    }
  }
  populateVids() {
    let vids = this.data.vids;
    let vidsToShow = [];
    for(let index = this.currentIndex - 1; index < this.currentIndex + 2; index++) {
      let vid = vids[positiveMod(index, vids.length)];
      vidsToShow.push(vid);
    }
    return vidsToShow;
  }
  renderVids() {
    let currentIndex = this.currentIndex;
    return this.state.vids.map((vid, idx) => {
      return (
        <Video
          key={idx + currentIndex}
          source={{ uri: vid.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="stretch"
          shouldPlay={idx == 1}
          isLooping
          style={styles.player}/>
      )
    });
  }
  showPanel() {
    Animated.timing(this.state.panelBottom, {toValue: 0, duration: 300}).start();
  }
  hidePanel() {
    Animated.timing(this.state.panelBottom, {toValue: -windowHeight, duration: 300}).start();
    Keyboard.dismiss();
  }
  onSubmit(content) {
    if(content.length > 0) {
      let vids = this.data.vids;
      let vid = vids[positiveMod(this.currentIndex, vids.length)];
      vid.comments.push({
        username: 'Carl', 
        content: content
      });
      this.setState({
        vids: vids
      })
    }
  }
  render() {
    let vids = this.data.vids;
    let vid = vids[positiveMod(this.currentIndex, vids.length)];
    let vidsEls = this.renderVids();
    return (
      <View style={styles.container}>
        <ViewPager style={styles.viewpager}
          ref={this.viewPager}
          initialPage={1}
          onPageSelected={this.onPageSelected.bind(this)}
          orientation="vertical"
          scrollEnabled={true}>
          {vidsEls}
        </ViewPager>
        <View style={styles.commentBtnBox}>
          <TouchableOpacity onPress={this.showPanel.bind(this)}>
            <Image style={styles.commentBtn} source={require('./assets/ic_comment.png')} />
            <Text style={styles.commentNum}>{vid.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={this.hidePanel.bind(this)}>
          <Animated.View style={[styles.animatedContainer, { bottom: this.state.panelBottom }]}>
            <CommentPanel comments={vid.comments} onSubmit={this.onSubmit.bind(this)}/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  viewpager: {
    flex: 1
  },
  player: {
    flex: 1
  },
  commentBtn: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  commentNum: {
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  commentBtnBox: {
    position: 'absolute',
    right: 20,
    bottom: 100,
  },
  animatedContainer: {
    width: '100%',
    height: windowHeight,
    position: 'absolute'
  }
});
