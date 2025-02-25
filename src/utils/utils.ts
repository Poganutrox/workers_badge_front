import { AttendancesResponse } from "../types";

export function getTimeFromDate(date: string) {
  return new Date(date).toLocaleTimeString("es-UE");
}

export function getYearFromDate(date: string) {
  return new Date(date).toLocaleDateString("es-UE");
}

export function attendanceMapperCSV(attendance: AttendancesResponse) {
  const header = ["Nombre completo", "Hora", "Fecha", "Tienda", "Acción"];

  const customArray = attendance.content.map((attendance) => [
    `${attendance.employee?.name ?? ""} ${attendance.employee?.lastname ?? ""}`,
    getTimeFromDate(attendance.id.date),
    getYearFromDate(attendance.id.date),
    attendance.petShop?.name ?? "",
    attendance.action.description ?? "",
  ]);

  return [header, ...customArray];
}
