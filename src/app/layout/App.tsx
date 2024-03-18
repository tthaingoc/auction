import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { useAppDispatch } from "../store/configureStore";

function App() {
  const dispatch = useAppDispatch();

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
