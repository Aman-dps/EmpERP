import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Alert,
    CircularProgress,
} from "@mui/material";
import api from "../api/axios";

interface UserAccount {
    id: number;
    username: string;
    active: boolean;
}

export default function AdminApproval() {
    const [pendingUsers, setPendingUsers] = useState<UserAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/api/v1/admin/pending");
            setPendingUsers(response.data);
            setError("");
        } catch (err) {
            console.error("Failed to fetch pending users", err);
            setError("Failed to load pending users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (username: string) => {
        try {
            await api.post(`/api/v1/admin/approve?username=${username}`);
            setSuccess(`User ${username} approved successfully!`);
            fetchPendingUsers(); // Refresh list
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            console.error("Failed to approve user", err);
            setError("Failed to approve user.");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Pending Admin Approvals
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            {loading ? (
                <CircularProgress />
            ) : pendingUsers.length === 0 ? (
                <Alert severity="info">No pending approval requests.</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>
                                        <Typography color="warning.main" fontWeight="bold">
                                            Pending
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleApprove(user.username)}
                                        >
                                            Approve
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
