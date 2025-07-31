import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { metadata } from "@/app/layout";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionForm from "@/app/components/TransactionForm";

const page = () => {
  metadata.title = "Create New Transaction - Finance Uchiha";

  return (
    <>
      {/* Breadcrumg starts */}

      <div className="">
        <div className="p-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-zinc-300">
                <BreadcrumbLink asChild className="hover:text-zinc-100">
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-500" />
              <BreadcrumbItem className="text-zinc-300">
                <BreadcrumbLink asChild className="hover:text-zinc-100">
                  <Link href="/dashboard/transactions">Transactions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-500" />
              <BreadcrumbPage className="text-white">
                <BreadcrumbItem>New Transaction</BreadcrumbItem>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Breadcumb ends */}

        <div className=" lg:max-w-screen-xl md:max-w-screen-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm />
              {/* New Transaction */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
