import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ContentSlide from '../ContentSlide/ContentSlide';

function ContentScroller(props) {
  const [contentIndex, setContentIndex] = useState(1);

  function scrollToNext() {
    console.log('scroll to next slide');
    setContentIndex(contentIndex + 1);
  }

  function scrollToPrev() {
    console.log('scroll to next slide');
    setContentIndex(contentIndex - 1);
  }

  return (
    <View style={styles.container}>
      <ContentSlide content={props.data[contentIndex]} contentNext={props.data[contentIndex+1]} contentPrev={props.data[contentIndex-1]} scrollToNext={scrollToNext} scrollToPrev={scrollToPrev} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
});

export default ContentScroller;