"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React from "react";

const CashflowYearSelector = ({
  year,
  yearRange,
}: {
  year: number;
  yearRange: number[];
}) => {
  const router = useRouter();

  const [selectedYear, setSelectedYear] = React.useState(year);

  return (
    <div className="flex gap-2">
      <Select
        value={selectedYear.toString()}
        onValueChange={(newValue) => {
          setSelectedYear(Number(newValue)); // update local state
          router.push(`/dashboard?cashflowyear=${newValue}`); // navigate
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={year} />
        </SelectTrigger>
        <SelectContent>
          {yearRange.map((year) => (
            <SelectItem key={year} value={`${year}`}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CashflowYearSelector;
