import { useFormState } from "../../Hooks/formstate";
import { Card, CardContent, CardHeader, CardTitle } from "../Shared/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../Shared/Table";
import { calculateNetto, formatForint } from "../lib/utils";

const HouseholdSummary = () => {
  const { members, selectedId, changeSelectedMember } = useFormState();

  return (
    <Card className="w-full h-full bg-gray-200">
      <CardHeader>
        <CardTitle>Háztartás összesített jövedelme</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A háztartás nettó bérének lebontása.</TableCaption>
          <TableHeader className="mb-0 pb-0 border-b-2 border-primary">
            <TableRow className="">
              <TableHead className="font-bold">Családtag</TableHead>
              <TableHead className="text-right font-bold">Nettó bér</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
              className={`cursor-pointer ${selectedId === member.id ? "bg-gray-300 hover:bg-gray-300" : "hover:bg-gray-300/50"}`}
              key={member.id}
                onClick={() => changeSelectedMember(member.id)}
              >
                <TableCell className="font-medium">
                  {member.name?.length === 0 ? "Név" : member.name}
                </TableCell>
                <TableCell className="text-right">
                  {formatForint(calculateNetto(member))} Ft
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="border-t-2 border-primary font-extrabold">
              <TableCell className="text-lg">Összesen:</TableCell>
              <TableCell className="text-right text-xl">
                {formatForint(
                  members.reduce((accumulator, member) => {
                    return calculateNetto(member) + accumulator;
                  }, 0)
                )}{" "}
                Ft
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HouseholdSummary;
