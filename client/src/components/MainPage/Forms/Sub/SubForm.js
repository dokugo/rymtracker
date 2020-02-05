import React, { useState, createRef } from 'react';
import styled from 'styled-components/macro';
import Input from '../Input';
import Button from '../Button';
const DOMAIN = process.env.REACT_APP_PROD_DOMAIN || 'http://localhost:9000';
const API_KEY = process.env.REACT_APP_PROD_API_KEY || 'o6EWhXFY15ODhD2Q';

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

  const validateEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validateUsername = username => {
    const regex = /^[\w_]*$/;
    const noForbiddenSymbols = regex.test(username);
    const notTooLong = username.length < 25;
    return noForbiddenSymbols && notTooLong;
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

    fetch(`${DOMAIN}/users/subscribe`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0'
      }
    })
      .then(response => response.json())
      .then(response => {
        setFormState({
          ...formState,
          loading: false,
          message: response.message
        });

        console.log(response);
      })
      .catch(error => console.log('Error: ', error));
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
