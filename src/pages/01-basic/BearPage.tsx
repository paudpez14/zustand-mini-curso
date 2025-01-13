import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores/bears/bears.store";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears></BlackBears>
        <PollarBears></PollarBears>
        <PandaBears></PandaBears>
        <BearsDisplay></BearsDisplay>
      </div>
    </>
  );
};

export const BlackBears = () => {
  // * GOOD PRACTICES
  const { blackBears, increaseBlackBearsPopulation } = useBearStore(
    useShallow((state) => ({
      blackBears: state.blackBears,
      increaseBlackBearsPopulation: state.increaseBlackBearsPopulation,
    }))
  );

  // ! ERROR
  // const { blackBears, increaseBlackBearsPopulation } = useBearStore();
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => {
            increaseBlackBearsPopulation(+1);
          }}
        >
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button
          onClick={() => {
            increaseBlackBearsPopulation(-1);
          }}
        >
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

export const PollarBears = () => {
  const pollarBears = useBearStore((state) => state.pollarBears);
  const increasePollarBearsPopulation = useBearStore(
    (state) => state.increasePollarBearsPopulation
  );
  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => {
            increasePollarBearsPopulation(+1);
          }}
        >
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {pollarBears} </span>
        <button
          onClick={() => {
            increasePollarBearsPopulation(-1);
          }}
        >
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increasePandaBearsPopulation = useBearStore(
    (state) => state.increasePandaBearsPopulation
  );
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button
          onClick={() => {
            increasePandaBearsPopulation(+1);
          }}
        >
          +1
        </button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button
          onClick={() => {
            increasePandaBearsPopulation(-1);
          }}
        >
          -1
        </button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  const { bears, addBear, clearBears } = useBearStore(
    useShallow((state) => ({
      bears: state.bears,
      addBear: state.addBear,
      clearBears: state.clearBears,
    }))
  );
  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button className="mt-2" onClick={addBear}>Agregar oso</button>
      <button className="mt-2" onClick={clearBears}>Borrar osos</button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
