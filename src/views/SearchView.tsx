// src/views/RegistersView.tsx

import { Button, Table } from "reactstrap";

import { FaListAlt } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import { useRegisterStore } from "../store/register-store";

import "react-circular-progressbar/dist/styles.css";
import { useEffect, useMemo, useState, useRef } from "react";
import { Filters } from "../types";
import Statistics from "../components/Statistics";
import PaginationComponent from "../components/PaginationComponent";
import SearchAttendances from "../components/SearchAttendances";
import { CSVLink } from "react-csv";
import {
  attendanceMapperCSV,
  getTimeFromDate,
  getYearFromDate,
} from "../utils/utils";
import { toast } from "react-toastify";

const SearchView = () => {
  const { filteredAttendances, getAllEmployee, filterAttendancesBy } =
    useRegisterStore();
  const initialState: Filters = {
    employeeId: 0,
    petshopId: 0,
    actionId: 0,
    date: "",
  };

  const [filter, setFilter] = useState<Filters>(initialState);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);
  const isFilteringByEmployee = useMemo(
    () => filter.employeeId > 0,
    [filteredAttendances]
  );
  useEffect(() => {
    getAllEmployee();
  }, []);

  useEffect(() => {
    if (filteredAttendances.content.length > 0 && tableRef.current) {
      tableRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
      tableRef.current.focus();
    } else if (isFiltering) {
      toast.warn("No se han encontrado resultados");
      setIsFiltering(false);
    }
  }, [filteredAttendances]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await filterAttendancesBy(filter, 0);
    setCurrentPage(filteredAttendances.page.number);
    setIsFiltering(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    filterAttendancesBy(filter, page);
  };

  return (
    <main className="mx-auto py-20 px-5 flex flex-col items-center justify-center">
      {/* Sección de búsqueda */}
      <SearchAttendances
        filter={filter}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Sección de resultados */}
      {filteredAttendances.content.length > 0 && (
        <section className="w-full flex justify-center items-start gap-5">
          {/* Sección principal: Registros */}
          <section className="w-2/3 p-5 shadow-lg rounded-lg space-y-10 border-yellow-500 border-2 bg-white">
            <div className="flex justify-around">
              <h2 className="text-2xl text-yellow-500 font-bold flex items-center justify-center">
                <FaListAlt className="mr-5" />
                Registros
              </h2>
              <Button color="success" className="flex gap-2 items-baseline">
                <FaFileCsv />
                <CSVLink
                  data={attendanceMapperCSV(filteredAttendances)}
                  filename="Resumen de fichajes.csv"
                  separator={";"}
                  className="cursor-pointer"
                >
                  Descargar csv
                </CSVLink>
              </Button>
            </div>

            <Table
              size="sm"
              hover
              className="table-auto mx-auto"
              innerRef={tableRef}
              tabIndex={-1}
            >
              <thead>
                <tr className="text-center">
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Hora</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                  <th>Tienda</th>
                  <th>Puntual</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendances.content.length > 0 ? (
                  filteredAttendances.content.map(
                    ({ id, employee, action, petShop, onTime }) => (
                      <tr key={id.date} className="cursor-pointer text-center">
                        <th scope="row">{employee?.name}</th>
                        <td>{employee?.lastname}</td>
                        <td>{getTimeFromDate(id.date)}</td>
                        <td>{getYearFromDate(id.date)}</td>
                        <td>{action.description}</td>
                        <td>{petShop?.name}</td>
                        {onTime !== null && action.id === 1 && (
                          <td
                            className={
                              onTime ? "text-green-600" : "text-red-600"
                            }
                          >
                            {onTime ? "Sí" : "No"}
                          </td>
                        )}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-500">
                      Sin datos
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Componente de Paginación */}
            <div className="flex justify-center">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={filteredAttendances.page.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </section>

          {/* Sección secundaria: Estadísticas */}
          {isFilteringByEmployee && filteredAttendances.content.length > 0 && (
            <section className="w-1/3 p-5 shadow-lg rounded-lg space-y-3 border-blue-500 border-2 bg-white">
              <Statistics attendances={filteredAttendances.content} />
            </section>
          )}
        </section>
      )}
    </main>
  );
};

export default SearchView;
