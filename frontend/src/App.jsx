import { Routes, Route } from "react-router-dom";
import AddSupplierForm from "./component/AddSupplierForm";

export default function App() {
  return (
    <Routes>
      <Route path="/form" element={<AddSupplierForm />} />
      {/* <Route path="/supplier" element={<Supplier />} /> */}
    </Routes>
  );
}
