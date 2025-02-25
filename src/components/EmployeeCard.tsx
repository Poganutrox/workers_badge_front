import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { ImExit } from "react-icons/im";
import { useRegisterStore } from "../store/register-store";
import { IdEmployeeRequest } from "../types";
import { CHECKOUT_ACTION } from "../const";

type Props = {
  employee: IdEmployeeRequest;
  petshopId: number;
  date: string;
  hour: string;
};

function EmployeeCard({ employee, petshopId, date, hour }: Readonly<Props>) {
  const { doCheckInOut, getRegisteredEmployees } = useRegisterStore();
  const { id, name, lastname } = employee;

  const onClickHandle = async (employeeId: number, petshopId: number) => {
    await doCheckInOut(employeeId, petshopId, CHECKOUT_ACTION);
    getRegisteredEmployees();
  };

  return (
    <Card
      className="my-2"
      color="primary"
      outline
      style={{
        width: "13rem",
      }}
    >
      <CardHeader className="font-bold text-center">{`${name}${" "}${lastname}`}</CardHeader>
      <CardBody>
        <div className="flex flex-col items-center space-y-2">
          <p>{`Fecha: ${date}`}</p>
          <p>{`Hora: ${hour}`}</p>
          <Button color="danger" onClick={() => onClickHandle(id, petshopId)}>
            <ImExit />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default EmployeeCard;
