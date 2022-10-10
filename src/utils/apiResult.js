const apiResult = (data, isSuccess, errorMsg, redirect) => {
  if (isSuccess) {
    return { ok: true, data };
  }

  const { defaultMsg } = errorMsg;
  if (!data) {
    return { ok: false, message: defaultMsg };
  }

  const { statusCode, message } = data;
  if (redirect?.[statusCode]) {
    return {
      ok: false,
      message: errorMsg[statusCode] ?? message,
      redirect: redirect[statusCode]
    };
  }
  return { ok: false, message: errorMsg[statusCode] ?? message };
};

export default apiResult;
