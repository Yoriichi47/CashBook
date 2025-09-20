import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
        <div>
          <div className="text-zinc-100 text-3xl text-center font-semibold">
            <Image
              src="/Cashbook_icon.png"
              alt="Logo"
              width={300}
              height={50}
              className="mx-auto"
            />
            Welcome to Cashbook!
          </div>
          <SignedIn>
            <div className="mt-4 text-center  text-zinc-400">
              Go to Dashboard to manage your finances, or go to Transactions to view your transaction history.
            </div>
          </SignedIn>
          <SignedOut>
            <div className="mt-4 text-center text-zinc-400">
              Join today to start managing your finances effectively and
              efficiently
            </div>
          </SignedOut>
          <div className="mx-auto flex">
            <div className="mt-6 mx-auto flex gap-4">
              <SignedIn>
                <Button variant={"secondary"} asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant={"secondary"} asChild>
                  <Link href="/dashboard/transactions">Transactions</Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button variant={"secondary"} asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button variant={"secondary"} asChild>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
