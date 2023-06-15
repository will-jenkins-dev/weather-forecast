import { Radio as MuiRadio } from '@mui/material'
import { styled } from '@mui/system'

export const Radio = styled(MuiRadio)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-checked': {
        color: theme.palette.primary.contrastText,
    },
}))
