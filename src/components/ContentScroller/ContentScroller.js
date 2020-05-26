import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import ContentSlide from '../ContentSlide/ContentSlide';

function ContentScroller(props) {
  const [contentIndex, setContentIndex] = useState(0);

  function scrollToNext() {
    if (contentIndex <= 25) {
      setContentIndex(contentIndex + 1);
    } else {
      alert('need to fetch more content');
    }
  }

  function scrollToPrev() {
    if (contentIndex > 0) {
      setContentIndex(contentIndex - 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      <ContentSlide content={props.data[contentIndex]} contentIndex={contentIndex} scrollToNext={scrollToNext} scrollToPrev={scrollToPrev} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
});

export default ContentScroller;