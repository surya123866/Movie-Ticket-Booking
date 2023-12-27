import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="menuItems">
        <li className="menuItem">Terms Of Use</li>
        <li className="menuItem">Privacy-Policy</li>
        <li className="menuItem">About</li>
        <li className="menuItem">Blog</li>
        <li className="menuItem">FAQ</li>
      </ul>

      <div className="socialIcons">
        <a
          className="anchor-tag"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <FaFacebookF />
          </span>
        </a>
        <a
          className="anchor-tag"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <FaInstagram />
          </span>
        </a>
        <a
          className="anchor-tag"
          href="https://twitter.com/i/flow/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <FaTwitter />
          </span>
        </a>
        <a
          className="anchor-tag"
          href="https://www.linkedin.com/in/suryakommanapalli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <FaLinkedin />
          </span>
        </a>
        <a
          className="anchor-tag"
          href="https://github.com/surya123866"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <FaGithub />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
