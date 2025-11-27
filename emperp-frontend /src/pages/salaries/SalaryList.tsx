import { useEffect, useState } from "react";
import { getSalaries, deleteSalary } from "../../api/salary.api";
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
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function SalaryList() {
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await getSalaries();
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch salaries", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Salaries
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/salaries/create"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Add Salary
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Emp ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((s: any) => (
              <TableRow key={s.id} hover>
                <TableCell>
                  <Chip label={s.employee_id} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "success.main" }}>
                  ${s.amount}
                </TableCell>
                <TableCell>{s.payment_date}</TableCell>
                <TableCell>{s.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" href={`/salaries/${s.id}`}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await deleteSalary(s.id);
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
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No salary records found.
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
