import { Routes, Route } from "react-router-dom";
import AddSupplierForm from "./component/AddSupplierForm";
import Header from "./component/Header";
import OrdersManagement from "./component/OrdersManagement ";
import SuppliersTable from "./component/SuppliersTable ";
import OrderForm from "./component/OrderForm";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/form" element={<AddSupplierForm />} />
        <Route path="/order" element={< OrdersManagement/>} /> 
        <Route path="/suppliers" element={<SuppliersTable/>} />
        <Route path="/orderform" element={<OrderForm />} />
      </Routes>
    </>
  );
}
