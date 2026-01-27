import React from 'react'
import LandingNavbar from '../../components/navbar/LandingNavbar'
import { Box, Typography, Container } from '@mui/material'
import LandingPageFooter from '../../components/footer/LandingPageFooter'

function TermsConditionPage() {
  return (
    <>
      <Box sx={{ minHeight: "100vh", width: "100%", backgroundColor: "var(--bg-color)" }}>
        <LandingNavbar authBtn={false}/>

        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography
            mb={3}
            lineHeight={1.2}
            fontWeight={'bold'}
            sx={{
              textAlign: "center",
              fontSize: { xs: "26px", sm: "34px", md: "42px" }
            }}
          >
            Terms & Conditions
          </Typography>

          {/* 1. Intro */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            1. Introduction
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            Welcome to <strong>Remindra</strong>, a student collaboration and course management
            platform ("the Platform"). By creating an account or using our services, you agree to
            follow these Terms and Conditions. If you do not agree with any part of these Terms,
            please discontinue using the Platform.
          </Typography>

          {/* 2. Purpose */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            2. Purpose
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            <strong>Remindra</strong> provides a digital space for students to organize, share,
            and manage their academic coursework, including quizzes, assignments, resources,
            projects, and discussions.
          </Typography>

          {/* 3. User Eligibility */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            3. User Eligibility
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            • You must be at least 13 years old to use this Platform.
            <br />• You must use the Platform solely for educational or academic collaboration.
            <br />• You must provide accurate and truthful information during registration.
          </Typography>

          {/* 4. Account Responsibilities */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            4. Account Responsibilities
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            • You are responsible for all activities that occur under your account.
            <br />• Do not share your login credentials with anyone.
            <br />• Notify us immediately if you suspect unauthorized access.
            <br />• The admin reserves the right to suspend or terminate accounts that violate
            these Terms.
          </Typography>

          {/* 5. Content Ownership */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            5. Content Ownership & Usage
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            • You retain ownership of the files, notes, and materials you upload.
            <br />• By uploading content, you grant <strong>Remindra</strong> a non-exclusive,
            royalty-free license to store and display your materials within the Platform.
            <br />• You may not upload copyrighted material without the required permissions.
            <br />• You are solely responsible for the accuracy and legality of your uploaded content.
          </Typography>

          {/* 6. Prohibited Activities */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            6. Prohibited Activities
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            You agree not to:
            <br />• Upload offensive, abusive, harmful, or explicit content.
            <br />• Share false, plagiarized, or misleading information.
            <br />• Attempt to hack, reverse-engineer, damage, or disrupt the Platform.
            <br />• Impersonate any person or misrepresent your identity.
            <br />• Use the Platform for commercial, promotional, or advertising purposes.
          </Typography>

          {/* 7. Moderation */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            7. Moderation & Suspension
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            • The admin may suspend or remove any account or course that violates these policies.
            <br />• Users with suspended accounts may request a review through support.
            <br />• Repeated violations may result in a permanent ban.
          </Typography>

          {/* 8. Liability */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            8. Limitation of Liability
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            <strong>Remindra</strong> is not responsible for:
            <br />• Data loss, technical issues, or service interruptions.
            <br />• Damage caused by unauthorized access to your account.
            <br />• Academic consequences resulting from incorrect information shared by users.
          </Typography>

        

          {/* 10. Contact */}
          <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
            9. Contact Us
          </Typography>
          <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
            If you have any questions regarding these Terms, contact us at:
            <br /><br />
            <strong>Email: </strong>
                <a style={{color:"#000"}} href="mailto:support@gmail.com">support@gmail.com</a>
             
          </Typography>
        </Container>

        <LandingPageFooter />
      </Box>
    </>
  )
}

export default TermsConditionPage
