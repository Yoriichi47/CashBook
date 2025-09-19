import React from 'react'
import { metadata } from '../layout'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecentTransactions from '../components/RecentTransactions';
import CashflowComponent from '../components/CashflowComponent';

const page = async ({searchParams}: {searchParams: Promise<{cashflowyear?: string}>}) => {

  const {cashflowyear} = await searchParams
  let parsedYear = cashflowyear ? Number(cashflowyear) : new Date().getFullYear();
  console.log("Year from search params: ", parsedYear);

  if(!parsedYear || isNaN(parsedYear)) {
    parsedYear = new Date().getFullYear();
  }

    metadata.title = "Dashboard - Finance Uchiha";

  return (
    <>
    <Card className="container my-6 mx-auto">
        <CardHeader>
          <CardTitle className="container flex items-center justify-between">
            <div>Dashboard</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/transactions/">
              All Transactions
            </Link>
          </Button>

          <div className='m-4 flex flex-col gap-4'>
            <div><CashflowComponent year={parsedYear} /></div>
            <div><RecentTransactions /></div>
          </div>
        </CardContent>
      </Card>
  </>
  )
}

export default page