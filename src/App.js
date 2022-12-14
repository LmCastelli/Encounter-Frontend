import LandingPage from "./pages/LandingPage";
import AddPage from "./pages/AddPage"
import Entries from "./pages/Entries"
import EditPage from "./pages/EditPage";

import {Route, Routes} from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/view" element={<Entries />}/>
        <Route path="/edit/:id" element={<EditPage />}/>
        <Route path="/prep" />
        <Route path="/encounter" />
      </Routes>
    </div>
  );
}

export default App;
