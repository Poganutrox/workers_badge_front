import { useMemo } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { getCurrentUser, logout } from "../services/AuthService";
import { FaHome, FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";
import { MdPersonSearch } from "react-icons/md";

function NavBar() {
  const isAdmin = useMemo(() => {
    return getCurrentUser() === "admin";
  }, []);

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar color="warning" light expand="md">
      <NavbarBrand href="/">
        <img
          alt="logo"
          src="/logo_terraviva.png"
          className="w-40 sm:w-40 md:w-48 lg:w-56"
        />
      </NavbarBrand>
      <Nav className="ms-auto font-bold" navbar>
        <NavItem>
          <NavLink href="/" className="flex items-center space-x-2">
            <FaHome className="text-lg" />
            <span>Fichaje</span>
          </NavLink>
        </NavItem>
        {isAdmin && (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="flex items-center space-x-2">
              <FaUser className="text-lg" />
              <span>Admin</span>
            </DropdownToggle>
            <DropdownMenu className="bg-white">
              <DropdownItem
                href="/admin/registers"
                className="flex items-center space-x-2"
              >
                <TiInputChecked className="text-lg" />
                <span>Registrados</span>
              </DropdownItem>
              <DropdownItem
                href="/admin/employees"
                className="flex items-center space-x-2"
              >
                <FaUsers className="text-lg" />
                <span>Usuarios</span>
              </DropdownItem>
              <DropdownItem
                href="/admin/search"
                className="flex items-center space-x-2"
              >
                <MdPersonSearch className="text-lg" />
                <span>Búsqueda</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
        <NavItem>
          <NavLink
            onClick={handleClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Salir</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
