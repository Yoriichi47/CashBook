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
import { getDataByID } from "@/data/getDataByID";
import DeleteForm from "@/app/components/DeleteForm";
import NotFound from "@/app/components/NotFound";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: number }>;
}) => {
  metadata.title = "Delete Transaction | CashBook";

  const { id } = await searchParams;
  const data = await getDataByID({ id });

  if(!data){
    return(
      <NotFound />
    )
  }

  return (
    <>
      {/* Breadcrumb starts */}

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
                <BreadcrumbItem>Delete Transaction</BreadcrumbItem>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Breadcrumb ends */}

        <div className="lg:max-w-screen-lg md:max-w-screen-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Delete Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <DeleteForm data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
