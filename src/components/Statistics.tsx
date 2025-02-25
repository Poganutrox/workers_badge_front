import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { VscGraph } from "react-icons/vsc";
import { Attendances } from "../types";
import { useEffect, useState } from "react";
import { PetShops } from "../data";
import ProgressItem from "./ProgressItem";

type Props = {
  attendances: Attendances;
};

type Puntuality = {
  puntBabel: number | null;
  puntRabasa: number | null;
  puntCabo: number | null;
  generalPuntuality: number;
};

function Statistics({ attendances }: Readonly<Props>) {
  const initialState: Puntuality = {
    puntBabel: null,
    puntRabasa: null,
    puntCabo: null,
    generalPuntuality: 0,
  };

  const [puntualities, setPuntualities] = useState<Puntuality>(initialState);
  const calPuntuality = (petshopId?: number) => {
    const checkIns = attendances.filter((attendance) => {
      if (petshopId) {
        return (
          attendance.action.id === 1 && attendance.petShop?.id === petshopId
        );
      }
      return attendance.action.id === 1;
    });
    const checkInsOnTime = checkIns.filter((checkIn) => checkIn.onTime);
    const percentage = (checkInsOnTime.length / checkIns.length) * 100;
    return Number(percentage.toPrecision(4));
  };

  const timesInTheShop = (petshopId: PetShops) => {
    return attendances.filter(
      (attendance) =>
        attendance.petShop?.id === petshopId && attendance.action.id === 1
    ).length;
  };

  useEffect(() => {
    const babelTimes = timesInTheShop(PetShops.Babel);
    const rabasaTimes = timesInTheShop(PetShops.Rabasa);
    const caboTimes = timesInTheShop(PetShops.Cabo);

    setPuntualities({
      puntBabel: babelTimes > 0 ? calPuntuality(PetShops.Babel) : null,
      puntRabasa: rabasaTimes > 0 ? calPuntuality(PetShops.Rabasa) : null,
      puntCabo: caboTimes > 0 ? calPuntuality(PetShops.Cabo) : null,
      generalPuntuality: calPuntuality(),
    });
  }, [attendances]);

  return (
    <>
      <h2 className="text-2xl text-blue-500 font-bold flex items-center justify-center mb-5">
        <VscGraph className="mr-5" />
        Estadísticas
      </h2>
      <div className="mb-5">
        <h3 className="text-xl mb-2 text-blue-500 font-bold">Puntualidad</h3>
        <div className="flex justify-center mb-5">
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
              value={puntualities.generalPuntuality}
              styles={buildStyles({
                pathColor: "#3b82f6",
                trailColor: "#F5F5F5",
                textSize: 8,
                textColor: "#3b82f6",
              })}
              text={`${puntualities.generalPuntuality}%`}
            />
          </div>
        </div>
        {puntualities.puntBabel !== null && (
          <ProgressItem
            label="Babel"
            value={puntualities.puntBabel}
            color="success"
          />
        )}
        {puntualities.puntRabasa !== null && (
          <ProgressItem
            label="Rabasa"
            value={puntualities.puntRabasa}
            color="warning"
          />
        )}
        {puntualities.puntCabo !== null && (
          <ProgressItem
            label="Cabo"
            value={puntualities.puntCabo}
            color="danger"
          />
        )}
      </div>
      <div className="p-3 shadow-lg rounded-lg border-gray-300 border-2">
        <h3 className="text-xl mb-2 text-blue-500 font-bold">Nº fichajes</h3>
        <div className="flex items-center justify-between mb-1">
          <label className="text-lg text-blue-500 font-bold">Babel: </label>
          <span className="text-lg text-gray-700">
            {timesInTheShop(PetShops.Babel) === 1
              ? `${timesInTheShop(PetShops.Babel)} vez`
              : `${timesInTheShop(PetShops.Babel)} veces`}
          </span>
        </div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-lg text-purple-500 font-bold">Rabasa: </label>
          <span className="text-lg text-gray-700">
            {" "}
            {timesInTheShop(PetShops.Rabasa) === 1
              ? `${timesInTheShop(PetShops.Rabasa)} vez`
              : `${timesInTheShop(PetShops.Rabasa)} veces`}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-lg text-emerald-500 font-bold">Cabo: </label>
          <span className="text-lg text-gray-700">
            {" "}
            {timesInTheShop(PetShops.Cabo) === 1
              ? `${timesInTheShop(PetShops.Cabo)} vez`
              : `${timesInTheShop(PetShops.Cabo)} veces`}
          </span>
        </div>
      </div>
    </>
  );
}

export default Statistics;
