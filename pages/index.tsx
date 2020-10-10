import React from "react";
import useOptions from "../src";

const config = {
  option1: {
    getValue: ({ value }) => value,
  },
  option2: {
    depend: ["value1"],
    getValue: ({ value, dependsValues }) => {
      console.log(dependsValues);
      const [value1] = dependsValues;
      if (value1 === "山西") {
        return ["大同", "太原"];
      }
      return [];
    },
  },
  value1: {
    depend: ["option1"],
    getValue: ({ value, dependsValues, preValue, targetValue }) => {
      console.log("-----------");
      console.log(value, dependsValues, preValue, targetValue);

      const [options1] = dependsValues;
      if (!options1.includes(value)) {
        return options1[0];
      }
      return value;
    },
  },
  value2: {
    depend: ["option2"],
    getValue: ({ value, dependsValues }) => {
      const [options2] = dependsValues;
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
  });

  console.log(option);

  const { value1, value2, option1, option2 } = option;

  console.log("option", option);

  return (
    <div>
      <select
        value={value1}
        onChange={(e) => {
          setOptions({ value1: e.target.value });
        }}
      >
        {option1.map((option) => (
          <option>{option}</option>
        ))}
      </select>
      <select
        value={value2}
        onChange={(e) => {
          setOptions({ value2: e.target.value });
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
