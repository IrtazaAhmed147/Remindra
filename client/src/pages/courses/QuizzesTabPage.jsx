import React, { useEffect, useState } from "react";
import TaskTable from "../../components/tables/TaskTable";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuizAction,
  getUserQuizsAction,
  updateQuizAction,
} from "../../redux/actions/quizActions";
import AssignmentDetailModal from "../../components/modal/AssignmentDetailModal";
import RemoveModal from "../../components/modal/RemoveModal";
import { notify } from "../../utils/HelperFunctions";
import { useParams, useSearchParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";

function QuizzesTabPage() {


  const dispatch = useDispatch();
  const { quizLoading, quizs } = useSelector((state) => state.quizs);
  const {user} = useSelector((state) => state.auth);
  const {courseId}  = useParams()
  const [isModal, setIsModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalState, setRemoveModalState] = useState(false);

  useEffect(() => {


    
    dispatch(
      getUserQuizsAction({courseId:courseId})
    );
  }, []);


  const handleUpdate = (id, data) => {
    dispatch(updateQuizAction(id, data))
      .then((msg) => {
        notify("success", msg);
      })
      .catch((err) => {
        notify("error", err);
      });
  };

  const deleteCourse = (ids) => {
    dispatch(deleteQuizAction(ids._id, ids.courseId))
      .then((msg) => {
        notify("success", msg);
      })
      .catch((err) => {
        notify("error", err);
      });
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--bg-color)",
      }}
    >

      <TaskTable
        assignments={quizs}
        type="quiz"
        quizLoading={quizLoading}
        handleUpdate={handleUpdate}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        askDelete={(ids) => {
          setSelectedCourseId(ids);
          setRemoveModalState(true);
        }}
        viewModal={(item) => {
          setSelectedQuiz(item);
          setIsModal(true);
        }}
      />

      {isModal && (
        <AssignmentDetailModal
          open={isModal}
          handleClose={() => setIsModal(false)}
          assignment={selectedQuiz}
        />
      )}

      {removeModalState && (
        <RemoveModal
          open={removeModalState}
          onClose={() => setRemoveModalState(false)}
          onConfirm={() => {
            deleteCourse(selectedCourseId);
            setRemoveModalState(false);
          }}
          title="Delete Quiz Confirmation"
          description="This quiz will be permanently deleted. This action cannot be undone."
        />
      )}
    </Box>
  );
}

export default QuizzesTabPage;
