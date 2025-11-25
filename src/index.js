import App from './App';
import AppProviders from './contexts';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/globals.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <AppProviders>
      <App />
    </AppProviders>
  </Router>
);
