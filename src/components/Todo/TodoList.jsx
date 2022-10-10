import { useEffect } from 'react';
import styled from '@emotion/styled';
import useAPI from '../../hooks/useAPI';
import { TodoAPI } from '../../api';
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
  const deleteTodo = useAPI(TodoAPI.deleteTodo);
  const updateTodo = useAPI(TodoAPI.updateTodo);

  const handleDelete = (id, onAfter) => async () => {
    await deleteTodo([id], {
      onSuccess: async () => {
        await onAfter();
        await fetchList();
      }
    });
  };

  const handleSubmit = (id, todo, isCompleted) => async () => {
    await updateTodo([id, todo, isCompleted], {
      onSuccess: async () => {
        await fetchList();
      }
    });
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
