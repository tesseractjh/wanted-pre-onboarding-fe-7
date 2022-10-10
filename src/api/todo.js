import axios from 'axios';
import apiResult from '../utils/apiResult';

export const getTodos = async () => {
  const { data } = await axios.get('/todos');
  return apiResult(data, data, {
    defaultMsg: '할 일 목록을 불러오는데 실패하였습니다!'
  });
};

export const createTodo = async (todo) => {
  const { data, status } = await axios.post('/todos', { todo });
  return apiResult(
    data,
    status === 201,
    {
      defaultMsg: '할 일 목록을 추가하는데 실패하였습니다!',
      401: '로그인이 필요합니다!'
    },
    {
      401: '/'
    }
  );
};

export const updateTodo = async (id, todo, isCompleted) => {
  const { data, status } = await axios.put(`/todos/${id}`, { todo, isCompleted });
  return apiResult(
    data,
    status === 200,
    {
      defaultMsg: '할 일 목록을 수정하는데 실패하였습니다!',
      401: '로그인이 필요합니다!'
    },
    {
      401: '/'
    }
  );
};

export const deleteTodo = async (id) => {
  const { data, status } = await axios.delete(`/todos/${id}`);
  return apiResult(
    data,
    status === 204,
    {
      defaultMsg: '할 일 목록을 삭제하는데 실패하였습니다!',
      401: '로그인이 필요합니다!'
    },
    {
      401: '/'
    }
  );
};