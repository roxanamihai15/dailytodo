import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Homepage from './pages/Homepage';
import ErrorPage from './pages/ErrorPage';
import Authentication from './pages/Authentication';
import PrivateRoute from './PrivateRoute';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.6)'   //grigio scuro
        },
        secondary: {
            main: '#ffa500'  // orange
        },
        success: {
            main: '#00a884'  // verde whatsapp
        }
    },
    typography: {
        fontFamily: 'DM Sans',
    },
})

function App() {

  return (
      <>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Routes>
                    < Route path="/" element={<Authentication />} />
                    < Route path="*" element={<ErrorPage />} />

                    {/* private pages */}
                    {/* <Route element={<PrivateRoute />}>
                    < Route path="/home" element={<Homepage />} />
                    </Route> */}
                    <Route path="/home" element={<PrivateRoute />} />
                </Routes>
            </ ThemeProvider>
        </BrowserRouter>
      </>
  );
}

export default App;