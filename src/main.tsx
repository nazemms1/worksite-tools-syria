import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  primaryColor: 'yellow',
  colors: {
    yellow: [
      '#FFF9E6',
      '#FFEDB3',
      '#FFE080',
      '#FFD44D',
      '#FFC71A',
      '#FFB800',
      '#E5A500',
      '#CC9200',
      '#B37F00',
      '#996C00',
    ],
  },
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);
