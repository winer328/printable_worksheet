import HomePage from "./Pages/HomePage.tsx";
import LogInPage from "./Pages/LogInPage.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogInPage />}></Route>
      <Route path="/Login" element={<LogInPage />}></Route>
      <Route path="/Home" element={<HomePage />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
