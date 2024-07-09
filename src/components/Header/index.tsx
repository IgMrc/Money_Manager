import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog"
import logoImage from "../../assets/logo.svg"
import { NewTransactionsModal } from "../NewTransactionModal";

export function Header() {
  return (
    <div>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImage} alt="" />

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionsButton>
                Nova Trasanção
              </NewTransactionsButton>
            </Dialog.Trigger> 
            <NewTransactionsModal /> 
          </Dialog.Root>
          
        </HeaderContent>
      </HeaderContainer>
    </div>
  )
}