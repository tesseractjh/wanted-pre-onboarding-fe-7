import axios from 'axios';
import apiResult from '../utils/apiResult';

export const signUp = async (email, password) => {
  const { data } = await axios.post('/auth/signup', { email, password });
  return apiResult(data, data?.access_token, {
    defaultMsg: '회원가입에 실패하였습니다!'
  });
};  

export const signIn = async (email, password) => {
  const { data } = await axios.post('/auth/signin', { email, password });
  return apiResult(data, data?.access_token, {
    defaultMsg: '로그인에 실패하였습니다!',
    401: '아이디 또는 비밀번호가 일치하지 않습니다!'
  });
};