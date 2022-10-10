import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import useAPI from '../../hooks/useAPI';
import { TodoAPI } from '../../api';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const Container = styled.div`
  overflow: hidden;
  width: 800px;
  padding: 20px;
  margin: 80px auto 0;
`;

const Title = styled.h1`
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 4px solid black;
  font-weight: 700;
  font-size: 32px;
`;

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const getTodos = useAPI(TodoAPI.getTodos);

  const fetchList = useCallback(async () => {
      await getTodos([], {
        onSuccess: ({ data }) => setTodoList(data)
      });
    },
    []
  );

  return (
    <Container>
      <Title>할 일 목록</Title>
      <AddTodo fetchList={fetchList} />
      <TodoList todoList={todoList} fetchList={fetchList} />
    </Container>
  );
}

export default Todo;
