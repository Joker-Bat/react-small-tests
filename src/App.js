// Styles
import classes from "./App.module.scss";

// React Router
import { Link } from "react-router-dom";

function App() {
  return (
    <main className={classes.Container}>
      <Link to="/rating">Rating</Link>
    </main>
  );
}

export default App;
