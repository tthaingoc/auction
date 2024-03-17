import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

function App() {
 

  return (
    
    <>
      <CssBaseline />
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
   
  );
}

export default App
