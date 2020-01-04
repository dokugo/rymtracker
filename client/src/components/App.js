import React, { useState } from 'react';
// import List from './List/List';
import Form from './Form/Form';
import Subscribe from './Form/Subscribe';

import { hot } from 'react-hot-loader';

import styled, {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components/macro';
import theme from '../themes/theme';

import TestList from './Test/TestList';

import SubForm from './Forms/Sub/SubForm';
import CrawlForm from './Forms/Crawl/CrawlForm';
const App = () => {
  const [dataStorage, setDataStorage] = useState(null);
  // const [listAnimation, setListAnimation] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <FormsContainer>
          <SubForm />
          <CrawlForm setDataStorage={setDataStorage} />
        </FormsContainer>
    </ThemeProvider>
  );
};

export default hot(module)(App);

const AppBox = styled.div`
  height: 100%;
  padding: 0 12px;
`;

const FormsContainer = styled.section`
  @media (max-width: 660px) {
    margin-top: 0;
  }
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* remove transition? */
  transition: all 0.5s ease 0s;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 60px;
`;

const Container = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  top: 0%;
  /* opacity: ${({ isOpaque }) => (isOpaque ? 1 : 0)}; */
  opacity: 1;
  transition: opacity 0.5s ease 0.5s;
`;

const GlobalStyle = createGlobalStyle`
  html {
    height:100%;
  }
  body {
  height:100%;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.global.background};
  color: ${({ theme }) => theme.global.text};
  transition: background-color .2s ease-out;
  }
  body > div {
    height:100%;
  }
`;
