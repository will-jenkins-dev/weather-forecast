import { useEffect, useState } from 'react'
import {
    FormControl,
    MenuItem,
    SelectChangeEvent,
    Typography,
    Grid,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { DayCategory } from '../../@weather/types'
import { Select } from '../shared/Select'

export type BroadCategory = DayCategory.Nicest | 'worst'
export type WorstCategory = DayCategory.WorstRain | DayCategory.WorstTemp

const selectStyles = {
    border: '1px solid white',
    '& .MuiSvgIcon-root': {
        color: 'white',
    },
}

export const DayCategorySelector = ({
    onChangeDayCategory,
}: {
    onChangeDayCategory: (category: DayCategory) => void
}) => {
    const {
        palette: { primary },
    } = useTheme()

    const [broadCategory, setBroadCategory] = useState<BroadCategory>(
        DayCategory.Nicest
    )
    const [worstCategory, setWorstCategory] = useState<WorstCategory>(
        DayCategory.WorstRain
    )

    const onChangeBroadCategory = (event: SelectChangeEvent<unknown>) => {
        const { value: category } = event.target
        setBroadCategory(category as BroadCategory)
    }

    const onChangeWorst = (event: SelectChangeEvent<unknown>) => {
        const { value: category } = event.target
        setWorstCategory(category as WorstCategory)
    }

    useEffect(() => {
        if (broadCategory === DayCategory.Nicest) {
            onChangeDayCategory(DayCategory.Nicest)
        } else {
            onChangeDayCategory(worstCategory)
        }
    }, [broadCategory, worstCategory, onChangeDayCategory])

    return (
        <Grid
            container
            color={primary.contrastText}
            alignItems="center"
            wrap="nowrap"
        >
            <Typography>Show me the day with the</Typography>
            <Grid ml={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl>
                    <Select
                        value={broadCategory}
                        onChange={onChangeBroadCategory}
                        sx={selectStyles}
                    >
                        <MenuItem value={DayCategory.Nicest}>nicest</MenuItem>
                        <MenuItem value="worst">worst</MenuItem>
                    </Select>
                </FormControl>

                {broadCategory === DayCategory.Nicest ? (
                    <Typography sx={{ display: 'inline-block', ml: 2 }}>
                        weather
                    </Typography>
                ) : (
                    <FormControl>
                        <Select
                            value={worstCategory}
                            onChange={onChangeWorst}
                            sx={selectStyles}
                        >
                            <MenuItem value="worstRain">rain</MenuItem>
                            <MenuItem value="worstTemp">temperature</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </Grid>
        </Grid>
    )
}
