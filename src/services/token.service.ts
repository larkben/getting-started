import { getAlephium } from '@alephium/get-extension-wallet'
import { Script, SignTransferTxResult } from '@alephium/web3'
import withDraw from '../../artifacts/withdraw.ral.json'

export const withdrawToken = async (amount: string, tokenId: string): Promise<SignTransferTxResult> => {
  const alephium = getAlephium()
  if (!alephium.connectedAddress || !alephium.connectedNetworkId) {
    throw Error('alephium object not initialized')
  }

  const script = Script.fromJson(withDraw)

  return await script.execute(alephium, {
    initialFields: {
      token: tokenId,
      amount: BigInt(amount)
    }
  })
}
