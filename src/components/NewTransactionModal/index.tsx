import * as Dialog from "@radix-ui/react-dialog"
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react"
import { CloseButton, Content, Overlay, TransactionsType, TransactionsTypeButton } from "./styles"
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionsFormSchema>

export function NewTransactionsModal() {
  const createTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.createTransactions;
  })

  const { 
    control, 
    register, 
    handleSubmit, 
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type:'income'
    }
  })

  async function handleCrateNewTransactions(data: NewTransactionsFormInputs) {

    const { description, price, category, type } = data;

    await createTransactions({
      description,
      price,
      category,
      type,
    })

    reset();
  }

  return (
      <Dialog.Portal>
        <Overlay/>
        <Content>
          <Dialog.Title>Nova Trasação</Dialog.Title>
          <CloseButton>
            <X size={24}/>
          </CloseButton>
          <form onSubmit={handleSubmit(handleCrateNewTransactions)}>
            <input 
              type="text" 
              placeholder="Descrição" 
              required
              {...register('description')} 
            />
            <input 
              type="number" 
              placeholder="Preço" 
              min={0}
              required
              {...register('price', { valueAsNumber: true })} 
            />
            <input 
              type="text" 
              placeholder="Categoria" 
              required
              {...register('category')} 
            />

            <Controller  
              control={control}
              name="type"
              render={({field}) => {
                return (
                  <TransactionsType onValueChange={field.onChange} value={field.value}>
                    <TransactionsTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24}/>
                      Entrada
                    </TransactionsTypeButton>

                    <TransactionsTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24}/>
                      Saida
                    </TransactionsTypeButton>
                  </TransactionsType>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
          
        </Content>
      </Dialog.Portal>
  )
}