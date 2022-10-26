import axios from 'axios';

export const signUp = async (email, password) => {
  const result = await axios.post('/auth/signup', { email, password });
  return {
    result,
    errorMsg: {
      default: '회원가입에 실패하였습니다!'
    }
  };
};

export const signIn = async (email, password) => {
  const result = await axios.post('/auth/signin', { email, password });
  return {
    result,
    errorMsg: {
      default: '로그인에 실패하였습니다!',
      401: '아이디 또는 비밀번호가 일치하지 않습니다!'
    }
  };
};