import { useNavigate } from 'react-router-dom';

const defaultErrorMsg = {
  401: '로그인이 필요합니다!'
};

const defaultRedirect = {
  401: '/'
};

function useAPI(api) {
  const navigate = useNavigate();

  const API = async (params = [], config = {}) => {
    const { onSuccess, onError } = config;
    const { result, errorMsg: customErrorMsg = {}, redirect = {} } = await api(...params);
    const { data, status } = result;
    
    if (status >= 200 && status < 300) {
      if (onSuccess) {
        await onSuccess(data);
      }
      return;
    }

    if (onError) {
      await onError({ result, errorMsg: customErrorMsg, redirect });
    } else {
      const { message } = data ?? {};
      const errorMsg = { ...defaultErrorMsg, ...customErrorMsg };
      const alertMsg = errorMsg[status] || message || errorMsg.default;
      const redirectRoute = { ...defaultRedirect, ...redirect }[status];

      if (alertMsg) {
        alert(alertMsg);
      }

      if (redirectRoute) {
        navigate(redirectRoute);
      }
    }
  };

  return API;
}

export default useAPI;
