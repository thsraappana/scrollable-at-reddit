/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ContentScroller from './src/components/ContentScroller/ContentScroller';
import ApiManager from './src/api/ApiManager';
import { useMountEffect } from './src/CustomHooks';

console.disableYellowBox = true;

function App() {
  const [contentData, setContentData] = useState([]);
  useMountEffect(() => {
    const API_URL = 'https://www.reddit.com/api/v1/';
    ApiManager.init(API_URL);

    async function fetchAccessToken() {
      try {
        const response = await ApiManager.getAccessToken();
        if (response && response.data) {
          ApiManager.setAccessToken(response.data.access_token);
          ApiManager.fetchSubredditHotData('images').then((data) => {
            setContentData(data.children);
          })
          .catch(e => console.log(e))
        }
      } catch(err) {
        console.log(err); // TypeError: failed to fetch
      }
    }
    fetchAccessToken();
  });

  return (
    <SafeAreaView style={styles.app}>
      <ContentScroller data={contentData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});


export default App;
