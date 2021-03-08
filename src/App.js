import './App.css';
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
              crossorigin="anonymous"
          />
          <header>
            Timmies Helper App  
          </header>
          <div>
              <TimmiesApp/>
          </div>
      </div>
  );
}

export default App;
