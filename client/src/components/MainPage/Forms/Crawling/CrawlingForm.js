import React, { useState, createRef } from 'react';
import { validateUsername } from '../../../../utils/utils';
import { useContextSelector } from 'use-context-selector';
import { AnimationContext } from '../../../../contexts/animationContext';
import Input from '../Input';
import Button from '../Button';
import { FormItem, InputText, InputGroup, Tooltip } from '../ui/common';
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
  const focusInput = () => inputRef.current.focus();

  const handleInputChange = event => {
    setInputData(event.target.value.trim());
    setFormState({
      ...formState,
      default: true,
      error: false,
      message: null
    });
  };

  const handleRequest = async event => {
    event.preventDefault();

    if (formState.loading) return;

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
