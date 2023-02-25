import React, { useState } from "react";
import { formFieldSchema } from "src/helpers/productFormSchema/testSchema";

const FormFieldSchemaBase = () => {

  const [inputs, setInputs] = useState({
    email: "ac@mail.com",
    bloodGroup: "o+",
    // gender: "male",
    hobby: ["Reading", "Singing", "Listening"],
  });

  const inputEvents = (e, fieldName) => {
    // console.log("event", e, e.target.name, e.target.value);

    if (e.target.type === "checkbox") {
      const newInputs = { ...inputs };

      let selectedItem = [...inputs[fieldName]];

      if (e.target.checked === true) {
        selectedItem.push(e.target.name);
      } else if (e.target.checked === false) {
        selectedItem = selectedItem.filter(
          (checkItem) => checkItem !== e.target.name
        );
      }

      newInputs[fieldName] = selectedItem;

      setInputs(newInputs);
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    // if(e.target.type === "checkbox"){

    //   setInputs({

    //     ...inputs,

    //     [e.target.name]: e.target.name

    //   })

    // }
  };

  console.log("inputs", inputs);

  const btnClick = () => {
    console.log(inputs);
  };

  return (
    <div className="container">
      {formFieldSchema.map((item, index) => {
        return (
          <>
            {item.type === "text" && (
              <>
                <div>
                  <label>{item.label}</label>

                  <input
                    type="text"
                    name={item.name}
                    value={inputs[item.name]}
                    placeholder={item.placeHolder}
                    onChange={inputEvents}
                  />
                </div>
              </>
            )}

            {item.type === "select" && (
              <>
                <div>
                  <label>{item.label}</label>

                  <select
                    name={item.label}
                    value={inputs[item.name]}
                    onChange={inputEvents}
                  >
                    <option value="select">Select</option>

                    {item.option.map((item, index) => {
                      return <option value={item.label}>{item.value}</option>;
                    })}
                  </select>
                </div>
              </>
            )}

            {item.type === "radio" && (
              <>
                <div>
                  <label>{item.label}</label>

                  <br />

                  {item.option.map((element, value) => {
                    return (
                      <>
                        <input
                          type="radio"
                          name={item.name}
                          value={element.value}
                          onChange={inputEvents}
                          checked={inputs.gender === element.value}
                        />

                        <label>{element.label}</label>

                        <br />
                      </>
                    );
                  })}
                </div>
              </>
            )}

            {item.type === "checkbox" && (
              <>
                <div>
                  <label>{item.label}</label><br />

                  {item.option.map((element, index) => {
                    return (
                      <>
                        <input
                          type={item.type}
                          name={element.label}
                          checked ={inputs.hobby.forEach((value, index)=>element.value === value) }
                          // checked ={element.value === }
                          onChange={(e) => inputEvents(e, item.name)}
                          
                        />

                        <label>{element.label}</label>

                        <br />
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </>
        );
      })}

      <button onClick={btnClick}>Click Button</button>
    </div>
  );
};

export default FormFieldSchemaBase;
