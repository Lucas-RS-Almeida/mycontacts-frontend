import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Container } from './styles';

import AuthProvider from '../../contexts/AuthContext';

import CustomRoutes from '../../routes';

import GlobalStyle from '../../assets/styles/global';

import defaultTheme from '../../assets/styles/themes/default';

import Header from '../Header';

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <AuthProvider>
            <Header />
            <CustomRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Container>
  );
}
