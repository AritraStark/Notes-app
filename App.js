import React, { Component, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import Note from './components/notes';
import db from './config';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    };
  }
  
  componentDidMount(){
    const tasks = db.ref('tasks')
    tasks.on('value',(snap=>{
      const todos = snap.val();
      const taskList = [];
      for (let id in todos) {
        taskList.push({ id, ...todos[id] });
      }
      this.setState({ noteArray: taskList });
    }));
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          doneMethod={() => this.doneNote(key)}
        />
      )
    });

    return (
      <View style={styles.container}>
        <Header
          
            containerStyle={{
              backgroundColor: '#101116',
              justifyContent: 'space-around',
              position:"absolute",
              zIndex:100,
              display:"flex",
              shadowRadius:15,
              shadowOpacity:0.7,
              margin:0,
              shadowColor:"white",
              alignSelf:"stretch",
              width:"100%",
              opacity:0.95,
              elevation:18
            }}
          centerComponent={{
            text: "Notes",
            style: { color: '#fff', fontSize: 20  },
          }}
        />

        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter task here"
            onChangeText={(noteText) => this.setState({ noteText })}
            value={this.state.noteText}
            placeholderTextColor="#101116"
            underlineColorAndroid="transparent"></TextInput>
        </View>

        <TouchableOpacity
          onPress={this.addNote.bind(this)}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }


  async addNote() {
    if (this.state.noteText) {
      const tasks = db.ref('tasks');
      var d = new Date();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const newTask = {
        date:
          (d.getDate() + 1) + ' ' + (monthNames[d.getMonth()]) + ' ' + d.getFullYear(),
        note: this.state.noteText,
      };
      
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: '' });
      
      tasks.push(newTask);
      
      // await all.add(this.state.noteArray);
    }
  }

  async doneNote(key) {
      const node = db.ref('tasks').child(this.state.noteArray[key].id);
      node.remove();
      this.state.noteArray.splice(key, 1);
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#D5D7DD"
  },

  scrollContainer: {
    flex: 1,
    marginBottom: 100,
    width:308,
    display:"flex",
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity:0.9,
    
    
    
  },

  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 20,
    marginTop:0,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#101116',
    borderTopRightRadius: 15,
    borderTopLeftRadius:15,
    margin:10,
    shadowRadius:18,
    shadowOpacity:0.7,
    shadowColor:"white",
  },

  addButton: {
    position: 'absolute',
    display:'flex',
    right: 20,
    bottom: 20,
    backgroundColor: '#101116',
    width: 40,
    height: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 26,
  },
});
