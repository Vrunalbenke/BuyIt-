import {DeviceEventEmitter} from 'react-native';
import {storage} from '../../App';
import {LoginResponse} from '../services/Auth/authTypes';

// Create a new instance of MMKV

const getToken = storage.getString('token');
const TokenData = getToken ? JSON.parse(getToken) : undefined;

export let accessToken = TokenData?.accessToken?.token;
export let refreshToken = TokenData?.refreshToken?.token;
console.log(accessToken, '🥨🥨🥨🥨🥨🥨🥨🥨');

let profileImage = storage.getString('profileImage');
export let userProfileImage = profileImage ? profileImage : undefined;

let searchRadius = storage.getString('radius');
export let radius = searchRadius ? searchRadius : 100;

let language = storage.getString('lang');
export let lang = language ? language : 'en';

let user = storage.getString('user');
export let UserData = user ? JSON.parse(user) : undefined;

DeviceEventEmitter.addListener('token', (newTokenData: LoginResponse) => {
  accessToken = newTokenData?.accessToken?.token;
  refreshToken = newTokenData?.refreshToken?.token;
});

DeviceEventEmitter.addListener('profileImage', (Image: string) => {
  console.log(userProfileImage, 'Updating Token', Image);
  userProfileImage = Image;
});

DeviceEventEmitter.addListener('radius', (newRadius: string) => {
  console.log(radius, ' Updated radius', newRadius);
  radius = newRadius;
});

DeviceEventEmitter.addListener('lang', (newLang: string) => {
  console.log(lang, ' Updated lang', newLang);
  lang = newLang;
});

DeviceEventEmitter.addListener('user', (newUserData: any) => {
  console.log(UserData, ' Updated user', newUserData);
  UserData = newUserData;
});
