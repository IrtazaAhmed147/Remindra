import { Box, CircularProgress, Typography } from '@mui/material'
import InvitationCard from '../../components/cards/InvitationCard.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInvitesAction, updateInviteAction } from '../../redux/actions/inviteActions.js'
import FullPageLoader from '../../components/loader/FullPageLoader.jsx'
import { notify } from '../../utils/HelperFunctions.js'
import { getUserNotificationssAction } from '../../redux/actions/notificationActions.js'
import NotificationCard from '../../components/cards/NotificationCard.jsx'
import CustomizeLoader from '../../components/loader/CustomizeLoader.jsx'

function Notification() {

  const dispatch = useDispatch();
  
  const { invitations, invitationLoading, invitationFetchLoading, invitationError } = useSelector((state) => state.invite)
  const { notifications, notificationFetchLoading,notificationError } = useSelector((state) => state.notification)
  useEffect(() => {
    dispatch(getUserInvitesAction()).catch((msg) => notify("error", msg))
    dispatch(getUserNotificationssAction()).catch((msg) => notify("error", msg))
  }, [])

  const responseHandle = (id, data) => {
    dispatch(updateInviteAction(id, { status: data })).then((msg) => {

      dispatch(getUserInvitesAction()).catch((msg) => notify("error", msg))
      notify('success', msg)
    }).catch((msg) => notify("error", msg))
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--bg-color)", padding: { xs: "10px", sm: "20px", md: "20px" }, pt: "0px !important", }}>

      <Typography variant="h4" fontWeight="bold" color="var(--text-color)" sx={{ mb: 2 }}>
        Notifications
      </Typography>
      {invitationError && <Box>{invitationError}</Box>}
      {invitationLoading && <FullPageLoader />}
      {invitationFetchLoading && !invitationError && <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", width: "100%" }} >
        <CustomizeLoader  />
      </Box>}
      {!invitationFetchLoading && invitations?.map((invite) => (
        <InvitationCard key={invite?._id} responseHandle={responseHandle} {...invite} msg={' has invited you to access the course '} />
      ))}
      {!notificationFetchLoading && notifications?.map((notification) => (
        <NotificationCard key={notification?._id} {...notification} />
      ))}
    </Box>
  )
}

export default Notification