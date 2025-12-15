import { toast } from "react-toastify";

export const notify = (theme, msg) => {
    return toast[theme](msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });
}

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};



export const handleAssignmentUpdate = (dispatch, getUserAssignmentsAction, updateAssignmentAction, id, data,courseId) => {
    dispatch(updateAssignmentAction(id, data))
        .then((msg) => {
            notify('success', msg);
            dispatch(getUserAssignmentsAction(courseId));
        })
        .catch((err) => {

            notify('error', err)

            dispatch(getUserAssignmentsAction());
        });


}
export const handleAssignmentDelete = (dispatch, getUserAssignmentsAction, deleteAssignmentAction, data) => {
    console.log(data);
    
    dispatch(deleteAssignmentAction(data._id, data.courseId))
        .then((msg) => {
            notify('success', msg);
            dispatch(getUserAssignmentsAction(data.courseId));
        })
        .catch((err) => {

            notify('error', err)

            dispatch(getUserAssignmentsAction());
        });


}
