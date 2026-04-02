import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux'
import store from './store/store.js';
import { ConfigProvider } from 'antd';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
       <ConfigProvider theme={{ token: { colorPrimary: "#065F46" } }}>
    <App />
    </ConfigProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
