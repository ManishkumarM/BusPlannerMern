import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { error, success } from "../Utils/notification";
import styles from "../Styles/login.module.css";
import axios from "axios";
function SignUp() {
    const initialData = {
        name: "",
        email: "",
        password: "",
    };
    const [signUpcreds, setsignUpcreds] = useState(initialData);
    const [showpassword, setshowpassword] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setsignUpcreds({
            ...signUpcreds,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signUpcreds);
        if (
            signUpcreds.email === "" ||
            signUpcreds.password === "" ||
            signUpcreds.name === ""
        ) {
            error("Plaese Fill All The Details");
        } else {
            try {
                let response = await axios.post(
                    "http://localhost:2000/auth/signup",
                    signUpcreds
                );
                console.log(response);
                if (response.data.status === "Failed") {
                    error(response.data.message);
                } else {
                    navigate("/login");
                    success(response.data.message);
                }
            } catch (err) {
                console.log(err);
                error("User already exsist");
            }
        }
    }
    return <>
        <div className={styles.login}>
            <h1 className="h3 mb-3 fw-bold">Sign Up</h1>
            <div>
                <p style={{ textAlign: "left", marginBottom: "0px" }}>Name</p>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleChange}
                />
            </div>
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
            <button
                className="w-100 mt-3 btn btn-lg btn-primary"
                onClick={handleSubmit}
            >
                Sign up
            </button>
            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <p>
                    Already A User?{" "}
                    <Link
                        to={"/login"}
                        style={{
                            paddingLeft: 8,
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </>
}
export default SignUp;