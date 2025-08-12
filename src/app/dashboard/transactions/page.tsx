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
import { transactionSchema } from "@/db/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";

const page = async () => {
  metadata.title = "Transactions - Finance Uchiha";

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

      <Table className="container w-[80%] mx-auto px-4">
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
