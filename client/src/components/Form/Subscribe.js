import React, { useState /* createRef */ } from 'react';
import styled from 'styled-components/macro';
import FormButton from './FormButton';
import SubInput from './SubInput';

const Subscribe = () => {
  const [inputData, setInputData] = useState({ email: null, username: null });
  const [formState, setFormState] = useState({
    default: true,
    loading: false,
    warning: false,
    error: false,
    message: null
  });

  const handleInputChange = e => {
    if (e.target.value.trim().length < 1) {
      //empty input

      if (e.target.name === 'email') {
        setInputData({ ...inputData, email: null });
      } else if (e.target.name === 'username') {
        setInputData({ ...inputData, username: null });
      }

      setFormState({
        ...formState,
        warning: true,
        error: false,
        default: false,
        message: null
      });
    } else {
      //not empty input

      if (e.target.name === 'email') {
        setInputData({ ...inputData, email: e.target.value.trim() });
      } else if (e.target.name === 'username') {
        setInputData({ ...inputData, username: e.target.value.trim() });
      }

      setFormState({
        ...formState,
        warning: false,
        error: false,
        default: false
      });

      console.log(inputData);
    }
  };

  /*   const inputRef = createRef();
  const focusInput = () => {
    if (formState.default) {
      inputRef.current.focus();
    }
  }; */

  const handleRequest = e => {
    e.preventDefault();

    /*     if (!formState.default && !formState.warning) {
      console.log(formState);
      inputRef.current.blur();
    } */

    if (formState.loading) {
      return;
    }

    if (inputData && inputData.email && inputData.username) {
      setFormState({ ...formState, loading: true });
      console.log(inputData);

      const DOMAIN =
        process.env.REACT_APP_PROD_API_ROUTE || 'http://localhost:9000';

      fetch(`${DOMAIN}/user/subscribe`, {
        method: 'PUT',
        body: JSON.stringify(inputData),
        headers: {
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
            default: false,
            message: response.message
          });
        })
        .catch(error => console.log('Error: ', error));
    } else {
      setFormState({
        ...formState,
        warning: false,
        error: true,
        message: null
      });
      return;
    }
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputText>
        Subscribe to a weekly mail of the upcoming releases list taken from a
        specified RYM account
      </InputText>

      <InputField>
        <SubInput
          handleInputChange={handleInputChange}
          formState={formState}
          title="Email"
          name="email"
        />
        <SubInput
          handleInputChange={handleInputChange}
          formState={formState}
          title="Username"
          name="username"
        />
        <FormButton formState={formState} /* focusInput={focusInput} */ />
      </InputField>

      <Tooltip formState={formState}>
        {formState.warning
          ? `Search request can't be empty.`
          : formState.error
          ? `Can't send empty request.`
          : formState.message
          ? formState.message
          : null}
      </Tooltip>
    </FormItem>
  );
};

export default Subscribe;

const FormItem = styled.form`
  padding-bottom: 20px;
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

const InputField = styled.div`
  display: flex;
  position: relative;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 10px;
  color: ${({ formState, theme }) =>
    formState.warning
      ? theme.tooltip.warning
      : formState.error
      ? theme.tooltip.error
      : theme.tooltip.default};
`;
