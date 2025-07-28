import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const page = () => {
  return (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-zinc-300">
            <BreadcrumbLink className="hover:text-zinc-100" href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-zinc-500" />
          <BreadcrumbItem className="text-zinc-300">
            <BreadcrumbLink className="hover:text-zinc-100" href="/dashboard/transactions">Transactions</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-zinc-500" />
          <BreadcrumbPage className="text-white">
            <BreadcrumbItem>New Transaction</BreadcrumbItem>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default page;
