import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { useAppDispatch } from "../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import LoadingCom from "./LoadingCom";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);     
  const initApp = useCallback(async () =>  {
    try {
      await dispatch(fetchCurrentUser())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])
  
  useEffect(() => {
      initApp().then(() => setLoading(false))
  },[initApp])
  if (loading) return <LoadingCom message='Loading Application...' />

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

