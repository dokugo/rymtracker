import React, { useState, createRef } from 'react';
import styled from 'styled-components/macro';
import {
  validateUsername,
  validateEmail,
  cleanObject
} from '../../../../utils/utils';
import Input from '../Input';
import Button from '../Button';
import { FormItem, InputText, InputGroup, Tooltip } from '../ui/common';
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
    } else if (!inputData?.email) {
      emailInputRef.current.focus();
    } else if (!inputData?.username) {
      usernameInputRef.current.focus();
    }
  };

  const handleInputChange = event => {
    if (event.target.name === 'email') {
      setInputData({ ...inputData, email: event.target.value });
    }
    if (event.target.name === 'username') {
      setInputData({ ...inputData, username: event.target.value });
    }

    setFormState({ ...formState, error: false, default: true, message: null });
  };

  const handleRequest = async event => {
    event.preventDefault();

    if (formState.loading) return;

    if (!inputData || !inputData?.email || !inputData?.username) {
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

    setFormState({ ...formState, loading: true, message: null });
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
