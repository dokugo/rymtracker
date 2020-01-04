import React from 'react';
import styled from 'styled-components/macro';
import { Transition } from 'react-transition-group';

import { AnimationContext } from '../../contexts/animationContext';
import { useContextSelector } from 'use-context-selector';

import ListItems from './ListItems';

const duration = 750;

const List = ({ dataStorage }) => {
  const listAnimation = useContextSelector(
    AnimationContext,
    state => state.listAnimation
  );

  return (
    <Transition in={!listAnimation} timeout={duration}>
      {state => (
        <TransitionBox state={state}>
          <ListItems data={dataStorage} />
        </TransitionBox>
      )}
    </Transition>
  );
};

export default List;

const TransitionBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  transition: ${duration}ms;
  transform: ${({ state }) =>
    state === 'entering'
      ? 'translateY(50px)'
      : state === 'entered'
      ? 'translateY(50px)'
      : state === 'exiting'
      ? 'translateY(0)'
      : state === 'exited'
      ? 'translateY(0)'
      : null};
  opacity: ${({ state }) =>
    state === 'entering'
      ? 0
      : state === 'entered'
      ? 0
      : state === 'exiting'
      ? 1
      : state === 'exited'
      ? 1
      : null};
`;
