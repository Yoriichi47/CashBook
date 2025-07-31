'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const transactionSchema = z.object({
  transactionType: z.enum(['income', 'expense']),
  categoryId: z.coerce.number().positive('Please select a category'),
  transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1), 'Date must be in the future'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  description: z
    .string()
    .min(5, 'Description is required')
    .max(200, 'Description cannot exceed 200 characters'),
})

type TransactionInput = z.input<typeof transactionSchema>

const TransactionForm = () => {
  const form = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transactionType: 'income',
      categoryId: 1, // Can't be 0 if using `.positive()`
      transactionDate: new Date(),
      amount: 1,
      description: '',
    },
  })

  const handleSubmit = async (data: TransactionInput) => {
    console.log('submitted:', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <fieldset className='grid grid-cols-2 gap-y-5 gap-x-2'>
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type" />
                  </SelectTrigger>
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
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={(field.value as number).toString()} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </fieldset>
      </form>
    </Form>
  )
}

export default TransactionForm
