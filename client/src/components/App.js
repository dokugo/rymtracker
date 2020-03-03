import { hot } from 'react-hot-loader';
import React, { useState } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import styled, {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components/macro';
import theme from '../themes/theme';

import SubForm from './MainPage/Forms/Sub/SubForm';
import CrawlingForm from './MainPage/Forms/Crawling/CrawlingForm';
import List from './MainPage/List/List';
import ConfirmationForm from './ConfirmationPage/ConfirmationForm';

const App = () => {
  const [dataStorage, setDataStorage] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Main>
          <Switch>
            <Route exact path="/">
              <FormsContainer>
                <H1>RYM Tracker</H1>
                <SubForm />
                <CrawlingForm setDataStorage={setDataStorage} />
              </FormsContainer>
              <DataContainer /* isOpaque={dataStorage ? true : false} */>
                <List dataStorage={dataStorage} />
              </DataContainer>
            </Route>
            <Route path={['/verification', '/update', '/unsubscribe']}>
              <ConfirmationForm />
            </Route>
          </Switch>
        </Main>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;

const Main = styled.main`
  /* height: 100%; */
  padding: 0 12px;
`;

const H1 = styled.h1`
  margin-bottom: 12px;
`;

const FormsContainer = styled.section`
  @media (max-width: 660px) {
    padding-top: 0;
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* remove transition? */
  transition: all 0.5s ease 0s;
  flex-direction: column;
  margin-bottom: 30px;
  padding-top: 60px;
`;

const DataContainer = styled.section`
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
  /* remove transition? */
  transition: background-color .2s ease-out;
  }
  /* remove the next rule? */
  body > div {
    height:100%;
  }
`;
