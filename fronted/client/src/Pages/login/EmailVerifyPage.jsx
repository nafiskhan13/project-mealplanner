import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EmailVerifyPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const code = queryParams.get("code");

    const verify = async () => {
      try {
        // Log the backend URL being used
        const backendUrl = "https://mealplannerserverside.onrender.com";
        console.log("Backend URL:", backendUrl);
        
        if (!backendUrl) {
          throw new Error("Backend URL is not configured");
        }

        // Test backend connection
        

        const res = await axios.post(
          `${backendUrl}/api/v1/users/verify-email`,
          { email, code },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("Verification response:", res.data);
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Verification error details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });

        if (error.message.includes("Cannot connect to backend server")) {
          setError("Backend server is not accessible. Please ensure it's running on port 8000");
        } else if (error.code === 'ECONNABORTED') {
          setError("Request timed out. Please try again.");
        } else if (error.response?.status === 401) {
          setError("Verification link has expired. Please request a new verification email.");
        } else if (error.response?.status === 404) {
          setError("Verification endpoint not found. Please contact support.");
        } else if (!error.response) {
          setError("Network error. Please check your internet connection and ensure the backend is running on port 8000");
        } else {
          setError(error.response?.data?.message || "Verification failed. Please try again.");
        }
      }
    };

    if (email && code) {
      verify();
    } else {
      setError("Invalid verification link.");
    }
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold text-center">
        {error ? "❌ Error" : "✅ Success"}
      </h2>
      <p className="mt-2 text-center">{error || message}</p>
      {!error && <p className="text-sm mt-4">Redirecting to login...</p>}
    </div>
  );
};

export default EmailVerifyPage;
