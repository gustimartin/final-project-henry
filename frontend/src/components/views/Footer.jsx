import { Link } from "react-router-dom";
import styles from "../../styles/footer.module.css";

const Footer = () => {
  return (
    <footer id={styles.footer} className="w-full bottom-0 ">
      <div className="container mx-auto px-4">
        <div id={styles.textColor} className="py-4">
          <ul className="flex justify-center space-x-12">
            <li>
              <Link to="About">About</Link>
            </li>
            <li>
              <Link to="Contact">Contact</Link>
            </li>
            <li>
              <Link to="categories/products">Products</Link>
            </li>
          </ul>
        </div>

        <div id={styles.textColor} className="text-center pb-4">
          © 2023 All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
