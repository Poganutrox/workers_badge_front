import { Button, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { Filters } from "../types";
import { PetShops, Actions } from "../data";
import { useRegisterStore } from "../store/register-store";

interface SearchSectionProps {
  filter: Filters;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchAttendances: React.FC<SearchSectionProps> = ({
  filter,
  onChange,
  onSubmit,
}) => {
  const { employees } = useRegisterStore();
  return (
    <section className="w-1/3 border-solid p-5 rounded-lg space-y-4 shadow-lg border-customRed border-1 mb-5 bg-white">
      <h2 className="text-2xl text-yellow-500 font-bold flex items-center justify-center mb-3">
        <FaSearch className="mr-5" />
        Buscador
      </h2>
      <form className="grid grid-cols-1 gap-3" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="text-lg text-customRed font-bold mb-2">
            Empleado
            <Input
              type="select"
              name="employeeId"
              value={filter.employeeId}
              onChange={onChange}
            >
              <option value="">--Selecciona un empleado--</option>
              {employees.map(({ id, name, lastname }) => (
                <option key={id} id={String(id)} value={id}>
                  {`${name} ${lastname}`}
                </option>
              ))}
            </Input>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-customRed font-bold mb-2">
            Tienda
            <Input
              type="select"
              name="petshopId"
              value={filter.petshopId}
              onChange={onChange}
            >
              <option value="">--Selecciona una tienda--</option>
              {Object.entries(PetShops)
                .filter(([_, value]) => !isNaN(Number(value)))
                .map(([key, value]) => (
                  <option key={value} id={String(value)} value={value}>
                    {key}
                  </option>
                ))}
            </Input>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-customRed font-bold mb-2">
            Acción
            <Input
              type="select"
              name="actionId"
              value={filter.actionId}
              onChange={onChange}
            >
              <option value="">--Selecciona una acción--</option>
              {Object.entries(Actions)
                .filter(([_, value]) => !isNaN(Number(value)))
                .map(([key, value]) => (
                  <option key={value} id={String(value)} value={value}>
                    {key}
                  </option>
                ))}
            </Input>
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-customRed font-bold mb-2">
            Fecha
            <Input
              name="date"
              type="date"
              value={filter.date}
              onChange={onChange}
            />
          </label>
        </div>
        <Button type="submit" color="success">
          Buscar
        </Button>
      </form>
    </section>
  );
};

export default SearchAttendances;
