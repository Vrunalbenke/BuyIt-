import {storage} from '../../App';

const TokenData = JSON.parse(storage.getString('token'));

export const accessToken = TokenData.accessToken.token;
export const refreshToken = TokenData.refreshToken.token;
