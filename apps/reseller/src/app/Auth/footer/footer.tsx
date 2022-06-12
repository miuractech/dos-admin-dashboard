import { useMfaFirebase } from '@miurac/mfa-firebase';
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import './footer.css';

/* eslint-disable-next-line */
export interface FooterProps { }

export function Footer(props: FooterProps) {
  return (
    <div style={{ backgroundColor: "#161C33", padding: "5% 10% 5px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="footer-text">
            <img style={{ width: '100%', maxWidth: 350 }} src="../../assets/images/logo.svg" alt="logo" />
            <h3 className='h3Color'>Address</h3>
            <p style={{ color: "white" }}>Q427, Sukanta Nagar, Salt Lake, Sector 4,<br /> Kolkata - 700098, India</p>
            <br />
            <h3 className='h3Color'>Follow us</h3>
            <div className='icons' >
              <Instagram className='icon' />
              <YouTube className='icon' />
              <LinkedIn className='icon' />
              <Twitter className='icon' />
              <Facebook className='icon' />
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
                <span style={{ cursor: "pointer" }}>
                  {doc.option}
                </span>
              </Grid>)
            }
          </Grid>
        </Grid>
      </Grid>
      {/* <p style={{ marginTop: "30px", color: "white", textAlign: "center" }}>Copyright © Dropoutstore 2021.</p> */}
      <Typography variant='body2' textAlign="center" color="white" marginTop="3%">Copyright © Dropoutstore 2021.</Typography>
    </div>
  );
}

export default Footer;
