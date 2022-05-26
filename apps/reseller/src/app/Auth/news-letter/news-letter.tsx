import './news-letter.css';
import { Alert, Button } from '@mui/material';
import Footer from '../footer/footer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig/config';
import { useState } from 'react';


/* eslint-disable-next-line */
export interface NewsLetterProps { }

export function NewsLetter(props: NewsLetterProps) {

  const schema = yup.object().shape({
    email: yup.string().email('email must look like abc@example.com').required('email cannot be empty'),
  }).required();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  })

  const [alert, setAlert] = useState(false)
  const [err, setErr] = useState("")

  const onsubmit = async (data: any) => {
    try {
      const response = await getDoc(doc(db, "NewsLetter", data.email))
      if (!response.exists()) {
        await setDoc(doc(db, "NewsLetter", data.email), {
          to: [data.email],
          message: {
            subject: 'Hello from Miurac!',
            text: 'This is the plaintext section of the email body.',
            html: 'This is the <code>HTML</code> section of the email body.',
          }
        })
        setAlert(true)

      } else {
        setErr("already subscribed to newsletter")
      }
      setTimeout(() => {
        setAlert(false)
        setErr("")
      }, 3000)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div style={{ backgroundColor: "#161C33" }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="maindiv">
          <div style={{ position: "absolute", width: "50vw", right: "0" }}>
            {alert && <Alert severity="success">Subscribed for Dropout newsletter!</Alert>}
            {err && <Alert severity="error">{err}</Alert>}
          </div>
          <div className="news">
            <h2 style={{ color: "white", textAlign: "center", paddingBottom: "30px" }}>Subscribe to our newsletter!</h2>
            <div
              className="flex"
              style={{ maxWidth: 500, justifyContent: 'center', margin: 'auto' }}
            >
              <div style={{ flexGrow: 1 }}>
                <input {...register("email")} style={{ height: "45px", borderRadius: "10px 0 0 10px", outline: "none", border: "none", width: '100%', padding: "0 20px 3px", fontSize: "15px", fontWeight: "bolder", color: "gray" }} type="text" />
              </div>
              <Button type='submit' color='secondary' style={{ height: "48px", borderRadius: "0 10px 10px 0" }} variant="contained">Subscribe</Button>
            </div>
          </div>
          <Footer />
        </div>
      </form>
    </div >
  );
}

export default NewsLetter;
