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
import { useForm, Resolver } from "react-hook-form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import insertData from "@/serverActions/insertData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormValues = {
  transactionType: string;
  categoryId: number;
  transactionDate: Date;
  amount: number | undefined;
  description: string;
};

const TransactionForm = ({
  categories,
}: {
  categories: {
    id: number;
    name: string;
    type: "income" | "expense";
  }[];
}) => {
  const resolver: Resolver<FormValues> = async (values) => {
    const errors: any = {};

    if (!values.transactionType) {
      errors.transactionType = {
        type: "required",
        message: "Transaction type is required",
      };
    }

    if (values.categoryId === undefined || values.categoryId === null) {
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

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver,
    defaultValues: {
      transactionType: "income",
      categoryId: undefined,
      transactionDate: new Date(),
      amount: 0,
      description: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const validatedData = {
      ...data,
      amount: Number(data.amount), // force number
    };

    const result = await insertData(validatedData);

    if (result?.error === true) {
      console.log("Server-side validation failed:", result.details);
      console.log("Error message:", result.message);
      toast.error("Error", {
        description: "Failed to add transaction.",
      });
      return;
    } else if (result?.error === false) {
      router.push("/dashboard/transactions");
      console.log("Transaction added successfully");
      console.log("Result:", result.message);
      toast.success("Success", {
        description: "Your transaction has been added.",
      });
    }

    form.reset({
      transactionType: "income",
      categoryId: undefined,
      transactionDate: new Date(),
      amount: 0,
      description: "",
    });
  });

  const transactionType = form.watch("transactionType");
  const filteredCategories = categories.filter(
    (Category) => Category.type === transactionType
  );

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
                <Select
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
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
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
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      {field.value
                        ? filteredCategories.find((c) => c.id === field.value)
                            ?.name || "Select category"
                        : "Select category"}
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredCategories.map((Category) => (
                      <SelectItem
                        key={Category.id}
                        value={Category.id.toString()}
                      >
                        {Category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
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
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2">
                      <Calendar
                        disabled={{ after: new Date() }}
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
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
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : Number(val));
                    }}
                  />
                </FormControl>
                <FormMessage />
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
                  <Textarea
                    placeholder="Enter description"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <Button className="w-full mt-2" type="submit">
              Add Transaction
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default TransactionForm;
