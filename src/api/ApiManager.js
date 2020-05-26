import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const Buffer = require('buffer/').Buffer;
const FormData = require('form-data');

const client_id = 'wV8hX_tD69OcDg';
const redirect_uri = 'http://localhost:8080';
const duration = 'temporary';

const version = DeviceInfo.getVersion();

const errorHandling = (error, call) => {
  console.log(`[API][${call}] Got errored -> ${error}`);

  if (error.response) {
    throw new Error(error);
  }

  if (error.request) {
    throw new Error(error.request);
  }

  throw new Error(error.message);
};

class ApiManager  {
  init(endpoint) {
    this.name = 'ApiManager';
    this.endpoint = endpoint;
    this.initialized = true;

    // used for authentication
    this.accessToken = '';
  }

  getAccessToken() {
    const token = Buffer.from(`${client_id}:''`, 'utf8').toString('base64');

    const endpoint = `${this.endpoint}access_token`;

    const form = new FormData();
    form.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
    form.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');

    return axios({
      method: 'post',
      url: endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`,
        'User-Agent': `android:com.scrollableatreddit:v${version} (by /u/TommiJJ)`,
      },
      data: form,
    })
      .then((response) => response)
      .catch(e => {
        console.log('e', e.request);
        errorHandling(e, 'getAccessToken')
      });
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  fetchSubredditHotData(sub) {
    const endpoint = `https://oauth.reddit.com/r/${sub}/hot?limit=25?show=all`;

    return axios({
      method: 'get',
      url: endpoint,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
      .then((req) => req.data.data)
      .catch(e => errorHandling(e, 'getAccessToken'));
  }
}

export default new ApiManager();