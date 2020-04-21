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

import ApiManager from './src/api/ApiManager';
import { useMountEffect } from './src/CustomHooks';

function App() {
  useMountEffect(() => {
    const API_URL = 'https://www.reddit.com/api/v1/';
    ApiManager.init(API_URL);

    async function fetchAccessToken() {
      try {
        const response = await ApiManager.getAccessToken();
        if (response && response.data) {
          ApiManager.setAccessToken(response.data.access_token);
          ApiManager.fetchSubredditHotData('images').then((data) => {
            console.log('fetch data', data);
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
    <SafeAreaView>
      <View>
        <Text>App goes here</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
