import { Routes, Route } from "react-router-dom";
import AddSupplierForm from "./component/AddSupplierForm";
import Header from "./component/Header";
import OrdersManagement from "./component/OrdersManagement ";
import SuppliersTable from "./component/SuppliersTable ";
import OrderForm from "./component/OrderForm";
import LandingPage from "./component/landingpage";
import SignUpPage from "./component/SignUpPage";
import UserLogin from "./component/UserLogin";
import ProfilePage from "./component/Profile";
import AdminDashboard from "./component/AdminDashboard";
import AdminReportsDashboard from "./component/AdminReportsDashboard";
import ContactPage from "./component/ContactPage";
import AboutPage from "./component/AboutPage";
import Updatesuplerform from "./component/Updatesuplerform";
import Home from "./component/Home";



export default function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<UserLogin />} />
        
        <Route path="/SignUp" element={<SignUpPage />} />
        
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/form" element={<AddSupplierForm />} />
                <Route path="/order" element={<OrdersManagement />} />
                <Route path="/suppliers" element={<SuppliersTable />} />
                <Route path="/orderform" element={<OrderForm />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/adminreports" element={<AdminReportsDashboard />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/contactus" element={<ContactPage />} />
                <Route path="/aboutus" element={<AboutPage />} />
                <Route path="/update-supller" element={<Updatesuplerform/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<LandingPage />} />
                
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
}
