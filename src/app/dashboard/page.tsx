import React from 'react'
import { metadata } from '../layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const page = () => {

    metadata.title = "Dashboard - Finance Uchiha";

  return (
    <>

    {/* Breadcrumb Start */}

    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbPage className="text-white">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    {/* Breadcrumb End */}


    <Button asChild variant="secondary" className="m-6">
      <Link href="/dashboard/transactions">Your Transactions</Link>
    </Button>
  </>
  )
}

export default page