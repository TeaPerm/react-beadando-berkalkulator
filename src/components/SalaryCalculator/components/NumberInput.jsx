import React from "react";
import { CircleMinus, CirclePlus } from "lucide-react";

const NumberInput = ({
  fieldName,
  selectedMember,
  selectedId,
  changeOption,
}) => {
  function handleChange(change) {
    const fieldValue = selectedMember["familyTax"][fieldName];
    const supported = selectedMember["familyTax"]["supported"];
    const newValue = fieldValue + change;

    changeOption(selectedId, "familyTax", {
      ...selectedMember["familyTax"],
      [fieldName]: newValue < 0 ? 0 : (fieldName == "supportedDiscounted" ? Math.min(fieldValue + change, supported,3) : newValue),
    });
  }

  return (
    <div className="flex items-center cursor-pointer">
      <CircleMinus className="w-5 h-5 mr-0.5" onClick={() => handleChange(-1)} />
      <span>{selectedMember["familyTax"][fieldName]}</span>
      <CirclePlus
        className="w-5 h-5 cursor-pointe ml-0.5"
        onClick={() => handleChange(1)}
      />
    </div>
  );
};

export default NumberInput;
