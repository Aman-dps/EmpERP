import { useEffect, useState } from "react";
import { getDepartments, deleteDepartment } from "../../api/department.api";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function DepartmentList() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getDepartments();
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Departments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/departments/create"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Add Department
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Strength / Capacity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d: any) => (
              <TableRow key={d.department_id} hover>
                <TableCell>{d.department_id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{d.name}</TableCell>
                <TableCell>
                  {d.strength} / {d.capacity}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" href={`/departments/${d.department_id}`}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await deleteDepartment(d.department_id);
                          load();
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No departments found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
