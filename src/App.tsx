import { RouterProvider } from "react-router-dom";
import Router from "./routes/router";
import "./index.css";
function App() {
  return (
    <div className="min-h-screen bg-white ">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;