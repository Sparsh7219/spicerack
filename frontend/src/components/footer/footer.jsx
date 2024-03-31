import React from 'react';
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import style from "./footer.module.css";
import logo from "./../../assets/logo.png";


const Footer = () => {
  return (
    <footer className={style.footer}>
    <Link to="/">
          <img className={style.logo} src={logo} alt="Logo" />
        </Link>
      <div className={style.footerContent}>
        <div className={style.footerSection}>
        
        
          <h4 className={style.sectionTitle}>Quick Links</h4>
          <p className={style.sectionText}>
           <Link to="/" >Home</Link><br/><br/>
           <Link to="/">Favourite</Link><br/><br/>
           <Link to="/">Search</Link>
          </p>
        </div>
        <div className={style.footerSection}>
          <h4 className={style.sectionTitle}>Team</h4>
          <Link href="https://www.instagram.com/gtx__abhi/" className="social-icon">
            <p className={style.sectionText}>Abhishek Harldankar</p>
            </Link>
            <Link href="https://www.linkedin.com/in/mohammed-fayeez-234a7126b/" className="social-icon">
          <p className={style.sectionText}>Fayeez </p>
          </Link>
          <Link href="https://www.linkedin.com/in/sparshmanohar/" className="social-icon">
          <p className={style.sectionText}>Sparsh Manohar</p>
          </Link>
        </div>
        <div className={style.footerSection}>
          <h4 className={style.sectionTitle}>Follow Us</h4>
          <div className={style.iconSection}>
          <Link href="https://www.facebook.com/" className="social-icon">
            <Facebook />
          </Link><br/><br/>
          <Link href="https://www.instagram.com/" className="social-icon">
            <Instagram />
          </Link><br/><br/>
          <Link href="https://www.twitter.com/" className="social-icon">
            <Twitter />
          </Link><br/><br/>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
