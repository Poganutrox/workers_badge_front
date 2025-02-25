import { create } from "zustand";
import {
  IdEmployeeRequest,
  EmployeeRequest,
  SimpleEmployeesResponse,
  UserLoginForm,
  AttendancesResponse,
  Filters,
  Attendances,
  AttendanceResponse,
} from "../types";
import { devtools } from "zustand/middleware";
import {
  doCheckInOut,
  filterBy,
  getRegisteredEmployees,
} from "../services/RegisterService";
import { authenticateEmployee, getCurrentUser } from "../services/AuthService";
import { getAllEmployee } from "../services/AdminService";
import { addEmployee, updateEmployee } from "../services/EmployeeService";

type State = {
  employees: SimpleEmployeesResponse;
  currentRegisteredEmployees: Attendances;
  currentEmployee: string | null;
  filteredAttendances: AttendancesResponse;
  getAllEmployee: () => Promise<void>;
  addEmployee: (employee: EmployeeRequest) => Promise<void>;
  updateEmployee: (employee: IdEmployeeRequest) => Promise<void>;
  getRegisteredEmployees: () => Promise<void>;
  filterAttendancesBy: (filters: Filters, page: number) => Promise<void>;
  authenticateEmployee: (userLogin: UserLoginForm) => Promise<void>;
  doCheckInOut: (
    employeeId: number,
    petShopId: number,
    actionId: number
  ) => Promise<AttendanceResponse>;
};

export const useRegisterStore = create<State>()(
  devtools((set) => ({
    employees: [],
    currentRegisteredEmployees: [],
    currentEmployee: null,
    filteredAttendances: {
      content: [],
      page: { size: 0, number: 0, totalElements: 0, totalPages: 0 },
    },
    getAllEmployee: async () => {
      const employees = await getAllEmployee();
      set(() => ({
        employees: employees,
      }));
    },
    addEmployee: async ({ name, lastname }: EmployeeRequest) => {
      const newEmployee = await addEmployee({ name, lastname });
      if (newEmployee) {
        set((state) => ({
          employees: [...state.employees, newEmployee],
        }));
      }
    },
    updateEmployee: async (employee: IdEmployeeRequest) => {
      const updatedEmployee = await updateEmployee(employee);

      if (updatedEmployee) {
        set((state) => ({
          employees: state.employees.map((employee) => {
            if (employee.id === updatedEmployee.id) {
              return updatedEmployee;
            }
            return employee;
          }),
        }));
      }
    },
    getRegisteredEmployees: async () => {
      const result = await getRegisteredEmployees();
      console.log(result);
      if (result) {
        set(() => ({
          currentRegisteredEmployees: result,
        }));
      }
    },
    filterAttendancesBy: async (filters: Filters, page: number) => {
      const result = await filterBy(filters, page);
      set(() => ({
        filteredAttendances: result,
      }));
    },
    authenticateEmployee: async (userLogin: UserLoginForm) => {
      await authenticateEmployee(userLogin);
      const currentEmployee = getCurrentUser();
      set(() => ({
        currentEmployee,
      }));
    },
    doCheckInOut: async (employeeId, petShopId, actionId) => {
      const response = await doCheckInOut(employeeId, petShopId, actionId);
      return response;
    },
  }))
);
