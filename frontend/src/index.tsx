import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// ---------------- React Router Dom -------------------
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ====== React Redux Store Provider: ===============
import { Provider } from "react-redux";
// ========== Redux Store where we store all our global states: ====
import { store } from "./store";
// ========== Global MUI theme (Refined Institutional) ====
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


/*
  Now every component that is inside the <App /> will have access to 
  the states of the store
*/