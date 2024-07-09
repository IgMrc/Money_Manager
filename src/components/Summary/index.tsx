import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";

import { priceFormetter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSymmary";

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#0659cf"/>
        </header>
        <strong>{priceFormetter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68"/>
        </header>
        <strong>{priceFormetter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard variant="blue">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff"/>
        </header>
        <strong>{priceFormetter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}