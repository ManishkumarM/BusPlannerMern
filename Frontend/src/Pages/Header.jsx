import { FaBus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { success } from "../Utils/notification";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logoutAPI } from "../Redux/auth-login/auth-action";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.data.token);
    const handlelogout = () => {
        Cookies.remove("jwttoken");
        Cookies.remove("userid");
        dispatch(logoutAPI());
        navigate("/");
        success("Logout Successfully");
    };
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" onClick={() => {
                    navigate("/");
                }} style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                }}>
                    <FaBus />
                    <h3>
                        <span style={{ color: "#5266FA" }}>Bus</span>Planner
                    </h3>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto my-2 my-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => {
                                navigate("/");
                            }} style={{ color: "#5266FA" }}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => {
                                navigate("/myticket");
                            }} style={{ color: "#5266FA" }}>Tickets</a>
                        </li>
                    </ul>
                    <div>
                        {token ? (
                            <button
                                className="btn btn-outline-primary"
                                style={{
                                    borderRadius: "10px",
                                    border: "2px solid",
                                    marginRight: "8px",
                                    color: "#5266FA",
                                }}
                                onClick={() => handlelogout()}
                            >
                                Logout
                            </button>
                        ) : (
                            <div>
                                {" "}
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate("/login")}
                                    style={{
                                        borderRadius: "10px",
                                        border: "2px solid",
                                        marginRight: "8px",
                                        // color: "#5266FA",
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    </>
}
export default Header;