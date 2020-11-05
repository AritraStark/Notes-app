import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class Note extends React.Component {
  render() {
    return (
      <View key={this.props.keyval} style={styles.note}>
        <Text style={styles.noteText}>{this.props.val.note}</Text>
        <Text style={styles.noteText}>{this.props.val.date}</Text>
        <TouchableOpacity
          onPress={this.props.doneMethod}
          style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    margin:10,
    backgroundColor:"white",
    opacity:0.9
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#BEC0C8',
    color:"#101116"
  },

  noteDelete: {
    position: 'absolute',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius:10,
    right: 10,
    bottom: 10,
    top: 10,
    backgroundColor: '#7A7D8B',
  },
  noteDeleteText:{
    color:"white"
  }
});
