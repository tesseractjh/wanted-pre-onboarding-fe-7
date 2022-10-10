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

function TodoList({ todoList, setTodoList }) {
  const deleteTodo = useAPI(TodoAPI.deleteTodo);
  const updateTodo = useAPI(TodoAPI.updateTodo);

  const handleDelete = (id, onAfterDelete) => async () => {
    await deleteTodo([id], {
      onSuccess: async () => {
        await onAfterDelete();
        setTodoList(state => {
          const index = state.findIndex(({ id: prevId }) => prevId === id);
          const newState = [...state];
          newState.splice(index, 1);
          return newState;
        });
      }
    });
  };

  const handleSubmit = (id, todo, isCompleted) => async () => {
    await updateTodo([id, todo, isCompleted], {
      onSuccess: async ({ data }) => {
        setTodoList(state => {
          const { id } = data;
          const index = state.findIndex(({ id: prevId }) => prevId === id);
          const newState = [...state];
          newState[index] = data;
          return newState;
        });
      }
    });
  };

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
