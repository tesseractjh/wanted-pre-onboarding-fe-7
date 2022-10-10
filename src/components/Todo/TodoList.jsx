import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, updateTodo } from '../../api';
import TodoItem from './TodoItem';

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoTodo = styled.li`
  height: 100px;
  font-size: 24px;
  text-align: center;
  line-height: 100px;
`;

function TodoList({ todoList, fetchList }) {
  const navigate = useNavigate();

  const handleDelete = (id, onAfter) => async () => {
    const { ok, message, redirect } = await deleteTodo(id);
    if (ok) {
      if (onAfter) {
        await onAfter();
      }
      await fetchList();
    } else {
      alert(message);
      if (redirect) {
        navigate(redirect);
      }
    }
  };

  const handleSubmit = (id, todo, isCompleted) => async () => {
    const { ok, message, redirect } = await updateTodo(id, todo, isCompleted);
    if (ok) {
      await fetchList();
    } else {
      alert(message);
      if (redirect) {
        navigate(redirect);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Container>
      {
        todoList.length
          ? todoList.map(
              ({ id, todo, isCompleted }) => 
                <TodoItem
                  key={id}
                  id={id}
                  todo={todo} 
                  isCompleted={isCompleted}
                  handleDelete={handleDelete}
                  handleSubmit={handleSubmit}
                />
            )
          : <NoTodo>할 일 목록이 없습니다! 새로운 할 일을 추가해주세요.</NoTodo>
      
      }
    </Container>
  );
}

export default TodoList;
