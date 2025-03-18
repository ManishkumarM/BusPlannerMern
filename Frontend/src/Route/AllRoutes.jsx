import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Header from '../Pages/Header';
import Footer from "../Pages/Footer";
import SelectBus from "../Pages/Selectbus"
import { Private } from "./PrivateRoute";
import BookSeat from "../Pages/BookSeat";
import Details from "../Pages/Details";
import Myticket from "../Pages/Tickets";
function AllRoutes() {
  return <>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/selectbus" element={<SelectBus />} />
      <Route path="/bookticket/:id"
        element={<Private>
          <BookSeat></BookSeat>
        </Private>}
      ></Route>
      <Route
        path="/details/:id"
        element={
          <Private>
            <Details />
          </Private>
        }
      />
      <Route
        path="/myticket"
        element={
          <Private>
            <Myticket />
          </Private>
        }
      />
    </Routes>
    <Footer></Footer>
  </>
}
export default AllRoutes;