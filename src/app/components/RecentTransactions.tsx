import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTransaction } from "@/data/getTransactionsByMonth";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const RecentTransactions = async () => {
  
  const transactions = await getTransaction();
  
  return (
    <Card className="container mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="container flex items-center justify-between">
          <p>Recent Transactions</p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={"/dashboard/transactions"}>View all</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions/new">Add new</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="container w-[90%] mt-2 mx-auto px-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead className="w-[150px]">Amount</TableHead>
              <TableHead className="w-[200px]">Transaction Date</TableHead>
              <TableHead className="w-[200px]">Category</TableHead>
              <TableHead className="w-[200px]">Type</TableHead>
              <TableHead>Description</TableHead>
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
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No Transactions yet. Create a new transaction by clicking <Link className="underline hover::text-blue-800 transition-all" href={"/dashboard/transactions/new"}>here</Link>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
