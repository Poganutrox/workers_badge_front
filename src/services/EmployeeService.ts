import api from "../api";
import { SimpleEmployeeSchemaResponse } from "../schema/employee-schema";
import { IdEmployeeRequest, EmployeeRequest } from "../types/index";

export const addEmployee = async ({ name, lastname }: EmployeeRequest) => {
  const endpoint = "/employee";
  try {
    const { data } = await api.post(endpoint, { name, lastname });
    const result = SimpleEmployeeSchemaResponse.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Error al verificar los datos");
    }
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Imposible conectarse con el servidor");
    }
    console.log(error);
    throw new Error(error?.response?.data?.message);
  }
};

export const updateEmployee = async ({
  id,
  name,
  lastname,
}: IdEmployeeRequest) => {
  const endpoint = `/employee/${id}`;
  try {
    const { data } = await api.put(endpoint, { name, lastname });
    const result = SimpleEmployeeSchemaResponse.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Error al verificar los datos");
    }
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Imposible conectarse con el servidor");
    }
    throw new Error(error.message);
  }
};
