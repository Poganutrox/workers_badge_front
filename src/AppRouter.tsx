import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginView from "./views/LoginView";
import SearchView from "./views/SearchView";
import EmployeesView from "./views/EmployeesView";
import { RegisterView } from "./views/RegisterView";
import BadgeView from "./views/BadgeView";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route element={<Layout />}>
          <Route path="/" element={<BadgeView />} index />
          <Route path="/admin/search" element={<SearchView />} />
          <Route path="/admin/employees" element={<EmployeesView />} />
          <Route path="/admin/registers" element={<RegisterView />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
