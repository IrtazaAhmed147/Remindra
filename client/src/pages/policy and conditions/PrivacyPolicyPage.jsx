import React from 'react'
import LandingNavbar from '../../components/navbar/LandingNavbar'
import LandingPageFooter from '../../components/footer/LandingPageFooter'
import { Box, Typography, Container } from '@mui/material'

function PrivacyPolicyPage() {
    return (
        <>
            <Box sx={{ minHeight: "100vh", width: "100%", backgroundColor: "var(--bg-color)" }}>
                <LandingNavbar authBtn={false}/>

                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Typography
                        mb={3}
                        lineHeight={1.2}
                        fontWeight="bold"
                        sx={{ 
                            textAlign: "center",
                            fontSize: { xs: "26px", sm: "34px", md: "42px" } 
                        }}
                    >
                        Privacy Policy
                    </Typography>

                    {/* Section 1 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        1. Introduction
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        Welcome to our Platform. Your privacy is important to us, and 
                        this Privacy Policy explains how we collect, use, and protect your information 
                        when you use our website and services.
                    </Typography>

                    {/* Section 2 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        2. Information We Collect
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        We may collect personal and non-personal information, such as:
                        <br />• Name and email address  
                        <br />• Login details  
                        <br />• Study-related data (courses, assignments, notes, etc.)  
                        <br />• Device and browser information  
                    </Typography>

                    {/* Section 3 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        3. How We Use Your Information
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        The information we collect helps us:
                        <br />• Provide and improve platform features  
                        <br />• Personalize your study experience  
                        <br />• Maintain platform security  
                        <br />• Respond to your queries or support requests  
                    </Typography>

                    {/* Section 4 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        4. Data Protection & Security
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        We use secure methods to store and protect your information. However, no 
                        online system can be guaranteed to be 100% secure, but we strive to follow 
                        industry-standard security practices.
                    </Typography>

                    {/* Section 5 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        5. Third-Party Sharing
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        We do not sell, rent, or share your personal data with third parties except:
                        <br />• If required by law  
                        <br />  
                    </Typography>

                    {/* Section 6 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        6. Cookies & Tracking
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        Our platform may use cookies to enhance your experience, store preferences, 
                        and improve performance. You may disable cookies in your browser settings.
                    </Typography>

                    {/* Section 7 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        7. Your Rights
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        You have the right to access, update, or request deletion of your personal 
                        information. You can contact us at any time for assistance.
                    </Typography>

                    {/* Section 8 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        8. Changes to This Policy
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        We may update this Privacy Policy from time to time. Any changes will be 
                        posted on this page with an updated revision date.
                    </Typography>

                    {/* Section 9 */}
                    <Typography sx={{fontSize:{xs:"20px",sm:"23px",md:"25px"}}} fontWeight="bold" mb={1}>
                        9. Contact Us
                    </Typography>
                    <Typography mb={3} sx={{fontSize:{xs:"14px",sm:"16px",md:"16px"}}} lineHeight={1.7}>
                        If you have any questions about this Privacy Policy, you can reach us at:
                        <br /><br />
                        <strong>Email:</strong> support@studymanagement.com
                    </Typography>
                </Container>

                <LandingPageFooter />
            </Box>
        </>
    )
}

export default PrivacyPolicyPage
