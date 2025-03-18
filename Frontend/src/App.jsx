import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AllRoutes from './Route/AllRoutes';
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <AllRoutes></AllRoutes>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
