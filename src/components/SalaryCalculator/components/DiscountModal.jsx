import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Shared/Dialog";
import { Button } from "../../Shared/Button";
import { Label } from "../../Shared/Label";
import { Input } from "../../Shared/Input";
import { useFormState } from "../../../Hooks/formstate";

const DiscountModal = () => {
  const { members, selectedId, changeOption } = useFormState();

  const selectedMember = members.find((e) => e.id === selectedId);
  const [date, setDate] = useState(selectedMember.freshMarriage.date);

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mx-2 border-none" size="sm">{selectedMember.freshMarriage.date ? selectedMember.freshMarriage.date : "Dátum hozzáadása" }</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Friss házasok kedvezménye</DialogTitle>
          <DialogDescription>
            A kedvezmény először a házasságkötést követő hónapra vehető igénybe
            és a házassági életközösség alatt legfeljebb 24 hónapon keresztül
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label htmlFor="name" className="">
            Házasságkötés dátuma
          </Label>
          <br></br>
          <Input
            type="date"
            id="name"
            defaultValue={selectedMember.freshMarriage?.date}
            placeholder="YYYY/MM/DD"
            className="col-span-3"
            onChange={handleDateChange}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                changeOption(selectedId, "freshMarriage", {
                  ...selectedMember.freshMarriage,
                  date: date,
                });
              }}
              type="submit"
              className="text-white"
            >
              Mentés
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
