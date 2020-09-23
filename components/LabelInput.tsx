import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > *:not(:first-child) {
    margin-top: 0.6rem;
  }
`;
const Label = styled.label``;
const Input = styled.input`
  padding: 1.5rem 1.1rem;
  border-radius: 6px;
  border: 0.7px solid #c4c4c4;
`;
const Korean = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.3;
`;
const English = styled.span`
  display: inline-block;
  margin-left: 0.7rem;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Maven Pro", sans-serif;
  line-height: 1.45;
`;

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label?: string;
  placeholder?: string;
}

const LabelInput = ({ type, label, placeholder }: LabelInputProps) => {
  return (
    <Block>
      <Label>
        <Korean>{label && label.split(" ")[0]}</Korean>
        <English>{label && label.split(" ")[1]}</English>
      </Label>
      <Input type={type} placeholder={placeholder}></Input>
    </Block>
  );
};

LabelInput.defaultProps = {
  type: "text",
};

export default LabelInput;
