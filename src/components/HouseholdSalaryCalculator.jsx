import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
  return (
    <>
      <header className="mx-4 my-1">
        <FamilyMemberTabs />
      </header>
      <main className="flex gap-5 mx-4">
        <SalaryCalculator />
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
