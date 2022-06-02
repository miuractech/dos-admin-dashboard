import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import React from 'react'

type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function RightInfo({ selectedId, setSelectedId }: Props) {
  return (
    <Accordion
      variant='outlined'
      expanded={Boolean(!selectedId)}
      onChange={() => setSelectedId(null)}
      style={{ marginTop: -3 }}

    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        style={{ backgroundColor: '#f2f2f2', height: 50 }}
      >
        <Typography sx={{ flexFlow: 1 }}>
          Buy
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{ height: 320, overflowY: 'scroll' }}
      >
        Price : <strong>600/-</strong>
      </AccordionDetails>
    </Accordion>
  )
}