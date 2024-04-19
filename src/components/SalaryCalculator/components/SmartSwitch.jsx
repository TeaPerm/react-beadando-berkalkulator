import React from "react";
import { Switch } from "../../Shared/Switch";
import { useFormState } from "../../../Hooks/formstate";

const SmartSwitch = ({ switchName, selectedMember }) => {
  const { changeOption } = useFormState();

  return (
    <Switch
    className="mr-2"
      checked={selectedMember[switchName].checked}
      id={switchName}
      onCheckedChange={() =>
        changeOption(selectedMember.id, switchName, {
          ...selectedMember[switchName],
          checked: !selectedMember[switchName].checked,
        })
      }
    />
  );
};

export default SmartSwitch;
