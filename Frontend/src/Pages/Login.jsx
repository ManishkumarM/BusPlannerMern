import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "../Utils/notification";
import { loginAPI } from "../Redux/auth-login/auth-action";
import styles from "../Styles/login.module.css";

function Login() {
    const initialData = {
        email: "",
        password: "",
    };
    const [signUpcreds, setsignUpcreds] = useState(initialData);
    const [showpassword, setshowpassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state) => state.auth.data.isAuthenticated
    );
    const location = useLocation();
    useEffect(() => {
        if (isAuthenticated) {
            if (location.state && location.state.from) {
                // console.log(location.state.from);
                navigate(location.state.from, { replace: true });
            } else {
                navigate("/");
            }
        }
    }, [isAuthenticated]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignUpcreds({
            ...signUpcreds,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signUpcreds.email === "" || signUpcreds.password === "") {
            return error("Please fill required fields");
        }
        dispatch(loginAPI(signUpcreds, navigate));
    }
    return <>
        <div className={styles.login}>
            <h1 className="h3 mb-3 fw-bold">Sign In</h1>
            <div>
                <p style={{ textAlign: "left", marginBottom: "0px" }}>Email</p>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    name="email"
                    onChange={handleChange}
                />
            </div>
            <p style={{ textAlign: "left", marginBottom: "0px" }}>Password</p>
            <div className="form-floating">
                <div className="input-group mb-3">
                    <input
                        type={showpassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter Your Password"
                        name="password"
                        onChange={handleChange}
                    />
                    <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setshowpassword(!showpassword)}
                    >
                        {showpassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                </div>
            </div>
            <p style={{ textAlign: "right", marginTop: "-10px" }}>
                <Link>Forgot Password</Link>
            </p>
            <button
                className="w-100  btn btn-lg btn-primary"
                onClick={handleSubmit}
            >
                Sign In
            </button>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <p>
                    Dont Have Account?{" "}
                    <Link
                        to={"/signup"}
                        style={{
                            paddingLeft: 10,
                            textDecoration: "none",
                        }}
                    >
                        SignUp
                    </Link>
                </p>
            </div>
        </div>
    </>
}
export default Login;