import React from 'react';
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        <div className={style.footerSection}>
          <h4 className={style.sectionTitle}>About Us</h4>
          <p className={style.sectionText}>
            We are XYZ company, dedicated to providing the best service to our
            customers.
          </p>
        </div>
        <div className={style.footerSection}>
          <h4 className={style.sectionTitle}>Contact Us</h4>
          <p className={style.sectionText}>123 Main Street, Anytown, USA</p>
          <p className={style.sectionText}>Email: info@example.com</p>
          <p className={style.sectionText}>Phone: +1 234 567 8901</p>
        </div>
        <div className={style.footerSection}>
          <h4 className={style.sectionTitle}>Follow Us</h4>
          <div className={style.iconSection}>
          <Link href="https://www.facebook.com/" className="social-icon">
            <Facebook />
          </Link>
          <Link href="https://www.instagram.com/" className="social-icon">
            <Instagram />
          </Link>
          <Link href="https://www.twitter.com/" className="social-icon">
            <Twitter />
          </Link>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
