import './news-letter.css';
import { Button } from '@mui/material';
import {Instagram, YouTube, LinkedIn, Twitter,Facebook} from '@mui/icons-material';


/* eslint-disable-next-line */
export interface NewsLetterProps {}

export function NewsLetter(props: NewsLetterProps) {
  return (
    <div className="maindiv">
      <div className="news">
        <h2 style={{ color: "white", textAlign:"center", paddingBottom:"30px" }}>Subscribe to our newsletter!</h2>
        <div>
         <input style={{height:"45px", borderRadius:"10px 0 0 10px", outline:"none", border:"none", width:"75%"}} type="text"/>
        <Button color='secondary' style={{ height: "48px", borderRadius:"0 10px 10px 0", width:"24%"}} variant="contained">Subscribe</Button>
        </div>
      </div>
      <div className='bottom'>
        <div className="logo" style={{padding:"70px"}}>
          <img src="../../assets/images/logo.svg" alt="logo" />
          <h3 style={{textAlign:"left"}}>Address</h3>
          <p style={{color:"white"}}>Q427, Sukanta Nagar, Salt Lake, Sector 4,<br/> Kolkata - 700098, India</p>
          <br />
          <h3 style={{ textAlign: "left" }}>Follow us</h3>
          <div className='icons'>
          <Instagram />
          <YouTube/>
          <LinkedIn />
          <Twitter />
          <Facebook/>
          </div>
        </div>
        <div className='about'>
          {[{
            option:"About us"
          },
          {
            option:"Product"
            },
          {
            option:"Bulk Orders"
            },
          {
            option:"Privacy policy"
            },
          {
            option:"Profile"
            },
          {
            option:"Payment"
            },
          {
            option:"Blogs"
            },
          {
            option:"Terms & conditions"
            },
          {
            option:"Start Selling"
            },
          {
            option:"Start Design"
            },
          {
            option:"Carees"
            },
          {
            option: "Refund Policy",
            onclick:()=>console.log("Refund")
            
            },
          {
            option:"contact"
            },
          ].map((doc, index) => <div key={index} onClick={doc.onclick} style={{color:"white"}}>{ doc.option}</div>)}
        </div>
      </div>
      <div style={{backgroundColor: "#292931"}}>
        <p style={{ marginTop:"0px", color:"white", textAlign:"center"}}>Copyright © Dropoutstore 2021.</p>
      </div>
    </div>
  );
}

export default NewsLetter;
