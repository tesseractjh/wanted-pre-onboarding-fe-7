import axios from 'axios';

export const getTodos = async () => {
  const { data } = await axios.get('/todos');
  const defaultMessage = '할 일 목록을 불러오는데 실패하였습니다!';

  if (!data) {
    return { message: defaultMessage };
  }

  return { data };
};

export const createTodo = async (todo) => {
  const { data, status } = await axios.post('/todos', { todo });
  const defaultMessage = '할 일 목록을 추가하는데 실패하였습니다!';

  if (!data) {
    return { message: defaultMessage };
  }

  const { statusCode, message } = data;

  if (status === 201) {
    return { ok: true };
  }

  if (statusCode === 401) {
    return { ok: false, message: '로그인이 필요합니다!', redirect: '/' };
  }

  return { ok: false, message: message ?? defaultMessage };
};

export const updateTodo = async (id, todo, isCompleted) => {
  const { data, status } = await axios.put(`/todos/${id}`, { todo, isCompleted });
  const defaultMessage = '할 일 목록을 수정하는데 실패하였습니다!';

  if (status === 200) {
    return { ok: true };
  }

  const { statusCode, message } = data;

  if (statusCode === 401) {
    return { ok: false, message: '로그인이 필요합니다!', redirect: '/' };
  }

  return { ok: false, message: message ?? defaultMessage };
};

export const deleteTodo = async (id) => {
  const { data, status } = await axios.delete(`/todos/${id}`);
  const defaultMessage = '할 일 목록을 삭제하는데 실패하였습니다!';

  if (status === 204) {
    return { ok: true };
  }

  const { statusCode, message } = data;

  if (statusCode === 401) {
    return { ok: false, message: '로그인이 필요합니다!', redirect: '/' };
  }

  return { ok: false, message: message ?? defaultMessage };
};