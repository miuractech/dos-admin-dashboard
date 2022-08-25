import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
  previews: boolean,
  setPreviews: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RightInfo({ selectedId, setSelectedId, previews, setPreviews }: Props) {
  return (
    <Accordion
      variant='outlined'
      expanded={true}
      // onChange={() => setSelectedId(null)}
      style={{ marginTop: -3 }}

    >

      <AccordionDetails
        style={{ height: 45, overflowY: 'auto' }}
      >
        Price : <strong>600/-</strong>
      </AccordionDetails>
      <Button variant='contained' color='secondary' fullWidth sx={{ flexFlow: 1 }} onClick={() => { setPreviews(true) }} >
        Finish
      </Button>
    </Accordion>
  )
}