import { Button, TextField } from '@mui/material'
import React from 'react'

type filterProps = {
    handleClear: () => void
    setFilterText: React.Dispatch<React.SetStateAction<string>>
    filterText: string
}


export const FilterComponent = ({ handleClear, setFilterText, filterText }: filterProps) => {

    const changed = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value)
    }

    return (
        <>
            <TextField id="standard-basic" label="Filter" variant="standard" onChange={changed} value={filterText} />
            <Button variant='contained' onClick={handleClear} >clear</Button>
        </>

    )
}
