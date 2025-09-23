import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 mt-auto" >
      <div className="container" >
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4 mb-3">
            <h5>À propos</h5>
            <p>
                MernApp is a MERN application conceived for learning and 
                practicing modern development practicing
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4 mb-3">
            <h5>Util links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-4 mb-3">
            <h5>Follow us</h5>
            <a href="https://facebook.com" className="text-light me-3"><i className="bi bi-facebook"></i></a>
            <a href="https://twitter.com" className="text-light me-3"><i className="bi bi-twitter"></i></a>
            <a href="https://github.com" className="text-light"><i className="bi bi-github"></i></a>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center pb-3">
          <small>&copy; {new Date().getFullYear()} 2025 MyApp. All rights reserved. ✅</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
