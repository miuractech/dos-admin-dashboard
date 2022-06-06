import { CloudUploadOutlined } from '@mui/icons-material';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './upload-modal.module.css';

/* eslint-disable-next-line */
export interface UploadModalProps { }

export function UploadModal(props: UploadModalProps) {

  const [value, setValue] = useState(0);
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.png', ".svg", ".jpg", ".jpeg"]
    }
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e: any) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ minWidth: "70vw", width: '100%' }} >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} textColor="primary">
            <Tab label="Upload" {...a11yProps(0)} sx={theme => ({
              color: 'black'
            })} />
            <Tab label="Recent uploads" {...a11yProps(1)} sx={theme => ({
              color: 'black'
            })} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <section style={{ cursor: "pointer" }}>
            <div {...getRootProps({ className: 'dropzone' })} style={{ padding: "40px 30px 0px" }}>
              <input {...getInputProps()} />
              <div style={{ textAlign: "center" }}><CloudUploadOutlined fontSize='large' /></div>
              <Typography variant='caption' display="block" color={'GrayText'} align='center'>click to upload or drop files to upload</Typography>
              {/* <Typography variant='caption' display="block" color={'GrayText'} align='center'>1440 px (width) x 400px (height)</Typography> */}
            </div>
          </section>
          <ul>{fileRejectionItems}</ul>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Recent uploads
        </TabPanel>
      </Box>
    </div>
  );
}

export default UploadModal;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
