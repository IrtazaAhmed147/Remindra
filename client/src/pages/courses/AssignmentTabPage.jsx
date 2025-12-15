import React, { useEffect, useState } from 'react'
import TaskTable from '../../components/tables/TaskTable'
import { Box, MenuItem, Select, Typography, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAssignmentAction, getSingleAssignmentAction, getUserAssignmentsAction, updateAssignmentAction } from '../../redux/actions/assignmentActions'
import AssignmentDetailModal from '../../components/modal/AssignmentDetailModal'
import RemoveModal from '../../components/modal/RemoveModal'
import { notify } from '../../utils/HelperFunctions'
import { useParams, useSearchParams } from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function AssignmentTabPage() {

  const dispatch = useDispatch()
  const { assignmentLoading, assignments } = useSelector((state) => state.assignments)
  const [isModal, setIsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalState, setRemoveModalState] = useState(false);


 const {courseId}  = useParams()

  useEffect(() => {

    dispatch(getUserAssignmentsAction({courseId })).then((data) => console.log(data));
  }, [])


  const handleUpdate = (id, data) => {
    dispatch(updateAssignmentAction(id, data))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction({courseId }));
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction({courseId }));
      });


  }
  const deleteCourse = (ids) => {
    dispatch(deleteAssignmentAction(ids._id, ids.courseId))
      .then((msg) => {
        notify('success', msg);
        dispatch(getUserAssignmentsAction({courseId }));
      })
      .catch((err) => {

        notify('error', err)

        dispatch(getUserAssignmentsAction({courseId }));
      });


  }

  return (
    <Box
      sx={{
        // minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-color)',
        // padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "5px !important",
      }}
    >
      {/* Page Title */}
      {/* <Typography
        variant="h4"
        fontWeight="bold"
        color="var(--text-color)"
        sx={{ mb: 3 }}
      >
        Assignments
      </Typography> */}

      {/* Filters */}
   

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

export default AssignmentTabPage
