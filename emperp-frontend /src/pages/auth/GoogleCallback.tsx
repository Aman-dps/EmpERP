import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function GoogleCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (token) {
            // Decode token to check email/role
            try {
                // Decode token to check email/role (Handle Base64Url)
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const payload = JSON.parse(jsonPayload);
                const email = payload.sub || payload.email;

                if (email) {
                    setToken(token);
                    navigate("/employees");
                } else {
                    navigate("/unauthorized");
                }
            } catch (e) {
                console.error("Failed to decode token", e);
                navigate("/login");
            }
        } else if (error) {
            console.error("OAuth error:", error);
            navigate("/unauthorized");
        } else {
            navigate("/login");
        }
    }, [searchParams, setToken, navigate]);

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Processing login...</Typography>
        </Box>
    );
}
