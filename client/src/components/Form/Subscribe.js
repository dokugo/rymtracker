import React, { useState, createRef } from 'react';
import styled from 'styled-components/macro';
import FormButton from './FormButton';
import SubInput from './SubInput';

const Subscribe = () => {
  const [inputData, setInputData] = useState(null);
  const [formState, setFormState] = useState({
    default: true,
    loading: false,
    error: false,
    message: null
  });

  const handleInputChange = event => {
    if (event.target.name === 'email') {
      setInputData({ ...inputData, email: event.target.value.trim() });
    }
    if (event.target.name === 'username') {
      setInputData({ ...inputData, username: event.target.value.trim() });
    }

    setFormState({
      ...formState,
      error: false,
      default: false,
      message: null
    });

    // console.log(inputData);
  };

  const inputRef = createRef();
  /*   const focusInput = () => {
    if (formState.default) {
      inputRef.current.focus();
    }
  }; */

  const handleRequest = event => {
    event.preventDefault();

    console.log(inputData);

    if (formState.loading) {
      return;
    }

    /*     if (!formState.default && !formState.warning) {
      console.log(formState);
      inputRef.current.blur();
    } */

    //try optional chaining
    if (
      !inputData ||
      (inputData && !inputData.email) ||
      (inputData && !inputData.username)
    ) {
      setFormState({
        ...formState,
        default: false,
        error: true
      });
      return;
    }

    setFormState({ ...formState, loading: true });
    // inputRef.current.blur();

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

      <InputField>
        <SubInput
          // handleInputChange={handleInputChange}
          /*           formState={formState}
          setFormState={setFormState} */
          handleInputChange={handleInputChange}
          inputState={formState}
          ref={inputRef}
          title="Email"
          name="email"
        />
        <SubInput
          // handleInputChange={handleInputChange}
          /*           formState={formState}
          setFormState={setFormState} */
          handleInputChange={handleInputChange}
          inputState={formState}
          ref={inputRef}
          title="Username"
          name="username"
        />
        <FormButton formState={formState} /* focusInput={focusInput} */ />
      </InputField>

      <Tooltip formState={formState}>
        {formState.error
          ? `Can't send incomplete request.`
          : formState.message
          ? formState.message
          : null}
      </Tooltip>
    </FormItem>
  );
};

export default Subscribe;

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
  padding: 0px 10px;
  margin-top: 5px;
  color: ${({ formState, theme }) =>
    formState.error ? theme.tooltip.error : theme.tooltip.default};
`;
