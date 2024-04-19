import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Shared/Card";
import { Input } from "../Shared/Input";
import { Slider } from "../Shared/Slider";
import { Button } from "../Shared/Button";
import DiscountModal from "./components/DiscountModal";
import { useFormState } from "../../Hooks/formstate";
import SmartSwitch from "./components/SmartSwitch";
import {
  calculateNetto,
  datesWithinTwoYears,
  formatForint,
} from "../lib/utils";
import TrashIcon from "../Shared/TrashIcon";
import { Label } from "../Shared/Label";
import { GreenBadge, RedBadge } from "./components/Badges";
import NumberInput from "./components/NumberInput";

const SalaryCalculator = () => {

  const {
    members,
    changeName,
    selectedId,
    changeBrutto,
    deleteMember,
    changeSelectedMember,
    changeOption,
  } = useFormState();

  const selectedMember = members.find((e) => e.id === selectedId);

  return (
    <Card className="w-full h-full bg-muted relative mb-4">
      {members.length > 1 && (
        <div
          onClick={() => {
            const newId = members
              .filter((member) => selectedId !== member.id)
              .pop().id;

            changeSelectedMember(newId);
            deleteMember(selectedId);
          }}
          className="bg-white p-2 absolute right-4 top-4 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <TrashIcon className="text-black w-5 h-5 hover:text-gray-800" />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="font-bold">
          {selectedMember.name !== ""
            ? `${selectedMember.name} bérének kiszámolása`
            : "Bér kiszámolása"}{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        <div>
          <Label htmlFor="name" className="font-bold">
            Családtag neve
          </Label>
          <Input
            value={selectedMember.name}
            id="name"
            placeholder="Név"
            className="w-2/3 border-none"
            onChange={(e) => {
              changeName(selectedId, e.target.value);
            }}
          />
          <Label>Add meg a családtag nevét!</Label>
        </div>

        <div>
          <Label htmlFor="brutto" className="font-bold">
            Bruttó bér
          </Label>
          <Input
            id="brutto"
            placeholder="200 ft"
            className="w-2/3 border-none"
            type="number"
            value={selectedMember.brutto}
            onChange={(e) => {
              changeBrutto(selectedId, Math.round(e.target.value));
            }}
            step="1"
          />
          <div className="pb-2">
            <Label className="">Add meg a bruttó béredet!</Label>
          </div>
          <Slider
            value={[selectedMember.brutto]}
            max={1_000_000}
            step={1}
            className="w-2/3 mb-4"
            onValueChange={(newValue) =>
              changeBrutto(selectedMember.id, newValue)
            }
          />{" "}
          <div className="w-2/3 grid grid-cols-4 gap-4">
            <Button
              className="text-white"
              onClick={() =>
                changeBrutto(
                  selectedMember.id,
                  Math.round(selectedMember.brutto * 0.95)
                )
              }
            >
              -5%
            </Button>
            <Button
              className="text-white"
              onClick={() =>
                changeBrutto(
                  selectedMember.id,
                  Math.round(selectedMember.brutto * 0.99)
                )
              }
            >
              -1%
            </Button>
            <Button
              className="text-white"
              onClick={() =>
                changeBrutto(
                  selectedMember.id,
                  Math.round(selectedMember.brutto * 1.01)
                )
              }
            >
              +1%
            </Button>
            <Button
              className="text-white"
              onClick={() =>
                changeBrutto(
                  selectedMember.id,
                  Math.round(selectedMember.brutto * 1.05)
                )
              }
            >
              +5%
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Kedvezmények</h3>
          <div className="flex items-center">
            <SmartSwitch selectedMember={selectedMember} switchName="under25" />
            <Label htmlFor="under25"> 25 év alattiak SZJA mentessége</Label>
          </div>
          <div className="items-center flex my-1">
            <SmartSwitch
              selectedMember={selectedMember}
              switchName="freshMarriage"
            />
            <Label htmlFor="freshMarriage"> Friss házasok kedvezménye</Label>{" "}
            {selectedMember.freshMarriage.checked && <DiscountModal />}
            {selectedMember.freshMarriage.date &&
            selectedMember.freshMarriage.checked &&
            datesWithinTwoYears(
              new Date(),
              new Date(selectedMember.freshMarriage.date)
            ) ? (
              <GreenBadge />
            ) : (
              selectedMember.freshMarriage.checked &&
              selectedMember.freshMarriage.date && <RedBadge />
            )}
          </div>
          <div className="flex items-center">
            <SmartSwitch
              selectedMember={selectedMember}
              switchName="personalTax"
            />
            <Label htmlFor="personalTax"> Személyi adókedvezmény</Label>
          </div>

          <div className="flex items-center my-1">
            <SmartSwitch
              selectedMember={selectedMember}
              switchName="familyTax"
            />
            <Label htmlFor="familyTax"> Családi adókedvezmény</Label>
          </div>
          {selectedMember.familyTax.checked && (
            <div className="flex items-center absolute">
              <NumberInput
                fieldName="supported"
                selectedMember={selectedMember}
                selectedId={selectedId}
                changeOption={changeOption}
              />
              <span className="mx-1">Eltartott, ebből kezdeményezett:</span>
              <NumberInput
                fieldName="supportedDiscounted"
                selectedMember={selectedMember}
                selectedId={selectedId}
                changeOption={changeOption}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pb-3">
        <h3 className="font-bold">Számított nettó bér:</h3>
        <Label className="font-bold bg-primary text-xl rounded-lg p-3 ml-2 border h-fit text-white">
          {formatForint(calculateNetto(selectedMember))} Ft
        </Label>
      </CardFooter>
    </Card>
  );
};

export default SalaryCalculator;
