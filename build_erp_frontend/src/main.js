import { jsx as _jsx } from "react/jsx-runtime";
import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(PersistGate, { loading: null, persistor: persistor, children: _jsx(GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, children: _jsx(App, {}) }) }) }) }));
