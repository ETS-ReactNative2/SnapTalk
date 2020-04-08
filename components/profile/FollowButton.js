import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');

export default class FollowButton extends Component {

  state = {
    followClick: false,
    isFollowing: false,
    user: {},
    targetUser: {},
    toFollowedUserId: {},
  };

  componentDidMount() {
    //Getting user from database
    this.unsubscribe = firebase.firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == this.props.loggedUserUID) {
            this.setState({ user: doc.data() });
          }
          if (doc.data().uid == this.props.userToFollow) {
            this.setState({ toFollowedUserId: doc.id });
            this.setState({ targetUser: doc.data() });
          }
        });
      });

    this.unsubscribe = firebase.firestore()
      .collection('users')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (doc.id == this.props.loggedUserUID) {
            doc.data().listOfFollowing.forEach(followerName => {
              if (this.state.targetUser.uid == followerName) {
                this.setState({ followClick: true });
                this.setState({ isFollowing: true });
              }
            });
          }
        });
      });
  }

  followAction = () => {
    let followingRef = firebase.firestore()
      .collection('users')
      .doc(this.props.loggedUserUID);

    let followerRef = firebase.firestore()
      .collection('users')
      .doc(this.state.toFollowedUserId);

    if (this.state.followClick == false || this.state.isFollowing == false) {
      this.setState({
        followClick: !this.state.followClick,
        isFollowing: !this.state.isFollowing,
      });

      // add a new Following to the "listOfFollwing" array of the current user
      let arrUnionFollowing = followingRef.update({
        listOfFollowing: firebase.firestore.FieldValue.arrayUnion(
          this.props.userToFollow,
        ),
      });

      // add a new Follower to the "listOfFollowing" array of the other user
      let arrUnionFollower = followerRef.update({
        listOfFollowers: firebase.firestore.FieldValue.arrayUnion(
          this.state.user.uid,
        ),
      });
    }

    if (this.state.followClick == true || this.state.isFollowing == true) {
      this.setState({
        followClick: !this.state.followClick,
        isFollowing: !this.state.isFollowing,
      });

      let arrRemoveFollowing = followingRef.update({
        listOfFollowing: firebase.firestore.FieldValue.arrayRemove(
          this.props.userToFollow,
        ),
      });

      let arrRemoveFollower = followerRef.update({
        listOfFollowers: firebase.firestore.FieldValue.arrayRemove(
          this.state.user.uid,
        ),
      });
    }
  };

  render() {
    const buttonColor = this.state.followClick ? '#68a0cf' : 'white';
    const followState = this.state.isFollowing ? 'Unfollow' : 'Follow';

    return (
      <TouchableHighlight
        style={{
          width: 70,
          height: 20,
          backgroundColor: buttonColor,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'black',
          color: '#52575D',
          fontFamily: 'HelveticaNeue',
          fontSize: 1
        }}
        onPress={this.followAction}>
        <Text style={{ textAlign: 'center' }}>{followState}</Text>
      </TouchableHighlight>
    );
  }

}
