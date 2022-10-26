import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { validateEmail, validatePassword } from '../../utils/formValidation';
import useAPI from '../../hooks/useAPI';
import { AuthAPI } from '../../api';
import Input from "./Input";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 16px rgb(0 0 0 / 17%);
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 28px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 0;
  border: none;
  font-size: 18px;
  color: white;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const SignUpButton = styled(Button)`
  flex: 1;
  background-color: rgb(100, 150, 250);

  &:not(:disabled):hover {
    background-color: rgb(120, 175, 250);
  }
`;

const SignInButton = styled(Button)`
  flex: 2;
  background-color: rgb(250, 120, 130);

  &:not(:disabled):hover {
    background-color: rgb(250, 150, 150);
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isValid = validateEmail(email) && validatePassword(password);
  const navigate = useNavigate();
  const signUp = useAPI(AuthAPI.signUp);
  const signIn = useAPI(AuthAPI.signIn);

  const handleEmailChange = ({ currentTarget: { value } }) => {
    setEmail(value);
  };

  const handlePasswordChange = ({ currentTarget: { value } }) => {
    setPassword(value);
  };

  const handleClick = (api) => async () => {
    if (isValid) {
      await api([email, password], {
        onSuccess: (data) => {
          const { access_token } = data;
          localStorage.setItem('accessToken', access_token);
          navigate('/todo');
        }
      });
    } else {
      alert('이메일 또는 비밀번호가 유효하지 않습니다!');
    }
  };

  return (
    <Container>
      <LoginForm>
        <Title>로그인</Title>
        <Input
          id="input-email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          id="input-password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
        />
        <ButtonContainer>
          <SignUpButton
            type="button"
            disabled={!isValid}
            onClick={handleClick(signUp)}
          >
            회원가입
          </SignUpButton>
          <SignInButton
            type="button"
            disabled={!isValid}
            onClick={handleClick(signIn)}
          >
            로그인
          </SignInButton>
        </ButtonContainer>
      </LoginForm>
    </Container>
  );
}

export default Login;
