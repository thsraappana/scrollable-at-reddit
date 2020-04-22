import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;

function ContentSlide(props) {
  const pan = useRef(new Animated.ValueXY()).current;

  console.log('props', props);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.prevButton} onPress={() => props.scrollToPrev()}>
        <Text>PREV</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
      <View style={styles.contentContainer}>
      {props.contentPrev ? (
        <Image
          style={styles.contentImg}
          source={{
            uri: props.contentPrev.data.url,
          }}
        />
        ): null}
      {props.content ? (
        <Image
          style={styles.contentImg}
          source={{
            uri: props.content.data.url,
          }}
        />
        ): null}
      {props.contentNext ? (
        <Image
          style={styles.contentImg}
          source={{
            uri: props.contentNext.data.url,
          }}
        />
        ): null}
      </View>
      </Animated.View>
      <TouchableOpacity style={styles.nextButton} onPress={() => props.scrollToNext()}>
        <Text>Next</Text>
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
    transform: [
      { translateY: -windowHeight }
    ],
  },
  contentImg: {
    height: windowHeight,
  },
  nextButton: {
    backgroundColor: '#f194ff',
    position: 'absolute',
    bottom: 0,
    zIndex: 9,
  },
  prevButton: {
    backgroundColor: '#f194ff',
    position: 'absolute',
    top: 0,
    zIndex: 9,
  },
});

export default ContentSlide;