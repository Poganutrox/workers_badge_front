import api from "../api";
import { SimpleEmployeesSchemaResponse } from "../schema/employee-schema";

export async function getAllEmployee() {
  const endpoint = "/employee";
  try {
    const { data } = await api.get(endpoint);
    const result = SimpleEmployeesSchemaResponse.safeParse(data);
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Error al validar los datos del esquema");
    }
  } catch (error) {
    throw error;
  }
}
