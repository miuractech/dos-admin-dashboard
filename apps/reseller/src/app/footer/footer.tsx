import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Grid } from '@mui/material';
import './footer.css';

/* eslint-disable-next-line */
export interface FooterProps { }

export function Footer(props: FooterProps) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="footer-text">
            <img style={{ width: '100%', maxWidth: 300 }} src="../../assets/images/logo.svg" alt="logo" />
            <h3 className='h3Color'>Address</h3>
            <p style={{ color: "white" }}>Q427, Sukanta Nagar, Salt Lake, Sector 4,<br /> Kolkata - 700098, India</p>
            <br />
            <h3 className='h3Color'>Follow us</h3>
            <div className='icons'>
              <Instagram />
              <YouTube />
              <LinkedIn />
              <Twitter />
              <Facebook />
            </div>
          </div>
        </Grid>
        <Grid xs={12} md={6} item>
          <Grid container spacing={4}>
            {[{
              option: "About us",
              key: 1
            },
            {
              option: "Product",
              key: 2
            },
            {
              option: "Bulk Orders",
              key: 3
            },
            {
              option: "Privacy policy",
              key: 4
            },
            {
              option: "Profile",
              key: 5
            },
            {
              option: "Payment",
              key: 6
            },
            {
              option: "Blogs",
              key: 7
            },
            {
              option: "Terms & conditions",
              key: 8
            },
            {
              option: "Start Selling",
              key: 9
            },
            {
              option: "Start Design",
              key: 10
            },
            {
              option: "Carees",
              key: 11
            },
            {
              option: "Refund Policy",
              onclick: () => console.log("Refund"),
              key: 12

            },
            {
              option: "Contact Us",
              key: 13
            },
            ].map((doc) =>
              <Grid item xs={12} md={4} key={doc.key} onClick={doc.onclick} style={{ color: "white" }}  >
                <div className="footer-text">

                  {doc.option}
                </div>
              </Grid>)
            }
          </Grid>
        </Grid>
      </Grid>
      <div style={{ backgroundColor: "#292931" }}>
        <p style={{ marginTop: "30px", color: "white", textAlign: "center" }}>Copyright © Dropoutstore 2021.</p>
      </div>
    </div>
  );
}

export default Footer;
