import React from 'react'
import { Divider } from '@mui/material';

export const Prequisits = () => {
  return (
      <div>
          <div style={{ background: "E5E5E5", padding: "35px" }}>
        <h3 style={{ color: "black", height: 60 }}>PREREQUISITE FOR SELLING</h3>
      </div>
      <div className='details'>
        {[{
          title: "ADDRESS",
          dis: "You need a business Address"
        },
        {
          title: "BANK DETAILS",
          dis: " You need your bank details for selling"
        },
        {
          title: "PAN DETAILS",
          dis: " You need to provide PAN details for selling"
        }].map((doc, index, { length }) =>
          <>
            <div style={{ textAlign: "center" }}>
              <h4>{doc.title}</h4>
              <p>{doc.dis}</p>
            </div>
            {(length - 1 !== index) && <Divider orientation='vertical' variant='middle' flexItem />}
          </>
        )}
      </div>
    </div>
  )
}
