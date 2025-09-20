import { metadata } from "@/app/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { getSortedTransaction } from "@/data/getTransactionsByMonth";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateSelector } from "@/app/components/DateSelector";
import { getTransactionYearRange } from "@/data/getTransactionYearRange";

const currentDate = new Date();

const searchSchema = z.object({
  year: z.coerce
    .number()
    .min(currentDate.getFullYear() - 100)
    .max(currentDate.getFullYear())
    .catch(currentDate.getFullYear()),
  month: z.coerce
    .number()
    .min(1)
    .max(12)
    .catch(currentDate.getMonth() + 1),
});

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) => {
  metadata.title = "Transactions | CashBook";

  const searchParamValues = await searchParams;

  const { year, month } = searchSchema.parse(searchParamValues);
  const yearRange = await getTransactionYearRange();

  const selectedDate = new Date(year, month - 1, 1);

  const transactions = await getSortedTransaction({ year, month });

  return (
    <>
      {/* Breadcrumb Start */}
      <div className="p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-zinc-300">
              <BreadcrumbLink asChild className="hover:text-zinc-100">
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-zinc-500" />
            <BreadcrumbPage>
              <BreadcrumbItem className="text-zinc-300">
                Transactions
              </BreadcrumbItem>
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Breadcrumb End */}

      <Card className="container mx-auto">
        <CardHeader>
          <CardTitle className="container flex items-center justify-between">
            <span>Transactions for {format(selectedDate, "MMM yyyy")}</span>
            <div>
              <DateSelector year={year} month={month} yearRange={yearRange} />{" "}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/transactions/new">
              Create New Transaction
            </Link>
          </Button>

          <Table className="container w-[90%] mt-6 mx-auto px-4">
            {transactions && transactions.length > 0 ? (
              <TableCaption>
                Your transactions for {format(selectedDate, "MMM yyyy")}
              </TableCaption>
            ) : (
              <TableCaption />
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No.</TableHead>
                <TableHead className="w-[150px]">Amount</TableHead>
                <TableHead className="w-[200px]">Transaction Date</TableHead>
                <TableHead className="w-[200px]">Category</TableHead>
                <TableHead className="w-[200px]">Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            {transactions && transactions.length > 0 ? (
              <TableBody>
                {transactions?.map((transaction, index) => {
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{`${
                        index + 1
                      }`}</TableCell>
                      <TableCell>{`$${transaction.amount}`}</TableCell>
                      <TableCell>
                        {format(
                          new Date(transaction.transactionDate),
                          "MMM dd, yyyy"
                        )}
                      </TableCell>
                      <TableCell>{transaction.categoryName}</TableCell>
                      <TableCell className="capitalize">
                        <Badge
                          className={`${
                            transaction.transactionType === `income`
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-red-600 text-white hover:bg-red-700"
                          } `}
                        >
                          {transaction.transactionType}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/transactions/edit?id=${transaction.id}`}
                        >
                          <Button className="hover:bg-zinc-800 transform-gpu ">
                            <PencilIcon />{" "}
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/dashboard/transactions/delete?id=${transaction.id}`}
                        >
                          <Button variant={"destructive"} className="hover:bg-red-600 transform-gpu ">
                            <TrashIcon />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No transactions found for this month.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
