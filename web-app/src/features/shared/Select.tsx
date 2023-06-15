import { Select as MuiSelect } from '@mui/material'
import { styled } from '@mui/system'

export const Select = styled(MuiSelect)(({ theme }) => {
    const color = theme.palette.primary.contrastText
    return {
        color: color,
        borderColor: color,
        select: {
            '&:before': {
                borderColor: color,
            },
            '&:after': {
                borderColor: color,
            },
        },
        icon: {
            fill: color,
        },
    }
})
