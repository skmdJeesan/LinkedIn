import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { authDataContext } from "../context/AuthContext";

function VerifyEmail() {
  const { verifyToken } = useParams();
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`${serverUrl}/api/auth/verify-email/${verifyToken}`);
        navigate("/login");
      } catch (err) {
        alert("Invalid or expired verification token");
      }
    };
    if (verifyToken) verifyEmail();
  }, [verifyToken, navigate, serverUrl]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-1">
        <Loader2 size={20} className="animate-spin" />
        <h2>Verifying email...</h2>
      </div>
    </div>
  );
}

export default VerifyEmail;