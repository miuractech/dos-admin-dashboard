import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear'

const  modalStyle =  {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    minWidth: 300,
    width: '80%',
    maxWidth: 800,
    maxHeight:'80vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius:8
  },
}));

export default function SimpleModal({open, onClose, children,style, ...rop}) {
  const classes = useStyles();

  return (

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        {...rop}
      >
          <div className={classes.paper} style={{...modalStyle,...style}} >
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
                      <Clear/>
                  </IconButton>
              </div>
            {children}
          </div>
      </Modal>
  );
}