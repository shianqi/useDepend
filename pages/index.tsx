import React from "react";
import useOptions, { Config } from "../src";

const config: Config = {
  option1: {
    value: (value) => value,
  },
  option2: {
    depend: ["value1"],
    value: (value, depend) => {
      console.log(depend);
      const [value1] = depend;
      if (value1 === "山西") {
        return ["大同", "太原"];
      }
      return [];
    },
  },
  value1: {
    depend: ["option1"],
    value: (value, dependValue) => {
      const [options1] = dependValue;
      if (!options1.includes(value)) {
        return options1[0];
      }
      return value;
    },
  },
  value2: {
    depend: ["option2"],
    value: (value, dependValue) => {
      const [options2] = dependValue;
      if (!options2.includes(value)) {
        return options2[0];
      }
      return value;
    },
  },
};

const App: React.FC = () => {
  const [option, setOptions] = useOptions(config, {
    option1: ["山西", "内蒙古"],
    option2: ["大同", "太原"],
    value1: "山西",
    value2: "大同",
  }) as any;

  console.log(option);

  const { value1, value2, option1, option2 } = option;

  return (
    <div>
      <select
        value={value1}
        onChange={(e) => {
          setOptions({ ...option, value1: e.target.value });
        }}
      >
        {option1.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      <select
        value={value2}
        onChange={(e) => {
          setOptions({ ...option, value2: e.target.value });
        }}
      >
        {option2.map((option) => (
          <option>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default App;
