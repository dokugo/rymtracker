import React, { useState, createRef } from 'react';
import styled from 'styled-components/macro';
import {
  validateUsername,
  validateEmail,
  cleanObject
} from '../../../../utils/utils';
import Input from '../Input';
import Button from '../Button';
import request from '../../../../api/put';

const SubForm = () => {
  const [inputData, setInputData] = useState(null);
  const [formState, setFormState] = useState({
    default: true,
    loading: false,
    error: false,
    message: null
  });

  const emailInputRef = createRef();
  const usernameInputRef = createRef();

  const focusInput = input => {
    if (input) input.current.focus();

    if (!inputData) {
      emailInputRef.current.focus();
    } else if (inputData && !inputData.email) {
      emailInputRef.current.focus();
    } else if (inputData && !inputData.username) {
      usernameInputRef.current.focus();
    }
  };

  const handleInputChange = event => {
    if (event.target.name === 'email') {
      setInputData({
        ...inputData,
        email: event.target.value.trim().toLowerCase()
      });
    }
    if (event.target.name === 'username') {
      setInputData({
        ...inputData,
        username: event.target.value.trim().toLowerCase()
      });
    }

    setFormState({
      ...formState,
      error: false,
      default: false,
      message: null
    });

    // console.log(inputData);
  };

  const handleRequest = event => {
    event.preventDefault();

    console.log(inputData);
    console.log(formState.invalid);

    if (formState.loading) {
      return;
    }

    //try optional chaining
    if (
      !inputData ||
      (inputData && !inputData.email) ||
      (inputData && !inputData.username)
    ) {
      setFormState({
        ...formState,
        default: false,
        error: true,
        message: `Can't send incomplete request.`
      });
      focusInput();
      return;
    }

    if (!validateEmail(inputData.email)) {
      setFormState({
        ...formState,
        default: false,
        error: true,
        message: 'Incorrect email format.'
      });
      focusInput(emailInputRef);
      return;
    }

    if (!validateUsername(inputData.username)) {
      setFormState({
        ...formState,
        default: false,
        error: true,
        message: 'Incorrect username format.'
      });
      focusInput(usernameInputRef);
      return;
    }

    setFormState({
      ...formState,
      loading: true,
      message: null
    });
    emailInputRef.current.blur();
    usernameInputRef.current.blur();

    cleanObject(inputData);
    const response = await request(inputData);

    setFormState({ ...formState, loading: false, message: response.message });
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputText>
        Subscribe to a weekly mail of the upcoming releases list taken from a
        specified RYM account
      </InputText>

      <InputGroup>
        <InputBox>
          <Input
            handleInputChange={handleInputChange}
            inputState={formState}
            ref={emailInputRef}
            title="Email"
            name="email"
          />
        </InputBox>
        <InputBox>
          <Input
            handleInputChange={handleInputChange}
            inputState={formState}
            ref={usernameInputRef}
            title="Username"
            name="username"
          />
        </InputBox>
        <Button formState={formState} type={'sub'} />
      </InputGroup>

      <Tooltip formState={formState}>
        {formState.message ? formState.message : null}
      </Tooltip>
    </FormItem>
  );
};

export default SubForm;

const FormItem = styled.form`
  margin-bottom: 30px;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const InputText = styled.div`
  box-sizing: border-box;
  padding: 20px 10px;
  font-size: 20px;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    width: 100%;
    text-align: center;
  }
`;

const InputGroup = styled.div`
  display: flex;
  position: relative;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    flex-direction: column;
    width: 100%;
  }
`;

const InputBox = styled.div`
  &:nth-of-type(1) {
    margin-right: 15px;
  }
  @media (max-width: 660px) {
    &:nth-of-type(1) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 0px 10px;
  margin-top: 5px;
  color: ${({ formState, theme }) =>
    formState.error ? theme.tooltip.error : theme.tooltip.default};
`;
