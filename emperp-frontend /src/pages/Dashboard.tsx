import { useEffect, useState } from "react";
import { getDepartments } from "../api/department.api";
import { getEmployees } from "../api/employee.api";
import { getSalaries } from "../api/salary.api";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    departments: 0,
    employees: 0,
    salaries: 0,
  });

  const [deptStats, setDeptStats] = useState<any[]>([]);
  const [recentEmployees, setRecentEmployees] = useState<any[]>([]);
  const [recentSalaries, setRecentSalaries] = useState<any[]>([]);

  const load = async () => {
    try {
      // departments
      const dep = await getDepartments();
      setSummary((s) => ({ ...s, departments: dep.data.length }));

      // employees
      const emp = await getEmployees();
      setSummary((s) => ({ ...s, employees: emp.data.length }));

      // salaries
      const sal = await getSalaries();
      setSummary((s) => ({ ...s, salaries: sal.data.length }));

      // dept stats
      const stats = dep.data.map((d: any) => ({
        name: d.name,
        strength: d.strength,
      }));
      setDeptStats(stats);

      // recent employees
      const sortedEmp = [...emp.data].reverse().slice(0, 5);
      setRecentEmployees(sortedEmp);

      // recent salaries
      const sortedSal = [...sal.data]
        .sort(
          (a: any, b: any) =>
            new Date(b.payment_date).getTime() -
            new Date(a.payment_date).getTime()
        )
        .slice(0, 5);

      setRecentSalaries(sortedSal);
    } catch (e) {
      console.error("Failed to load dashboard data", e);
    }
  };



  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Departments"
            value={summary.departments}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Employees"
            value={summary.employees}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard
            title="Salary Records"
            value={summary.salaries}
          />
        </Grid>
      </Grid>

      {/* Chart + Recent Employees */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Employees per Department Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Employees per Department
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="strength" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Employees */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Employees
            </Typography>

            <List>
              {recentEmployees.map((e) => (
                <ListItem key={e.id} divider>
                  <ListItemText
                    primary={`${e.first_name} ${e.last_name}`}
                    secondary={e.email}
                  />
                </ListItem>
              ))}

              {recentEmployees.length === 0 && (
                <Typography>No employees yet</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Salaries */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Salary Payments
            </Typography>

            <List>
              {recentSalaries.map((s) => (
                <ListItem key={s.id} divider>
                  <ListItemText
                    primary={`₹ ${s.amount}`}
                    secondary={`Employee ID: ${s.employee_id} — ${new Date(
                      s.payment_date
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}

              {recentSalaries.length === 0 && (
                <Typography>No salary records yet</Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
