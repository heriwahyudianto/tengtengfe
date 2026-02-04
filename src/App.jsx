import { Routes, Route } from "react-router-dom";
import { Dashboard, Auth, Digitex, Beranda } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/digitex/*" element={<Digitex />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Beranda />} />
    </Routes>
  );
}

export default App;
