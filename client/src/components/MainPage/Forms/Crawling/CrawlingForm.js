import React, { useState, createRef } from 'react';
import styled from 'styled-components/macro';
import { useContextSelector } from 'use-context-selector';
import { AnimationContext } from '../../../../contexts/animationContext';
import Input from '../Input';
import Button from '../Button';
import request from '../../../../api/get';

const CrawlingForm = ({ setDataStorage }) => {
  const setListAnimation = useContextSelector(
    AnimationContext,
    state => state.setListAnimation
  );

  const [inputData, setInputData] = useState(null);
  const [formState, setFormState] = useState({
    default: true,
    loading: false,
    error: false,
    message: null
  });

  const inputRef = createRef();
  const focusInput = () => {
    inputRef.current.focus();
    /*     if (formState.default) {
      inputRef.current.focus();
    } */
  };

  const handleInputChange = event => {
    setInputData(event.target.value.trim());
    setFormState({
      ...formState,
      default: true,
      error: false
    });

    // console.log(inputData);
  };

  const validateUsername = username => {
    const regex = /^[\w_]*$/;
    const noForbiddenSymbols = regex.test(username);
    const notTooLong = username.length < 25;
    const notTooShort = username.length > 2;
    return noForbiddenSymbols && notTooLong && notTooShort;
  };

  const handleRequest = event => {
    event.preventDefault();

    console.log(inputData);

    if (formState.loading) {
      return;
    }

    if (!inputData) {
      setFormState({
        ...formState,
        default: false,
        error: true,
        message: `Can't send incomplete request.`
      });
      focusInput();
      return;
    }

    if (!validateUsername(inputData)) {
      setFormState({
        ...formState,
        default: false,
        error: true,
        message: 'Incorrect username format.'
      });
      focusInput();
      return;
    }

    setListAnimation(false);
    setFormState({ ...formState, loading: true, message: null });
    inputRef.current.blur();

    const response = await request(inputData);
    setFormState({
      ...formState,
      loading: false,
      message: response.error ? response.message : null
    });
    setDataStorage(response.error ? [] : response.message);
    setListAnimation(true);
  };

  return (
    <FormItem onSubmit={handleRequest}>
      <InputText>
        Load current upcoming releases list for a specified user
      </InputText>
      <InputGroup>
        <Input
          handleInputChange={handleInputChange}
          inputState={formState}
          ref={inputRef}
          title="Username"
          name="username"
        />
        <Button formState={formState} type={'search'} />
      </InputGroup>

      <Tooltip formState={formState}>
        {formState.message ? formState.message : null}
      </Tooltip>
    </FormItem>
  );
};

export default CrawlingForm;

const FormItem = styled.form`
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
  position: relative;
  width: 640px;
  min-width: 100%;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  font-size: 14px;
  padding: 5px 10px;
  color: ${({ formState, theme }) =>
    formState.error ? theme.tooltip.error : theme.tooltip.default};
`;
