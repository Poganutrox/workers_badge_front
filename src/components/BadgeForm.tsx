import { Button, Input, FormFeedback, FormGroup, Label } from "reactstrap";
import { MdOutlineFactCheck } from "react-icons/md";
import { FaIdCard } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { ChangeEvent, FormEvent, useState } from "react";
import { PetShops } from "../data";
import { useRegisterStore } from "../store/register-store";
import ShopSelector from "./ShopSelector";
import { toast } from "react-toastify";

function BadgeForm() {
  type FormState = {
    petshopId: number;
    employeeId: number;
    actionId: number;
    isInputIdValid: boolean;
    isShopSelectorValid: boolean;
    hasSubmitted: boolean;
  };

  const initialFormState: FormState = {
    petshopId: 0,
    employeeId: 0,
    actionId: 0,
    isInputIdValid: true,
    isShopSelectorValid: true,
    hasSubmitted: false,
  };

  const [form, setForm] = useState(initialFormState);
  const { doCheckInOut } = useRegisterStore();

  const validateInputId = (id: number) => id > 0;
  const validateShopSelector = (shopId: number) => shopId > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isShopSelectorValid = validateShopSelector(form.petshopId);
    const isInputIdValid = validateInputId(form.employeeId);

    setForm((prevForm) => ({
      ...prevForm,
      isShopSelectorValid,
      isInputIdValid,
      hasSubmitted: true,
    }));

    if (isShopSelectorValid && isInputIdValid) {
      try {
        const { employeeId, petshopId, actionId } = form;
        const attendance = await doCheckInOut(employeeId, petshopId, actionId);
        if (actionId === 1) {
          toast.success(
            `El empleado ${attendance.employee.name} ha registrado su entrada`
          );
        } else {
          toast.success(
            `El empleado ${attendance.employee.name} ha registrado su salida`
          );
        }
      } catch (error: any) {
        toast.error(error.message);
      }

      setForm(initialFormState);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const employeeId = Number(e.target.value);
    setForm((prevForm) => ({
      ...prevForm,
      employeeId,
      isInputIdValid: validateInputId(employeeId),
    }));
  };

  const handleClick = (shop: PetShops) => {
    setForm((prevForm) => ({
      ...prevForm,
      petshopId: shop,
      isShopSelectorValid: validateShopSelector(shop),
    }));
  };

  return (
    <form
      className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border-2 border-customRed"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-customRed font-bold flex items-center justify-center mb-5">
        <FaIdCard className="mr-5" />
        Registro de Empleado
      </h2>

      <div className="mb-6">
        <FormGroup>
          <Label
            htmlFor="workerId"
            className="text-lg font-medium text-gray-500"
          >
            Código de empleado
          </Label>
          <Input
            id="workerId"
            type="number"
            value={form.employeeId}
            onChange={handleChange}
            valid={form.hasSubmitted ? form.isInputIdValid : undefined}
            invalid={form.hasSubmitted ? !form.isInputIdValid : undefined}
            required
            aria-describedby="workerIdHelp"
          />
          {form.hasSubmitted && !form.isInputIdValid && (
            <FormFeedback id="workerIdHelp">
              El ID del trabajador debe ser mayor que 0.
            </FormFeedback>
          )}
        </FormGroup>
      </div>

      <div className="mb-6">
        <FormGroup>
          <Label
            htmlFor="shopSelector"
            className="text-lg font-medium text-slate-500"
          >
            Selección de Tienda
          </Label>

          <ShopSelector
            handleClick={handleClick}
            activeShop={form.petshopId}
            aria-labelledby="shopSelector"
          />

          {form.hasSubmitted && !form.isShopSelectorValid && (
            <FormFeedback className="d-block mt-2">
              Debes seleccionar una tienda.
            </FormFeedback>
          )}
        </FormGroup>
      </div>

      <div className="flex justify-evenly text-center mt-10">
        <Button
          color="success"
          size="lg"
          type="submit"
          className="px-6 py-2 flex items-center justify-center"
          onClick={() => setForm((prevForm) => ({ ...prevForm, actionId: 1 }))}
        >
          <span className="mr-2">Entrar</span>
          <MdOutlineFactCheck />
        </Button>
        <Button
          color="danger"
          size="lg"
          type="submit"
          className="px-6 py-2 flex items-center justify-center"
          onClick={() => setForm((prevForm) => ({ ...prevForm, actionId: 2 }))}
        >
          <span className="mr-2">Salir</span>
          <HiOutlineHome />
        </Button>
      </div>
    </form>
  );
}

export default BadgeForm;
