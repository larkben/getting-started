import { getAlephium } from "@alephium/get-extension-wallet"
import { node, SubscribeOptions, subscribeToTxStatus, TxStatusSubscription, web3 } from "@alephium/web3"
import { useEffect, useState } from "react"

interface TxStatusAlertProps {
  txId: string
  description: string
  txStatusCallback(status: node.TxStatus): Promise<any>
}

export function useTxStatus() {
  const [ongoingTxId, setOngoingTxId] = useState<string | undefined>(undefined)
  const [ongoingTxDescription, setOngoingTxDescription] = useState<string>("")
  async function defaultTxStatusCallback(status: node.TxStatus) { }
  const [txStatusCallback, setTxStatusCallback] = useState(() => defaultTxStatusCallback)

  function resetTxStatus() {
    setOngoingTxId(undefined)
    setOngoingTxDescription("")
    setTxStatusCallback(() => defaultTxStatusCallback)
  }

  return [
    ongoingTxId,
    setOngoingTxId,
    ongoingTxDescription,
    setOngoingTxDescription,
    txStatusCallback,
    setTxStatusCallback,
    resetTxStatus
  ] as const
}

export const TxStatus = ({ txId, description, txStatusCallback }: TxStatusAlertProps) => {
  const alephium = getAlephium()
  const [txStatus, setTxStatus] = useState<node.TxStatus | undefined>(undefined)

  if (!alephium?.nodeProvider) {
    throw Error("Alephium object is not initialized")
  }

  web3.setCurrentNodeProvider(alephium.nodeProvider)

  const subscriptionOptions: SubscribeOptions<node.TxStatus> = {
    pollingInterval: 3000,
    messageCallback: async (status: node.TxStatus): Promise<void> => {
      setTxStatus(status)
      if (status.type === 'Confirmed' || status.type === 'TxNotFound') {
        await new Promise(r => setTimeout(r, 5000));
      }
      await txStatusCallback(status)
    },
    errorCallback: (error: any, subscription): Promise<void> => {
      console.error(error)
      subscription.unsubscribe()
      return Promise.resolve()
    }
  }

  useEffect(() => {
    var subscription: TxStatusSubscription | undefined = undefined
    if (subscriptionOptions) {
      subscription = subscribeToTxStatus(subscriptionOptions, txId)
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  })

  return (
    <>
      <h3 style={{ margin: 0 }}>
        Transaction status ({description}): <code>{txStatus?.type || "unknown"}</code>
      </h3>
      <h3 style={{ margin: 0 }}>
        Transaction hash: <code>{txId}</code>
      </h3>
    </>
  )
}
