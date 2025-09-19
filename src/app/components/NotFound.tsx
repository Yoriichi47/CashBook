import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const NotFunction = () => {
  return (
    <div className="lg:max-w-screen-lg mt-6 md:max-w-screen-md mx-auto">
      <Card className="text-center">
        <CardHeader >
          <CardTitle>404 | Transaction not found</CardTitle>
          <CardContent className="pt-4">Go back to <span className="underline hover:text-blue-800 transition-all"><Link href={"/dashboard/transactions"}>Transactions</Link></span></CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default NotFunction;
