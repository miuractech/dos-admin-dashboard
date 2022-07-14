import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function SimpleAccordion({ children, heading }: { children: React.ReactNode, heading: null | string }) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Accordion onChange={() => setOpen(prev => !prev)} >
                <AccordionSummary expandIcon={open ? <RemoveIcon /> : <AddIcon />}>
                    <Typography fontWeight={500}>{heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>{children}</div>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}
