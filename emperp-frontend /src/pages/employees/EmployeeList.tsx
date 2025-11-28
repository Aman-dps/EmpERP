import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../api/employee.api";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function EmployeeList() {
  const [data, setData] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const load = async () => {
    const res = await getEmployees();
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Employees
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/employees/create"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Emp ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Dept</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((e: any) => {
              const photoUrl = `http://localhost:8080/api/v1/employees/${e.employee_id}/photo`;
              return (
                <TableRow key={e.id} hover>
                  <TableCell>
                    <Avatar
                      src={photoUrl}
                      alt={e.first_name}
                      sx={{ width: 40, height: 40, cursor: "pointer" }}
                      onClick={() => setSelectedPhoto(photoUrl)}
                    >
                      {e.first_name?.[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Chip label={e.employee_id} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {e.first_name} {e.last_name}
                  </TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>
                    {e.department_name ? (
                      <Chip label={e.department_name} color="primary" size="small" variant="filled" />
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        N/A
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Upload Photo">
                      <IconButton color="info" href={`/employees/${e.id}/photo`}>
                        <PhotoCameraIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton color="primary" href={`/employees/${e.id}`}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={async () => {
                          if (confirm("Are you sure?")) {
                            try {
                              await deleteEmployee(e.id);
                              load();
                            } catch (err) {
                              alert("Failed to delete employee. Please try again.");
                              console.error(err);
                            }
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No employees found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} maxWidth="md">
        <DialogContent sx={{ p: 0 }}>
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Employee"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
