import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {

  return (
    <>
     <div className='app'>
      <CssBaseline/>
      <Header/>
        <Catalog/>
          <Container>        
        </Container>
      
     </div>
    </>
  )
}

export default App
