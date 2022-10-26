import axios from 'axios';

export const getTodos = async () => {
  const result = await axios.get('/todos');
  return {
    result,
    errorMsg: {
      default: '할 일 목록을 불러오는데 실패하였습니다!'
    }
  };
};

export const createTodo = async (todo) => {
  const result = await axios.post('/todos', { todo });
  return {
    result,
    errorMsg: {
      default: '할 일 목록을 추가하는데 실패하였습니다!',
    }
  };
};

export const updateTodo = async (id, todo, isCompleted) => {
  const result = await axios.put(`/todos/${id}`, { todo, isCompleted });
  return {
    result,
    errorMsg: {
      default: '할 일 목록을 수정하는데 실패하였습니다!'
    }
  };
};

export const deleteTodo = async (id) => {
  const result = await axios.delete(`/todos/${id}`);
  return {
    result,
    errorMsg: {
      default: '할 일 목록을 삭제하는데 실패하였습니다!'
    }
  };
};