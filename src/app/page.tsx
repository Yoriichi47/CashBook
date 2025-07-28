import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
        <div>
          <div className="text-zinc-100 text-3xl text-center font-semibold">
            <Image
              src="/Finance_Uchiha_icon.png"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
            Welcome to Finance Uchiha!
          </div>
          <div className="mt-4 text-center text-zinc-400">
            Join today to start managing your finances effectively and efficiently
          </div>
          <div className="mx-auto flex">
            <div className="mt-6 mx-auto flex gap-4">
              <Button variant={"secondary"} asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button variant={"secondary"} asChild>
                <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
