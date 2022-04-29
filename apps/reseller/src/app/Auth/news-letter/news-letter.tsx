import './news-letter.css';
import { Button, Grid } from '@mui/material';
import { Instagram, YouTube, LinkedIn, Twitter, Facebook } from '@mui/icons-material';
import Footer from '../footer/footer';


/* eslint-disable-next-line */
export interface NewsLetterProps { }

export function NewsLetter(props: NewsLetterProps) {
  return (
    <div style={{ backgroundColor: "#161C33" }}>
      <div className="maindiv">
        <div className="news">
          <h2 style={{ color: "white", textAlign: "center", paddingBottom: "30px" }}>Subscribe to our newsletter!</h2>
          <div
            className="flex"
            style={{ maxWidth: 500, justifyContent: 'center', margin: 'auto' }}
          >
            <div style={{ flexGrow: 1 }}>
              <input style={{ height: "45px", borderRadius: "10px 0 0 10px", outline: "none", border: "none", width: '100%', padding: "0 20px 3px", fontSize: "15px", fontWeight: "bolder", color: "gray" }} type="text" />
            </div>
            <Button color='secondary' style={{ height: "48px", borderRadius: "0 10px 10px 0" }} variant="contained">Subscribe</Button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default NewsLetter;
