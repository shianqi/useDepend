import React from "react";
import useDepend, { Config } from "../src";

const config: Config = {
  a: {
    depend: ["b", "c"],
    getValue: ({ value, preValue, targetValue, dependsValues: [b, c] }) => {
      console.log("value", value);
      console.log("preValue", preValue);
      return targetValue || c / b;
    },
  },
  b: {
    depend: ["a", "c"],
    getValue: ({ value, dependsValues: [a, c] }) => value || c / a,
  },
  c: {
    depend: ["a", "b"],
    getValue: ({ value, dependsValues: [a, b] }) => value || a * b,
  },
};

const Cycle: React.FC = () => {
  const [value, setValue] = useDepend(config, {
    a: 5,
    b: 5,
    c: 25,
  });

  return (
    <div>
      <input
        value={value.a}
        type="number"
        onChange={(e) => {
          setValue({
            a: e.target.value,
          });
        }}
      />
      <input
        value={value.b}
        type="number"
        onChange={(e) => {
          setValue({
            b: e.target.value,
          });
        }}
      />
      <input
        value={value.c}
        type="number"
        onChange={(e) => {
          setValue({
            c: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default Cycle;
