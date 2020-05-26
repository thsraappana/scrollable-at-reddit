import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

function ContentSlide(props) {
  console.log('props', props.content);
  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={props.contentIndex === 0} style={props.contentIndex === 0 ? styles.disabledButton : styles.controlButton} onPress={() => props.scrollToPrev()}>
        <Text style={styles.controlButtonText}>PREV</Text>
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        {props.content ? (
          <Image
            style={styles.contentImg}
            source={{
              uri: props.content.data.url,
            }}
          />
        ): null}
      </View>
      <TouchableOpacity style={styles.controlButton} onPress={() => props.scrollToNext()}>
        <Text style={styles.controlButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  contentImg: {
    width: '100%',
    height: '100%',
  },
  controlButton: {
    backgroundColor: '#f194ff',
    padding: 16,
    width: '100%',
  },
  controlButtonText: {
    color: '#fff',
    width: '100%',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 16,
    opacity: 0.6,
    width: '100%',
  }
});

export default ContentSlide;