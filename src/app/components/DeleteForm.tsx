"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import React from "react";
import {
  Select,
  SelectTrigger,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import deleteData from "@/serverActions/deleteData";

type FormValues = {
  id: number;
  transactionType: string;
  categoryId: number;
  transactionDate: Date;
  amount: number | undefined;
  description: string;
};

const TransactionForm = ({
  data,
}: {
  data: {
    id: number;
    transactionType: "income" | "expense" | null;
    categoryName: string | null;
    categoryId: number;
    transactionDate: string;
    amount: string | number;
    description: string;
  };
}) => {

  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      id: data.id,
      transactionType: data.transactionType || "income",
      categoryId: data.categoryId,
      transactionDate: new Date(data.transactionDate),
      amount: Number(data.amount),
      description: data.description,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const validatedData = data.id

    const result = await deleteData(validatedData);

    if (result?.error === true) {
      toast.error("Error", {
        description: "Failed to delete transaction.",
      });
      return;
    } else if (result?.error === false) {
      router.push(
        `/dashboard/transactions?month=${
          data.transactionDate.getMonth() + 1
        }&year=${data.transactionDate.getFullYear()}`
      );
      toast.success("Success", {
        description: "Your transaction has been deleted.",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="grid grid-cols-2 gap-x-8 gap-y-4"
        >
          <FormField 
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select disabled={true}
                  onValueChange={(newValues) => {
                    field.onChange(newValues);
                    form.setValue("categoryId", 0);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value
                        ? field.value.charAt(0).toUpperCase() +
                          field.value.slice(1)
                        : "Income"}
                    </SelectTrigger>
                  </FormControl>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select disabled={true}                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value}
                    </SelectTrigger>
                  </FormControl>
                </Select>
              </FormItem>
            )}
          />

          <FormField
                      control={form.control}
                      name="transactionDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                                <Button disabled={true}
                                  variant="outline"
                                  data-empty={!field.value}
                                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                          </FormControl>
                        </FormItem>
                      )}
                    />
          <FormField 
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input disabled={true}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={true}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full mt-2">Delete Transaction</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your transaction.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button disabled={form.formState.isSubmitting}>Cancel</Button></AlertDialogCancel>
                    <Button variant={"destructive"} disabled={form.formState.isSubmitting} onClick={onSubmit}>Continue</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default TransactionForm;
