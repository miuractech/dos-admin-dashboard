import React from 'react'
import { Divider } from '@mui/material';

export const Prequisits = () => {
  return (
    <div className='preColor'>
      <div>
        <h3 style={{ color: "black", padding: "3% 0" }}>PREREQUISITE FOR SELLING</h3>
      </div>
      <div className='details'>
        {[{
          title: "ADDRESS",
          dis: "You need a business Address",
          key: 1
        },
        {
          title: "BANK DETAILS",
          dis: " You need your bank details for selling",
          key: 2
        },
        {
          title: "PAN DETAILS",
          dis: " You need to provide PAN details for selling",
          key: 3
        }].map((doc, index, { length }) =>
          <div key={doc.key}>
            <div style={{ textAlign: "center" }}>
              <h4>{doc.title}</h4>
              <p>{doc.dis}</p>
            </div>
            {(length - 1 !== index) && <Divider orientation='vertical' variant='middle' flexItem />}
          </div>
        )}
      </div>
    </div>
  )
}
