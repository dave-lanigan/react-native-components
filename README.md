# react-native-components

Custom react native components I was not able to find elsewhere.

### Language Tutorial Modal
Supposed to mimic the Duolingo App language practice page. Currently, only works for translating Foreign Language --> English. Requires you pass in list of objects structured thus: {foreign_language: "sentance",english:"english translation",answered:false}. The object keys are used to display the language. The component appears as a button labeled MODAL which when pressed activates the modal.

Expo Snack: https://snack.expo.io/@daithi/tutorial-modal

```
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import TutorialModal from './tutorialModel';

export default function App() {

  let questions = [
    {latin:"Salve, quam vos?", english:"Hello, how are you?", answered: false },
    {latin:"Salve, quam vos?", english:"Hello, how are you?", answered: false },];

  return (
    <View style={styles.container}>
      <TutorialModal data={questions} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});



```
