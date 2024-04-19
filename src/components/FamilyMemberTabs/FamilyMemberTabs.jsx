import { Plus } from "lucide-react";
import { getMaxId, useFormState } from "../../Hooks/formstate";
import { Button } from "../Shared/Button";
import { Tabs, TabsList, TabsTrigger } from "../Shared/Tabs";

const FamilyMemberTabs = () => {
  const { members, addMember, changeSelectedMember, selectedId } =
    useFormState();
  return (
    <Tabs
    className="flex items-center"
      value={selectedId}
      onValueChange={(value) => changeSelectedMember(value)}
    >
      <TabsList className="">
        {members.map((member) => (
          <TabsTrigger key={member.id} value={member.id}>
            {member.name?.length === 0 ? "Név" : member.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <Button
      className="ml-0.5"
        onClick={() => {
          const newId = getMaxId(members) + 1 ;
          addMember();
          changeSelectedMember(newId);
        }}
      >
        <Plus className="h-4 w-4 text-white"/>
      </Button>
    </Tabs>
  );
};

export default FamilyMemberTabs;
