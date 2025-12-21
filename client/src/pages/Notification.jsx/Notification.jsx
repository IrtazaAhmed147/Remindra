import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import NotificationCard from '../../components/cards/notificationCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInvitesAction, updateInviteAction } from '../../redux/actions/inviteActions'
import FullPageLoader from '../../components/loader/FullPageLoader'
import { notify } from '../../utils/HelperFunctions'

function Notification() {

  const dispatch = useDispatch();
  const { invitations, invitationLoading,invitationFetchLoading, error } = useSelector((state) => state.invite)
  useEffect(() => {
    dispatch(getUserInvitesAction()).then((data) => console.log(data))
  }, [])

  const responseHandle = (id, data) => {
    console.log(id, data);
    dispatch(updateInviteAction(id, { status: data })).then((msg) => notify('success', msg))
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "0px !important", }}>

      <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
        Notifications
      </Typography>
      {invitationFetchLoading && !error && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", width: "100%" }} >
        <CircularProgress color="inherit" size="30px" />
      </Box>}
      {!invitationFetchLoading && invitations?.map((invite) => (
        <NotificationCard key={invite._id} responseHandle={responseHandle} {...invite} msg={' has invited you to access the course '} />
      ))}
      {invitationLoading && <FullPageLoader />}
    </Box>
  )
}

export default Notification