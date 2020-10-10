import React from "react";
import useDepend from "../src";

interface StateType {
  radian?: number;
  angle?: number;
}

const config = {
  radian: {
    depend: ["angle"],
    getValue: ({ targetValue, dependsValues }) =>
      targetValue != null ? targetValue : dependsValues[0] / (180 / Math.PI),
  },
  angle: {
    depend: ["radian"],
    getValue: ({ targetValue, dependsValues }) =>
      targetValue != null ? targetValue : dependsValues[0] * (180 / Math.PI),
  },
};

const App: React.FC = () => {
  const [value, setValue] = useDepend<StateType>(config, {
    radian: 1,
  });

  return (
    <div>
      <label>Radian: </label>
      <input
        type="number"
        value={value.radian}
        onChange={(e) => {
          setValue({ radian: Number(e.target.value) });
        }}
      />
      <br />
      <label>Angle: </label>
      <input
        type="number"
        value={value.angle}
        onChange={(e) => {
          setValue({ angle: Number(e.target.value) });
        }}
      />
    </div>
  );
};

export default App;
