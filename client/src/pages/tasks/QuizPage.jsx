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
import { useSearchParams } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ClearIcon from "@mui/icons-material/Clear";

function QuizPage() {
  const dispatch = useDispatch();
  const { quizLoading, quizs } = useSelector((state) => state.quizs);

  const [isModal, setIsModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [removeModalState, setRemoveModalState] = useState(false);

  const [filters, setFilters] = useSearchParams();
  const [dueDate, setDueDate] = useState(null);
  const [statuss, setStatuss] = useState("all");

  /* ===================== INITIAL LOAD ===================== */
  useEffect(() => {
    const status = filters.get("status") || "all";
    const date = filters.get("dueDate");

    setStatuss(status);
    setDueDate(date ? dayjs(date) : null);

    dispatch(
      getUserQuizsAction({
        status,
        dueDate: date || undefined,
      })
    );
  }, []);

  /* ===================== FILTER HANDLER ===================== */
  const handleFilter = (status, date) => {
    const params = {};

    if (status && status !== "all") params.status = status;
    if (date) params.dueDate = date.format("YYYY-MM-DD");

    setFilters(params);
    dispatch(getUserQuizsAction(params));
  };

  /* ===================== UPDATE ===================== */
  const handleUpdate = (id, data) => {
    dispatch(updateQuizAction(id, data))
      .then((msg) => {
        notify("success", msg);
        handleFilter(statuss, dueDate);
      })
      .catch((err) => {
        notify("error", err);
        handleFilter(statuss, dueDate);
      });
  };

  /* ===================== DELETE ===================== */
  const deleteCourse = (ids) => {
    dispatch(deleteQuizAction(ids._id, ids.courseId))
      .then((msg) => {
        notify("success", msg);
        handleFilter(statuss, dueDate);
      })
      .catch((err) => {
        notify("error", err);
        handleFilter(statuss, dueDate);
      });
  };

  /* ===================== CLEAR DATE ONLY ===================== */
  const clearDate = () => {
    setDueDate(null);
    setFilters(statuss !== "all" ? { status: statuss } : {});
    dispatch(getUserQuizsAction({ status: statuss }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "var(--bg-color)",
        padding: { xs: "10px", sm: "20px", md: "20px" },
        pt: "5px !important",
      }}
    >
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Quiz
      </Typography>

      {/* ===================== FILTERS ===================== */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "end",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Status */}
        <Box>
          <Typography sx={{ mb: 1, fontSize: 12, color: "#6b7280" }}>
            Status
          </Typography>
          <Select
            value={statuss}
            onChange={(e) => {
              setStatuss(e.target.value);
              handleFilter(e.target.value, dueDate);
            }}
            sx={{
              background: "var(--primary-color)",
              color: "#fff",
              height: 40,
              minWidth: 120,
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </Box>

        {/* Due Date */}
        <Box>
          <Typography sx={{ mb: 1, fontSize: 12, color: "#6b7280" }}>
            Due Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dueDate}
              onChange={(newValue) => {
                setDueDate(newValue);
                handleFilter(statuss, newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
        </Box>

        {/* Clear Date */}
        <Button
          startIcon={<ClearIcon />}
          onClick={clearDate}
          sx={{
            height: "35px",
            background: "var(--primary-color)",
            color: "#fff",
            textTransform: "capitalize",
            ":hover": { backgroundColor: "#1258ad" },
          }}
        >
          Clear Date
        </Button>
      </Box>

      {/* ===================== TABLE ===================== */}
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

      {/* ===================== MODALS ===================== */}
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

export default QuizPage;
