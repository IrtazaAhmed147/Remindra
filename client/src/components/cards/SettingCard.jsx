import { Box, Typography } from '@mui/material'
import React from 'react'

function SettingCard({ title, desc, action }) {
    return (
        <Box
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                bgcolor: "var(--card-bg-color)",
                boxShadow: `
  0 1px 2px rgba(0, 0, 0, 0.08),
  0 4px 12px rgba(0, 0, 0, 0.06)
`,

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box>
                <Typography fontWeight={600} fontSize={15} color="var(--text-color)">
                    {title}
                </Typography>
                <Typography fontSize={12} color="var(--text-muted-color)">
                    {desc}
                </Typography>
            </Box>

            {action}
        </Box>
    )
}

export default SettingCard