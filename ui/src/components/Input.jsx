import styled from 'styled-components'
import { forwardRef } from 'react';

const InputContainer = styled.div`
    border-radius: 10px;
    padding-top: 2vh;
    margin: auto;
    & input{
        height: 2vh;
        width: 20vh;
        border-radius: 5px;
        font-size: 1em;
        padding: 0.5rem;
    }
`;

const Input = forwardRef((props, ref) => (
    <InputContainer>
      <input {...props} ref={ref} />
    </InputContainer>
  ));

export default Input;