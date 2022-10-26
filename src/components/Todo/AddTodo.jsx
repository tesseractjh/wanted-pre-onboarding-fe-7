import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import useAPI from '../../hooks/useAPI';
import { TodoAPI } from '../../api';
import useAutoResize from '../../hooks/useAutoResize';

const Container = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 8px 10px;
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
`;

const AddButton = styled.button`
  display: inline-block;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background-color: rgb(100, 150, 250);
  font-size: 50px;
  color: white;

  &:hover {
    background-color: rgb(120, 175, 250);
  }

  &::before {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
`;

function AddTodo({ setTodoList }) {
  const [todo, setTodo] = useState('');
  const ref = useRef(null);
  const resize = useAutoResize(ref);
  const createTodo = useAPI(TodoAPI.createTodo);

  const handleChange = ({ currentTarget: { value } }) => {
    setTodo(value);
    resize();
  };

  const handleClick = async () => {
    if (todo) {
      await createTodo([todo], {
        onSuccess: (data) => {
          setTodo('');
          setTodoList(state => [...state, data]);
          resize();
        }
      });
    } else {
      alert('할 일을 입력하세요!');
    }
  };

  return (
    <Container>
      <Textarea
        ref={ref}
        placeholder="새로운 할 일을 입력하세요."
        value={todo}
        onChange={handleChange}
      />
      <AddButton type="button" onClick={handleClick} />
    </Container>
  );
}

export default AddTodo;
