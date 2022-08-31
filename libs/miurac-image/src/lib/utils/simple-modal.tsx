import React, { FunctionComponent } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Close'
import { Divider } from '@mui/material';
import { v4 as uuid } from "uuid"
import "./simple-modal.css"
type modalProps = {
  open: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => void | undefined,
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
}

const SimpleModal = ({ open, onClose, children, style, ...rop }: modalProps) => {
  const id = uuid()
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={id}
      aria-describedby={id}
      id={id}
      {...rop}
    >
      <div className='modal' style={{...style, height:"50vh", width:"70vw"}}>
        <div
          className='absolute modal-close'
        >
          <IconButton
            size='small'
            style={{
              backgroundColor: '#fff',
              color: 'black',
            }}
            onClick={() => onClose()}
          >
            <Clear style={{ zIndex: "1" }} />
          </IconButton>
        </div>
        {/* <div className="margin1">
                    <Divider />
                </div> */}
        {children}

      </div>
    </Modal>
  );
}

export default SimpleModal