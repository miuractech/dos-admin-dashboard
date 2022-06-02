import { Typography } from '@mui/material';
import React from 'react';
import Dropzone from 'react-dropzone';

function Accept({ setImage}) {
  const maxSize = 1048576;

  
  return (
    
      <Dropzone
        onDrop={acceptedFiles => {
          if (acceptedFiles.length === 1){
          acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }));
          setImage(acceptedFiles[0])
        }
        }}
        accept='image/jpeg,image/png,image/svg'
        minSize={1000}
        maxSize={maxSize}
      >
      {({getRootProps, getInputProps, isDragActive, isDragReject,acceptedFiles,fileRejections}) => {
        
        return(
        <section className="container pointer-cursor">
          <div {...getRootProps({ className: 'dropzone'})} >
            <input {...getInputProps()} />
            {!isDragActive && <Typography>Drag 'n' drop some files here, or click to select files</Typography>}
            {isDragActive && !isDragReject && <Typography>"Drop it like it's hot!"</Typography>}
            {isDragReject && <Typography color={'error'}>File type not accepted, sorry!" </Typography>}
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
        </section>
        )}}
      </Dropzone>
  );
}

export default Accept