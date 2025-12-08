import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { NavLink } from "react-router";
import logo from '../../../assets/images/image-removebg-preview (2).png'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo + Description */}
          <div className="md:w-1/3">
          <img className="w-[160px]" src={logo} alt="" />
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-primary">Loan</span>Link
            </h2>
            <p className="mt-4 leading-7 text-sm opacity-80">
              LoanLink is a secure and modern microloan request & approval
              system designed for borrowers, managers, and admins. Manage loans,
              track requests, and monitor reports — all in one place.
            </p>
          </div>

          {/* Useful Links */}
          <div className="md:w-1/4">
            <h3 className="footer-title text-lg font-semibold mb-3">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="link link-hover">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-loans" className="link link-hover">
                  All Loans
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className="link link-hover">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className="link link-hover">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media - আইকনের আকার text-2xl করা হয়েছে */}
          <div className="md:w-1/4">
            <h3 className="footer-title text-lg font-semibold mb-3">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
                aria-label="Facebook"
              >
                <FaFacebook size={40} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
                aria-label="Instagram"
              >
                <FaInstagram size={40} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={40} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={40} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} LoanLink — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
