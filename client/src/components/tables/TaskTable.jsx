import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TaskTable() {

  // 🔹 Array of tasks
  const tasks = [
    { task: "Draw ERD", course: "Database", type: "Assignment", due: "3-12-25", status: "Completed" },
    { task: "Normalization", course: "Database", type: "Quiz", due: "5-12-25", status: "Pending" },
    { task: "SQL Joins", course: "Database", type: "Assignment", due: "7-12-25", status: "Completed" },
  ];

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }}   size="small">
        <TableHead>
          <TableRow sx={{ height: "50px", backgroundColor: "var(--primary-color)" }}>
            <TableCell sx={{ color: '#fff', fontWeight: "bold" }}>Task</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: "bold" }}>Course</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: "bold" }}>Type</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: "bold" }}>Due Date</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: "bold" }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((item, index) => (
            <TableRow key={index} sx={{ ':hover':{backgroundColor:"#f5f5f5dd"},transition:"0.3s all ease-in-out ",height: "50px", "&:last-child td": { border: 0 } }}>
              <TableCell>{item.task}</TableCell>
              <TableCell>{item.course}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.due}</TableCell>
              <TableCell sx={{color: item.status ==="Completed"? "green": "red"}}>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
