import React, { useState } from 'react';
import styled from 'styled-components/macro';
const DOMAIN = process.env.REACT_APP_PROD_DOMAIN || 'http://localhost:9000';
const API_KEY = process.env.REACT_APP_PROD_API_KEY || 'o6EWhXFY15ODhD2Q';

const ConfirmationForm = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    message: null,
    error: null
  });

  const action = window.location.pathname;
  console.log(action);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get('id');
  const email = urlParams.get('email');
  const username = urlParams.get('username');

  console.log({ id, email, username });

  const fetchMethod = action === '/unsubscribe' ? 'DELETE' : 'PATCH';

  const confirm = () => {
    if (
      !urlParams.has('id') ||
      !urlParams.has('email') ||
      !urlParams.has('username')
    ) {
      console.log('Missing data.');
      setFormState({ isLoading: false, message: 'Missing data.', error: null });
      return;
    }

    setFormState({ isLoading: true, message: null, error: null });

    fetch(
      `${DOMAIN}/users${action}?id=${id}&email=${email}&username=${username}`,
      {
        method: fetchMethod,
        headers: {
          'X-API-Key': API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        setFormState({
          isLoading: false,
          message: response.message,
          error: response.error
        });
        console.log(response);
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  return (
    <Section>
      <FormGroup>
        <Title>Please confirm your action</Title>
        <Button onClick={confirm}>
          {formState.isLoading ? 'Wait...' : 'Confirm'}
        </Button>
        <Tooltip formState={formState}>
          {formState.message ? formState.message : null}
        </Tooltip>
      </FormGroup>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100vh; */
`;

const FormGroup = styled.div`
  width: 296px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(50% - 64px);
  height: 128px;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: 400;
  margin: 0 auto 20px;
`;

const Button = styled.button`
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.global.text};
  width: 100%;
  height: 65px;
  min-height: 65px;
  padding: 0px 20px;
  padding-bottom: 2.5px;
  box-sizing: border-box;
  background-color: transparent;
  border: 2px solid;
  border-color: ${({ theme }) => theme.input.default};
  border-radius: 8px;
  transition: 0.15s ease-in-out;
  outline: 0 none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.button.hover};
    border-color: transparent;
  }
  &:focus {
    background-color: ${({ theme }) => theme.button.focus};
  }
  &:active {
    background-color: ${({ theme }) => theme.button.active};
    border-color: transparent;
  }
`;

const Tooltip = styled.span`
  font-size: 14px;
  margin-top: 10px;
  color: ${({ formState, theme }) =>
    formState.error ? theme.tooltip.error : theme.tooltip.default};
`;

export default ConfirmationForm;
