import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginpage.css"; // Impor file CSS kustom
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (username === "admin" && password === "admin") {
            navigate("/dashboard");
        } else {
            alert("Username atau password salah");
        }
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username </label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="username" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                    </div>

                    <button type="submit" className="btn btn-danger w-100">Login </button>
                </form>


            </div>
        </div>
    );
};

export default Login;
