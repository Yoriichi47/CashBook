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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

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
  metadata.title = "Transactions - Finance Uchiha";

  const searchParamValues = await searchParams;

  const { year, month } = searchSchema.parse(searchParamValues);

  const selectedDate = new Date(year, month - 1, 1);

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

      <Button asChild variant="secondary" className="m-6">
        <Link href="/dashboard/transactions/new">Create New Transaction</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="container flex items-center justify-between">
            <span>Transactions for {format(selectedDate, "MMM yyyy")}</span>
            <span>Dropdown Area</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Table className="container w-[80%] mt-6 mx-auto px-4">
        <TableCaption>Your Transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[150px]">Amount</TableHead>
            <TableHead className="w-[150px]">Transaction Date</TableHead>
            <TableHead className="w-[150px]">Category</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default page;
