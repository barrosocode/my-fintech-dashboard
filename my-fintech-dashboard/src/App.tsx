// Imports
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Typography} from "@mui/material";

// Base Page
function App() {
    return (
        <Router>
            <nav>
                <Link to={"/"}>Home</Link> | <Link to={"/page2"}>Página 2</Link>
            </nav>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Typography>Home</Typography>
                        </>
                    }
                />
                <Route
                    path="/page2"
                    element={
                        <>
                            <Typography>página 2</Typography>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
