import { FormControlLabel as MuiFormControlLabel } from '@mui/material'
import { styled } from '@mui/system'

export const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
}))
