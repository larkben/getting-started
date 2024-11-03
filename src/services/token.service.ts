import { DUST_AMOUNT, ExecuteScriptResult, SignerProvider } from '@alephium/web3'
import { AddTen } from 'artifacts/ts/scripts'

// add ten template
// Token Creation Tool
export const addTenService = async (
  signerProvider: SignerProvider,
  calc: string
): Promise<ExecuteScriptResult> => {
  return await AddTen.execute(signerProvider, {
    initialFields: {
      calc: calc
    },
    attoAlphAmount: DUST_AMOUNT
  })
}