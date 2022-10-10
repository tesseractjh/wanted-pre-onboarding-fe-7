import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { getTodos } from '../../api';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

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

  const fetchList = useCallback(async () => {
      const { data, message } = await getTodos();
      if (data) {
        setTodoList(data);
      } else {
        alert(message);
      }
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
