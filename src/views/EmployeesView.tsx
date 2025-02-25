import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button, Input, Table } from "reactstrap";
import { useRegisterStore } from "../store/register-store";
import { BsNutFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function EmployeesView() {
  type FormState = {
    id: number;
    name: string;
    lastName: string;
  };
  const initialState: FormState = {
    id: 0,
    name: "",
    lastName: "",
  };
  const { employees, getAllEmployee, addEmployee, updateEmployee } =
    useRegisterStore();
  const [form, setForm] = useState(initialState);
  const isAdding = useMemo(() => form.id === 0, [form]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };
  const handleEmployeeClick = (id: number, name: string, lastName: string) => {
    setForm((prevForm) => ({ ...prevForm, id, name, lastName }));
  };
  const handleClearClick = () => {
    setForm(initialState);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).id;
    switch (id) {
      case "addButton":
        try {
          await addEmployee({ name: form.name, lastname: form.lastName });
          toast.success("Empleado añadido con éxito");
        } catch (error: any) {
          toast.error(error.message);
        }

        break;
      case "updateButton":
        try {
          await updateEmployee({
            id: form.id,
            name: form.name,
            lastname: form.lastName,
          });
          toast.success("Empleado modificado con éxito");
        } catch (error: any) {
          toast.error(error.message);
        }

        break;
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);
  return (
    <main className="mx-auto py-20 px-5 flex space-x-10">
      <div className="w-2/3 border-solid p-5 rounded-lg space-y-5 shadow-lg border-customRed border-2 bg-white">
        <h2 className="text-2xl text-customRed font-bold flex items-center justify-center">
          <FaListAlt className="mr-5" />
          Empleados
        </h2>
        <Table size="sm" hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Apellidos</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(({ id, name, lastname }) => (
              <tr
                key={id}
                className="cursor-pointer"
                onClick={() => handleEmployeeClick(id, name, lastname)}
              >
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{lastname}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="w-1/3 h-50 p-5 shadow-lg rounded-lg space-y-10 border-yellow-500 border-2 bg-white">
        <h2 className="text-2xl text-yellow-500 font-bold flex items-center justify-center">
          <BsNutFill className="mr-5" />
          Gestión empleado
        </h2>
        <div>
          <form className="space-y-5">
            <label
              id="name"
              htmlFor="name"
              className="text-lg font-bold text-yellow-600"
            >
              Nombre
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre empleado"
              bsSize="sm"
              value={form.name}
              onChange={handleChange}
              required={true}
            />
            <label
              id="lastName"
              htmlFor="lastName"
              className="text-lg font-bold text-yellow-600"
            >
              Apellidos
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              bsSize="sm"
              placeholder="Apellidos empleado"
              value={form.lastName}
              onChange={handleChange}
              required={true}
            />
            <div className="flex justify-around">
              {isAdding ? (
                <Button id="addButton" color="success" onClick={handleClick}>
                  Añadir
                </Button>
              ) : (
                <Button id="updateButton" color="warning" onClick={handleClick}>
                  Modificar
                </Button>
              )}
              <Button color="info" onClick={handleClearClick}>
                Limpiar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EmployeesView;
