// import { CloudUploadOutlined } from '@mui/icons-material';
import UploadIcon from "./images/upload.svg"
import { Box, Button, CircularProgress, ImageList, ImageListItem, Tab, Tabs, Typography } from '@mui/material';
import { FirebaseApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import usePreviewImage from './hooks/previewHook';
import useStorage from './hooks/storage';
import "./upload.css"

/* eslint-disable-next-line */
export interface UploadModalProps {
  app: FirebaseApp
  setEditModal: (value: React.SetStateAction<boolean>) => void
  setImageurl: any
}

export function UploadModal({ app, setEditModal, setImageurl }: UploadModalProps) {
  const auth = getAuth(app)
  const user = auth.currentUser
  const db = getFirestore(app)
  const [value, setValue] = useState(0);
  const [previewUpload, setpreviewUpload] = useState("")
  const [progress, setProgress] = useState(0)
  const [imagesList, setImagesList] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [getPreview, setgetPreview] = useState<undefined | File>()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', ".svg", ".jpg", ".jpeg"]
    }
  });


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const previewUploads = usePreviewImage(getPreview)

  useEffect(() => {
    setpreviewUpload(previewUploads.preview)
  }, [previewUploads.preview])


  useEffect(() => {
    const img = new Image()
    acceptedFiles.map((file) => {
      img.src = window.URL.createObjectURL(file)
      img.onload = () => {
        if (img.width < 300 && img.height < 300) {
          setError("minimum of 300px*300px image requried")
        } else {
          setgetPreview(file)
        }
      }

    })

  }, [acceptedFiles])

  const { upload } = useStorage({ app })

  const save = () => {
    if (!user) return
    setLoading(true)
    const file = acceptedFiles[0]
    const path = `uploads/${user.uid}/images`
    const fileName = file.name + uuidv4()

    upload({
      file,
      path,
      onsuccess: (url: string) => {
        console.log('url', url);

        setLoading(false)
        setImageurl(url)
        // getRecentlyUploaded()
        // setEditModal(false)
      },
      fileName,
      onFail: (error: string) => console.log(error),
      setProgress
    })


  }

  useEffect(() => {
    getRecentlyUploaded()
  }, [])


  const getRecentlyUploaded = async () => {
    const querySnapshot = await getDocs(collection(db, `uploads/${user?.uid}/images`));
    setImagesList(querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id })))
  }



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
          {previewUpload ? (
            <div>
              {loading ? (
                <div className='center' style={{ height: "200px", width: "200px" }}>
                  <CircularProgress />
                </div>
              ) : (
                <img height={200} width={200} src={previewUpload} alt="uploaded img" />
              )}
              <div style={{ display: "flex", columnGap: "20px", justifyContent: "center", paddingTop: "30px" }}>
                <Button variant='outlined' onClick={() => setpreviewUpload("")}>Cancel</Button>
                <Button variant='contained' onClick={save}>Save</Button>
              </div>
            </div>
          ) : (
            <section style={{ cursor: "pointer" }}>
              <div {...getRootProps({ className: 'dropzone' })} style={{ padding: "40px 30px 0px" }}>
                <input {...getInputProps()} />
                <div style={{ textAlign: "center" }}><img src={UploadIcon} alt="upload" /></div>
                <Typography variant='caption' display="block" color={'GrayText'} align='center'>click to upload or drop files to upload</Typography>
              </div>
            </section>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ImageList sx={{ width: "70vw", height: 300 }} cols={6} rowHeight={100}>
            {imagesList.map((item: any) => (
              <ImageListItem
                key={item.id}
                style={{ cursor: "pointer" }}
                onClick={() => setImageurl(item.url)}
              >
                <img
                  className='images'
                  src={item.url}
                  alt="recent upload"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </TabPanel>
      </Box>
    </div >
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
