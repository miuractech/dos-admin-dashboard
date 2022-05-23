import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear'

const  modalStyle =  {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
      position: 'absolute',
      minWidth: 300,
      width: '80%',
      maxWidth: 800,
      maxHeight:'80vh',
      overflow: 'auto',
      backgroundColor: 'white',
      boxShadow: '0px 3px 5px -1px #00000044,0px 5px 8px 0px rgba(,0,0,0,.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      padding: '16px',
      borderRadius:8
  };

export type simpleModalProps = {
  open:boolean, 
  onClose:any, 
  children:JSX.Element,
  style?:any, 
}
export default function SimpleModal({open, onClose, children,style, ...rop}:simpleModalProps) {
  const inlineStyle = style?{...modalStyle,...style}:modalStyle
  return (

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        {...rop}
      >
          <div style={inlineStyle} >
              <div
              style={{
                  position: 'absolute',
                  right:16
              }}
              >
                  <IconButton
                  size="small"
                  style={{
                    backgroundColor: '#888',
                    color: 'white',
                  }}
                  onClick={()=>onClose()}
                  >
                      <Clear fontSize='inherit'/>
                  </IconButton>
              </div>
            {children}
          </div>
      </Modal>
  );
}