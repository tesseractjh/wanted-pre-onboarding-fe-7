import axios from 'axios';

export const signUp = async (email, password) => {
  const { data } = await axios.post('/auth/signup', { email, password });
  const defaultMessage = '회원가입에 실패하였습니다!';

  if (!data) {
    return { ok: false, message: defaultMessage };
  }

  const { access_token, message } = data;

  if (access_token) {
    localStorage.setItem('accessToken', access_token);
    return { ok: true };
  }

  return { ok: false, message: message ?? defaultMessage };
}

export const signIn = async (email, password) => {
  const { data } = await axios.post('/auth/signin', { email, password });
  const defaultMessage = '로그인에 실패하였습니다!';

  if (!data) {
    return { ok: false, message: defaultMessage };
  }

  const { access_token, statusCode, message } = data;
  
  if (statusCode === 401) {
    return { ok: false, message: '아이디 또는 비밀번호가 일치하지 않습니다!' };
  }

  if (access_token) {
    localStorage.setItem('accessToken', access_token);
    return { ok: true };
  }

  return { ok: false, message: message ?? defaultMessage};
}