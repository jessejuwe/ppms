import { FOOTER } from '@/helpers/footer-helper';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <ul className="footer__nav app__flex">
        {FOOTER.map((item, index) => (
          <li key={`${item.title}-${index}`} className="footer__item">
            <a className="footer__link" href={item.to}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="footer__contact-us">
        <p>Contact Us</p>
        <p>+234 805 535 2837 | contact@interfextech.com</p>
      </div>

      <div className="footer__base">
        <p className="footer__copyright">
          Copyright &copy; 2023 HYPPADEC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
