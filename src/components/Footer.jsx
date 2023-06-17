function Footer() {

  const footerList = ["Home", "About", "Contact"];

  return (
    <footer className="footer-bar">
      <div className="container footer-flex">
        <ul className="footer-wrapper">
          {footerList.map((item, index) => (
            <li className="navList" key={index}>
              <p className="navbarButtons">{item}</p>
            </li>
          ))}
        </ul>
        <p className="copyright">&copy; 2023 Apricosma</p>
      </div>
    </footer>
  );
}

export default Footer;
