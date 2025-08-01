"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type FormValues = {
  transactionType: string;
  categoryId: number;
  transactionDate: Date;
  amount: number;
  description: string;
};

const TransactionForm = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const resolver: Resolver<FormValues> = async (values) => {
    const errors: any = {};

    if (!values.transactionType) {
      errors.transactionType = {
        type: "required",
        message: "Transaction type is required",
      };
    }

    if (!values.categoryId && values.categoryId !== 0) {
      errors.categoryId = {
        type: "required",
        message: "Category is required",
      };
    }

    if (!values.transactionDate) {
      errors.transactionDate = {
        type: "required",
        message: "Transaction date is required",
      };
    }

    if (
      values.amount === undefined ||
      values.amount === null ||
      isNaN(Number(values.amount))
    ) {
      errors.amount = {
        type: "required",
        message: "Amount is required",
      };
    } else if (Number(values.amount) <= 0) {
      errors.amount = {
        type: "min",
        message: "Amount must be greater than 0",
      };
    }

    if (!values.description || values.description.trim() === "") {
      errors.description = {
        type: "required",
        message: "Description is required",
      };
    }

    return {
      values: Object.keys(errors).length === 0 ? values : {},
      errors,
    };
  };

  const form = useForm<FormValues>({ resolver });

  const onSubmit = form.handleSubmit((data) => console.log(data));

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-8 gap-y-4">
        <FormField
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>Select a transaction type</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>Select a Category</SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>Select a date</SelectTrigger>
                  <SelectContent>
                      <Calendar                      
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md w-full border shadow-sm"
                        captionLayout="dropdown"
                      />
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter amount" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default TransactionForm;
