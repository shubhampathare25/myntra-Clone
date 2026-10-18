import { Outlet, useLocation} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/Fetchitems";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

function App() {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const location = useLocation();

  return (
    <>
      <Header />
      <FetchItems />
      {fetchStatus.currentlyFetching ? <LoadingSpinner /> : <Outlet />}
      
      {/* --- STAY IN THE LOOP BANNER */}
      {location.pathname === "/" && (
      <div className="footer-newsletter-banner">
        <div className="newsletter-left">
          <span className="newsletter-subtitle">STAY IN THE LOOP</span>
          <h2>Style inspiration, delivered.</h2>
          <p>Get early access to fresh arrivals and exclusive offers.</p>
        </div>
        <div className="newsletter-right">
          <div className="newsletter-input-group">
            <input 
              type="email" 
              placeholder="Enter your email address" 
            />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>
      )}
      <Footer />
    </>
  );
}

export default App;