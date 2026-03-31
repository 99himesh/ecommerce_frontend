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
       <ConfigProvider theme={{ token: { colorPrimary: "#ea2e0e" } }}>
    <App />
    </ConfigProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
