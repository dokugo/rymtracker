import React, { useState } from 'react';
// import List from './List/List';
import Form from './Form/Form';
import Subscribe from './Form/Subscribe';
import { hot } from 'react-hot-loader';
import styled, {
  createGlobalStyle,
  ThemeProvider
} from 'styled-components/macro';
import themeLight from '../themes/themeLight';
import themeDark from '../themes/themeDark';
import ThemeButton from './ThemeButton';
import TestList from './Test/TestList';

const App = () => {
  const themeIsStored = localStorage.getItem('isDarkMode');
  const [isDarkMode, setIsDarkMode] = useState(
    themeIsStored === 'true' ? true : false
  );
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode);
  };

  const [dataStorage, setDataStorage] = useState(null);
  // const [listAnimation, setListAnimation] = useState(null);

  return (
    <ThemeProvider theme={isDarkMode ? themeDark : themeLight}>
      <GlobalStyle />
      <AppBox>
        <Navbar>
          <Subscribe />
          <Form setDataStorage={setDataStorage} />
        </Navbar>
        <Container isOpaque={dataStorage ? true : false}>
          <TestList dataStorage={dataStorage} />
          {/* <List dataStorage={dataStorage} listAnimation={listAnimation} /> */}
        </Container>
        <ThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </AppBox>
    </ThemeProvider>
  );
};
export default hot(module)(App);

const AppBox = styled.div`
  height: 100%;
  padding: 0 12px;
`;

const Navbar = styled.nav`
  margin: auto;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* height: 125px; */
  transition: all 0.5s ease 0s;
  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  margin-top: 30px;
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
