import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import useAutoResize from '../../hooks/useAutoResize';
import wait from '../../utils/wait';

const Container = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 17%);
  line-height: 1.5;
  transition: all 0.15s;

  ${({ isDeleted }) => isDeleted ? `
      transform: translateX(100%);
      transition: all 0.25s;
    ` : ''}

  &:hover {
    box-shadow: 1px 4px 10px rgb(0 0 0 / 30%);
    transform: scale(1.03);
    transform-origin: center center;

    ${({ isDeleted }) => isDeleted ? `
      transform: scale(1.03) translateX(100%);
      transition: all 0.25s;
    ` : ''}
  }

  ${({ isCompleted }) => isCompleted ? 'background-color: #eeeeee;' : ''}
`;

const Todo = styled.p`
  flex: 1;
  word-break: break-all;

  ${({ isCompleted }) => isCompleted ? `
    text-decoration: line-through;
    color: #aaaaaa;
  ` : ''}
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

const ButtonWrapper = styled.div`
  flex-shrink: 0;
  margin-left: 20px;
`;

const Button = styled.button`
  padding: 6px 16px;
`;

const UpdateButton = styled(Button)`
  margin-right: 10px;
  background-color: rgb(200, 175, 220);

  &:hover {
    background-color: rgb(211, 197, 223);
  }
`;

const DeleteButton = styled(Button)`
  background-color: rgb(250, 150, 150);

  &:hover {
    background-color: rgb(250, 184, 184);
  }
`;

const CancelButton = styled(DeleteButton)`
  margin-right: 10px;
`;

const SubmitButton = styled(Button)`
  background-color: rgb(100, 150, 250);

  &:hover {
    background-color: rgb(120, 175, 250);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin: 0 10px 0 0;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
`;

function TodoItem({ id, todo, isCompleted, handleDelete, handleSubmit }) {
  const [value, setValue] = useState(todo);
  const [checked, setChecked] = useState(isCompleted);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const ref = useRef(null);
  const resize = useAutoResize(ref, isEditable);
  const itemId = `todo-item-${id}`;

  const handleInputChange = ({ currentTarget: { value } }) => {
    setValue(value);
    resize();
  };

  const handleCheckboxChange = ({ currentTarget: { checked } }) => {
    setChecked(checked);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setValue(todo);
    setChecked(isCompleted);
  };

  const submit = async () => {
    if (!value) {
      alert('할 일을 입력하세요!');
      return;
    }
    await handleSubmit(id, value, checked)();
    setIsEditable(false);
  };

  const onAfterDelete = async () => {
    setIsDeleted(true);
    await wait(250);
  };

  if (isEditable) {
    return (
      <Container isCompleted={checked} isDeleted={isDeleted}>
        <Textarea
          ref={ref}
          placeholder="할 일을 작성해주세요."
          value={value}
          onChange={handleInputChange}
        />
        <ButtonWrapper>
          <CheckboxWrapper>
            <Checkbox
              id={itemId}
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel htmlFor={itemId}>완료</CheckboxLabel>
          </CheckboxWrapper>
          <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
          <SubmitButton type="button" onClick={submit}>확인</SubmitButton>
        </ButtonWrapper>
      </Container>
    );
  }

  return (
    <Container isCompleted={checked} isDeleted={isDeleted}>
      <Todo isCompleted={checked}>{todo}</Todo>
      <ButtonWrapper>
        <UpdateButton type="button" onClick={handleEdit}>수정</UpdateButton>
        <DeleteButton type="button" onClick={handleDelete(id, onAfterDelete)}>삭제</DeleteButton>
      </ButtonWrapper>
    </Container>
  );
}

export default TodoItem;
