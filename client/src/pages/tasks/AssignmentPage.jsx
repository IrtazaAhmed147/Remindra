import React, { useEffect, useState } from 'react'
import TaskTable from '../../components/tables/TaskTable'
import { Box, MenuItem, Select, Typography, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAssignmentAction, getSingleAssignmentAction, getUserAssignmentsAction, updateAssignmentAction } from '../../redux/actions/assignmentActions'
// import GradientBtn from "../../components/common/GradientBtn";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssignmentDetailModal from '../../components/modal/AssignmentDetailModal'
import RemoveModal from '../../components/modal/RemoveModal'
import { notify } from '../../utils/HelperFunctions'
import { useSearchParams } from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ClearIcon from "@mui/icons-material/Clear";
import GradientBtn from '../../components/common/GradientBtn'

function AssignmentPage() {

  const dispatch = useDispatch()
  const { assignmentLoading, assignments } = useSelector((state) => state.assignments)
  const [isModal, setIsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalState, setRemoveModalState] = useState(false);


  const [filters, setFilters] = useSearchParams();
  const [dueDate, setDueDate] = useState(null);

  const [statuss, setStatuss] = useState('');

  useEffect(() => {
    const status = filters.get("status") || "all";
    const date = filters.get("dueDate");
    setStatuss(status)
    setDueDate(date ? dayjs(date) : null);

    dispatch(getUserAssignmentsAction({ status: status, dueDate: date || undefined }))
  }, [])


  const handleUpdate = (id, data) => {
    dispatch(updateAssignmentAction(id, data))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction({ status: statuss, dueDate }));
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction({ status: statuss, dueDate }));
      });


  }
  const deleteCourse = (ids) => {
    dispatch(deleteAssignmentAction(ids._id, ids.courseId))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction({ statuss, dueDate }));
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction({ statuss, dueDate }));
      });


  }

  const handleFilter = (status, date) => {
    const param = {};
    if (status) param.status = status || "all";
    if (date) param.dueDate = date.format("YYYY-MM-DD"); // format string

    setFilters(param);
    // setDueDate(dueDate);

    dispatch(getUserAssignmentsAction(param))

  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-color)',
        padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="var(--text-color)"
        sx={{ mb: 3 }}
      >
        Assignments
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", gap: 2, mb: 3 }}>
        <GradientBtn text={"Add Assigment"} icon={<AssignmentOutlinedIcon sx={{ fontSize: 18, color: "#4158D0" }} />} url={"/create/assignment"} />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: "end",
            width: { md: "60%" },
            gap: 2,
          }}
        >
          {/* Task Type */}


          {/* Status */}
          <Box>

            <Typography sx={{ mt: 1, mb: 1, fontSize: "12px", color: "#6b7280" }}>
              Status
            </Typography>
            <Select
              sx={{
                background: "var(--primary-color)",
                color: "#fff",
                height: { xs: 30, sm: 30, md: 40 },
                fontSize: { xs: 12, sm: 15, md: 15 },
                minWidth: { xs: 100, sm: 110, md: 120 },
              }}
              value={statuss}
              onChange={(e) => {
                setStatuss(e.target.value)
                handleFilter(e.target.value, dueDate)
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>

          </Box>

          {/* Due Date */}
          <Box sx={{ width: { xs: "50%" } }}>

            <Typography sx={{ mt: 1, mb: 1, fontSize: "12px", color: "#6b7280" }}>
              Due Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // label="Due Date"
                value={dueDate}
                onChange={(newValue) => {
                  setDueDate(newValue); // update local state
                  handleFilter(statuss, newValue)
                  // form.current.dueDate = newValue ? newValue.format("YYYY-MM-DD") : "";
                  // store as string in your form data
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: {

                      "& .MuiSvgIcon-root": {
                        color: "var(--text-color)",
                      },
                      "& .MuiPickersInputBase-root": {
                        border: "1px solid var(--text-color)",
                        color: "var(--text-color)",
                        fontSize: { xs: 12, sm: 15, md: 15 },
                      },

                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          <Button
            startIcon={<ClearIcon
              sx={{ fontSize: { xs: 12, sm: 15, md: 15 } }} />}
            onClick={() => {
              setDueDate(null)
              setFilters({ status: statuss })
              dispatch(getUserAssignmentsAction({ status: statuss }))


            }}
            sx={{
              height: { xs: 30, sm: 30, md: 35 },
              background: "var(--primary-color)",
              color: "#fff",

              fontSize: { xs: 12, sm: 15, md: 15 },
              textTransform: "capitalize",
              ":hover": { backgroundColor: "#1258ad" },
            }}

          >
            Clear Date
          </Button>



        </Box>


      </Box>

      {/* Task Table */}

      <TaskTable assignments={assignments}
        assignmentLoading={assignmentLoading}
        handleUpdate={handleUpdate}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        askDelete={(ids) => {
          setSelectedCourseId(ids);
          setRemoveModalState(true);
        }} viewModal={(item) => {
          setSelectedAssignment(item);
          setIsModal(true);
        }}
      />

      {isModal && <AssignmentDetailModal open={isModal}
        handleClose={() => setIsModal(false)} assignment={selectedAssignment} />}

      {removeModalState && <RemoveModal
        open={removeModalState}
        onClose={() => setRemoveModalState(false)}
        onConfirm={() => {
          deleteCourse(selectedCourseId);
          setRemoveModalState(false);
        }}
        title='Delete Assignment Confirmation'
        description='By deleting this course, all associated materials including assignments, quizzes, and other related content will also be permanently removed. This action cannot be undone'
      />}


    </Box>
  )
}

export default AssignmentPage
