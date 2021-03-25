import './App.css';
import paypallogo from './paypal.png';
import Container from 'react-bootstrap/Container'
import TimmiesApp from './TimmiesApp'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
              integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
              crossOrigin="anonymous"
          />
          <header className="app-header">
            Tim Horton's Hockey Challenge Helper
          </header>
          <div>
              <TimmiesApp />
              <footer className="footer" >
                  <div>Questions? Suggestions? Find me on <a href={"//www.twitter.com/Zorbane"} target="_blank">Twitter</a></div>
                  <div>Buy me Timmies? <a href='https://www.paypal.com/paypalme/zorbane/' target="_blank"><img className="paypal-logo" src={paypallogo}/></a></div>
              </footer>
          </div>
      </div>
  );
}

export default App;
