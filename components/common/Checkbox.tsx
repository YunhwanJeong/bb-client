import styled from "styled-components";

const Block = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1.3;
`;
const Input = styled.input`
  width: 13px;
  height: 13px;
  margin-right: 7px;
  border: 1px solid #373f41;
  cursor: pointer;
  &:checked {
    background-color: black;
  }
`;

const Checkbox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Block>
      <Label>
        <Input type="checkbox"></Input>
        {children}
      </Label>
    </Block>
  );
};

export default Checkbox;
