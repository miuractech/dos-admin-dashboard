import { MoreVert, PersonOutlineOutlined } from '@mui/icons-material'
import { IconButton, Popover, Typography, Box } from '@mui/material'
import { logoutUser } from 'apps/reseller/src/redux-tool/auth'
import { RootState } from 'apps/reseller/src/redux-tool/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../homepage.css"

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function Header({ }: Props) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { User } = useSelector((state: RootState) => state.User)
  return (
    <div className='header'>
      <PersonOutlineOutlined fontSize='large' />
      <Typography variant='h6'>{User?.email}</Typography>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <Box sx={{ p: 2 }} onClick={() => dispatch(logoutUser())} style={{ cursor: "pointer" }}>Logout</Box>
      </Popover>
    </div>
  )
}