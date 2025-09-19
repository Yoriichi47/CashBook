import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashflow } from "@/data/getAnnualCashflow";
import React from "react";
import CashflowYearSelector from "./CashflowYearSelector";
import { getTransactionYearRange } from "@/data/getTransactionYearRange";
import { CashflowChart } from "./CashflowChart";

const CashflowComponent = async ({ year }: { year: number }) => {
  const [data, yearRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearRange(),
  ]);

  const totalAnnualIncome = data.reduce(
    (previousValue: number, EacMonth: { income: number }) => {
      return previousValue + EacMonth.income;
    },
    0
  );

  const totalAnnualExpense = data.reduce((previousValue, EachMonth: {expense: number}) => {
    return previousValue + EachMonth.expense;
  }, 0)


  console.log("Cashflow data in client: ", data);

  return (
    <>
      <Card className="container mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="container flex items-center justify-between">
            <p>Annual Report</p>
            <div>
              <CashflowYearSelector year={year} yearRange={yearRange} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-5/6">
              <CashflowChart data={data} />
            </div>
            <div className="w-1/6 border-l-2 py-12 flex flex-col justify-around p-4">
              <span >
                <p className="text-zinc-500 font-bold" >Total Income</p>
                <p className="text-3xl font-extralight">{Intl.NumberFormat("en-us").format(totalAnnualIncome)}</p>
              </span>
              <span className="w-full border"></span>
              <span  >
                <p className="text-zinc-500 font-bold" >Total Expense</p>
                <p className="text-3xl font-extralight">{Intl.NumberFormat("en-us").format(totalAnnualExpense)}</p>
              </span>
              <span className="w-full border"></span>
              <span>
                <p className="text-zinc-500 font-bold" >Balance</p>
                <p className="text-3xl font-extralight ">{Intl.NumberFormat("en-us").format(totalAnnualIncome - totalAnnualExpense)}</p>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CashflowComponent;
