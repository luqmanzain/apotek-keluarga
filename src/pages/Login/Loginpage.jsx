import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginpage.css"; // Impor file CSS kustom
import { useNavigate } from "react-router-dom";
import apiInstance from "../../API/API";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman

        try {
            // Request login ke API menggunakan apiInstance
            const response = await apiInstance.post("/auth/login", {
                username,
                password
            });

            // Ambil token dari response
            const token = response.data.data.token;

            // Simpan token ke localStorage
            localStorage.setItem("token", token);

            // Redirect ke dashboard setelah login sukses
            navigate("/dashboard");

        } catch (error) {
            console.error("Error saat login:", error);
            setError("Login gagal. Periksa username & password!");
        }
    
};
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
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
