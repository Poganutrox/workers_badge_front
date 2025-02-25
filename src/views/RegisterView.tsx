import { FaPeopleGroup } from "react-icons/fa6";
import ShopWorkers from "../components/ShopWorkers";
import { PetShops } from "../data";
import { useEffect } from "react";
import { useRegisterStore } from "../store/register-store";

export const RegisterView = () => {
  const { getRegisteredEmployees } = useRegisterStore();
  useEffect(() => {
    getRegisteredEmployees();
  }, []);

  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-2/3 border-solid p-5 bg-white rounded-lg space-y-5 shadow-lg border-customRed border-2">
        <h2 className="text-2xl text-customRed font-bold flex items-center justify-center mb-5">
          <FaPeopleGroup className="mr-5" />
          Empleados Registrados
        </h2>
        <ShopWorkers
          title="TerraViva Babel"
          borderColor="border-blue-500"
          textColor="text-blue-500"
          petShopId={PetShops.Babel}
        />
        <ShopWorkers
          title="TerraViva Rabasa"
          borderColor="border-purple-500"
          textColor="text-purple-500"
          petShopId={PetShops.Rabasa}
        />
        <ShopWorkers
          title="TerraViva Cabo"
          borderColor="border-emerald-500"
          textColor="text-emerald-500"
          petShopId={PetShops.Cabo}
        />
      </div>
    </main>
  );
};
