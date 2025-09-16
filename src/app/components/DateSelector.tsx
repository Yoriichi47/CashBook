"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { getTransactionYearRange } from "@/data/getTransactionYearRange";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DateSelector({
  year,
  month,
  yearRange,
}: {
  year: number;
  month: number;
  yearRange: number[];
}) {
  const [selectMonth, setSelectMonth] = useState(month);
  const [selectYear, setSelectYear] = useState(year);

  return (
    <>
      <div className="flex gap-2">
        <Select
          value={selectMonth.toString()}
          onValueChange={(newValue) => setSelectMonth(Number(newValue))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={month} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a Month</SelectLabel>
              {Array.from({ length: 12 }).map((_, i) => (
                <SelectItem key={i} value={`${i + 1}`}>
                  {format(new Date(selectYear, i, 1), "MMMM")}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectYear.toString()}
          onValueChange={(newValue) => setSelectYear(Number(newValue))}
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
        <Button asChild>
            <Link href={`/dashboard/transactions?month=${selectMonth}&year=${selectYear}`}> Go </Link>
        </Button>
      </div>
    </>
  );
}
