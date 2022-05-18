import { IconButton, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { debounce } from 'lodash';

type filterProps = {
    setFilterText: React.Dispatch<React.SetStateAction<string>>
    filterText: string
}


export const SubHeaderComponent = ({ filterText, setFilterText, }: { filterText: string, setFilterText: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <FilterComponent setFilterText={setFilterText} filterText={filterText} />
    );

}


export const FilterComponent = ({ setFilterText, filterText }: filterProps) => {

    const changed = debounce((text) => {
        setFilterText(text)
    }, 1500)

    return (
        <TextField onChange={(event) => changed(event.target.value)} InputProps={{ endAdornment: filterText ? <IconButton onClick={() => setFilterText("")}><ClearIcon /></IconButton> : null, startAdornment: <SearchIcon /> }} id="standard-basic" label="Filter" variant="standard" />

    )
}
