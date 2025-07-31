import { metadata } from '@/app/layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const page = () => {

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
    </>
  )
}

export default page