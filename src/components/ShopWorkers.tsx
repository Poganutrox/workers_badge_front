import EmployeeCard from "./EmployeeCard";
import { getYearFromDate, getTimeFromDate } from "../utils/utils";
import { useRegisterStore } from "../store/register-store";
import { useMemo } from "react";

type Props = {
  title: string;
  borderColor: string;
  textColor: string;
  petShopId: number;
};

const ShopWorkers = ({ title, borderColor, textColor, petShopId }: Props) => {
  const { currentRegisteredEmployees } = useRegisterStore();
  const filteredWorkers = useMemo(
    () =>
      currentRegisteredEmployees.filter(
        (attendance) => attendance.petShop?.id === petShopId
      ),
    [currentRegisteredEmployees]
  );

  return (
    <>
      <h3 className={`${textColor} font-bold`}>{title}</h3>
      <div
        className={`border-2 border-dashed ${borderColor} ${textColor} font-bold p-3`}
      >
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {filteredWorkers.map((employee) => (
              <EmployeeCard
                key={employee.id.employeeId}
                employee={employee.employee}
                petshopId={employee.petShop.id}
                date={getYearFromDate(employee.id.date)}
                hour={getTimeFromDate(employee.id.date)}
              />
            ))}
          </div>
        ) : (
          <p className="py-3">No hay empleados registrados</p>
        )}
      </div>
    </>
  );
};

export default ShopWorkers;
