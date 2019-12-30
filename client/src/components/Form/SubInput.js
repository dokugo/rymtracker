import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const SubInput = ({ handleInputChange, formState, title, name }) => {
  return (
    <Input
      onChange={handleInputChange}
      formState={formState}
      /* ref={inputRef} */
      type="text"
      title={title}
      name={name}
      placeholder={name}
      autoComplete="off"
    />
  );
};

export default SubInput;

const autofill = keyframes`
  to {
    color: ${({ theme }) => theme.input.text};
    background: ${({ theme }) => theme.input.background};
  }
`;

const Input = styled.input`
  @media (max-width: 660px) {
    &:nth-of-type(1) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
  &:nth-of-type(1) {
    margin-right: 15px;
  }
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 22px;
  font-weight: 400;
  width: 100%;
  height: 65px;
  padding: 0px 20px;
  padding-right: 70px;
  padding-bottom: 2.5px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.input.background};
  border-radius: 8px;
  color: ${({ theme }) => theme.input.text};
  transition: box-shadow 0.15s ease-in-out;
  border-width: 0px;
  outline: 0 none;
  &:focus {
    box-shadow: ${({ formState, theme }) =>
      formState.warning
        ? `0 0 0 3px ${theme.input.warning}`
        : formState.error
        ? `0 0 0 3px ${theme.input.error}`
        : `0 0 0 3px ${theme.input.default}`};
  }
  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    display: none;
  }
  :-webkit-autofill {
    animation-name: ${autofill};
    animation-fill-mode: both;
  }
  ::placeholder {
    color: ${({ theme }) => theme.input.text};
    opacity: 0.65;
  }
  /* &:hover {
    ::placeholder {
      transition: opacity 0.15s ease-in-out;
      opacity: 0.35;
    }
  } */
`;
