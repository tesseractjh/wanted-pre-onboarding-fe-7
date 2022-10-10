import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
`;

const StyledInput = styled.input`
  display: inline-block;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid black;
  font-size: 16px;
`;

function Input({ id, type, label, placeholder, state, onChange }) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
        <StyledInput
          type={type}
          id={id}
          placeholder={placeholder}
          value={state}
          onChange={onChange}
        />
    </Container>
  )
}

export default Input;
