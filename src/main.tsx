import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FirebaseProvider } from './components/FirebaseProvider';
import { ThemeProvider } from './components/ThemeContext';
import { HardwareProvider } from './components/HardwareContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <ThemeProvider>
        <HardwareProvider>
          <App />
        </HardwareProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </StrictMode>,
);
