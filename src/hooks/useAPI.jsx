import { useNavigate } from 'react-router-dom';

function useAPI(api) {
  const navigate = useNavigate();

  const API = async (params = [], config = {}) => {
    const { onSuccess, onError } = config;
    const { ok, data, message, redirect } = await api(...params);
    
    if (ok) {
      if (onSuccess) {
        await onSuccess({ data });
      }
    } else {
      if (onError) {
        await onError({ data, message, redirect });
      } else {
        alert(message);
        if (redirect) {
          navigate(redirect);
        }
      }
    }

    return { ok, data, message, redirect };
  };

  return API;
}

export default useAPI;
