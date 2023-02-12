import { FC, useEffect, useState } from "react"
import Select from 'react-select';
import { getAlephium } from '@alephium/get-extension-wallet'
import {
  networkId,
} from "../services/wallet.service"
import styles from "../styles/Home.module.css"
import { SubscribeOptions, subscribeToTxStatus, TxStatusSubscription, TxStatus, web3, groupOfAddress } from "@alephium/web3"
import { FaucetContractIdByGroup, getFaucetContractIdByGroup } from '../../configs/addresses'
import { transferToken } from "@/services/token.service";

type Status = "idle" | "approve" | "pending" | "success" | "failure"

export const TokenDapp: FC<{
  address: string
}> = ({ address }) => {
  const addressGroup = groupOfAddress(address)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferTokenId, setTransferTokenId] = useState("")
  const [lastTransactionHash, setLastTransactionHash] = useState("")
  const [transactionStatus, setTransactionStatus] = useState<Status>("idle")
  const [transactionError, setTransactionError] = useState("")
  const [alphBalance, setAlphBalance] = useState<{ balance: string, lockedBalance: string } | undefined>()
  const [faucetContractIdByGroup, setFaucetContractIdByGroup] = useState<FaucetContractIdByGroup>()

  const alephium = getAlephium()

  const buttonsDisabled = ["approve", "pending"].includes(transactionStatus)

  useEffect(() => {
    const faucetContractIdByGroup = getFaucetContractIdByGroup()
    if (!!faucetContractIdByGroup) {
      setFaucetContractIdByGroup(faucetContractIdByGroup)
      setTransferTokenId(faucetContractIdByGroup[`${addressGroup}`])
    }
  }, [])

  useEffect(() => {
    ; (async () => {
      if (lastTransactionHash && transactionStatus === "pending") {
        setTransactionError("")

        if (alephium?.nodeProvider) {
          let subscription: TxStatusSubscription | undefined = undefined
          let txNotFoundRetryNums = 0
          web3.setCurrentNodeProvider(alephium.nodeProvider)

          const subscriptionOptions: SubscribeOptions<TxStatus> = {
            pollingInterval: 3000,
            messageCallback: async (status: TxStatus): Promise<void> => {
              switch (status.type) {
                case "Confirmed": {
                  setTransactionStatus("success")

                  subscription?.unsubscribe()
                  break
                }

                case "TxNotFound": {
                  if (txNotFoundRetryNums > 3) {
                    setTransactionStatus("failure")
                    setTransactionError(`Transaction ${lastTransactionHash} not found`)
                    subscription?.unsubscribe()
                  } else {
                    await new Promise(r => setTimeout(r, 3000));
                  }

                  txNotFoundRetryNums += 1
                  break
                }

                case "MemPooled": {
                  console.log(`Transaction ${lastTransactionHash} is in mempool`)
                  setTransactionStatus("pending")
                  break
                }
              }
            },
            errorCallback: (error: any, subscription): Promise<void> => {
              console.log(error)
              setTransactionStatus("failure")
              let message = error ? `${error}` : "No further details"
              if (error?.response) {
                message = JSON.stringify(error.response, null, 2)
              }
              setTransactionError(message)

              subscription.unsubscribe()
              return Promise.resolve()
            }
          }

          subscription = subscribeToTxStatus(subscriptionOptions, lastTransactionHash)
        } else {
          throw Error("Alephium object is not initialized")
        }
      }
    })()
  }, [transactionStatus, lastTransactionHash])

  const handleTransferSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setTransactionStatus("approve")

      const result = await transferToken(transferAmount, transferTokenId)
      console.log(result)

      setLastTransactionHash(result.txId)
      setTransactionStatus("pending")
    } catch (e) {
      console.error(e)
      setTransactionStatus("idle")
    }
  }

  return (
    <>
      <h3 style={{ margin: 0 }}>
        Current transaction status: <code>{transactionStatus}</code>
      </h3>
      {lastTransactionHash && (
        <h3 style={{ margin: 0 }}>
          Transaction hash:{" "}
          <code>{lastTransactionHash}</code>
        </h3>
      )}
      {transactionError && (
        <h3 style={{ margin: 0 }}>
          Transaction error:{" "}
          <textarea
            style={{ width: "100%", height: 100, background: "white" }}
            value={transactionError}
            readOnly
          />
        </h3>
      )}

      <h3 style={{ margin: 0 }}>
        ALPH Balance: <code>{alphBalance?.balance && BigInt(alphBalance.balance)} ALPH</code>
      </h3>

      <div className="columns">
        <form onSubmit={handleTransferSubmit}>
          <h2 className={styles.title}>Alephium Token Faucet</h2>
          {
            faucetContractIdByGroup && Object.keys(faucetContractIdByGroup).map((group, index) => {
              return (<li key={index}>{faucetContractIdByGroup[`${group}`]} (Group {group})</li>)
            })
          }
          <label htmlFor="transfer-token-address">Token Address</label>
          <input
            type="text"
            id="transfer-to"
            name="tokenAddress"
            value={transferTokenId}
            disabled
          />
          <label htmlFor="transfer-amount">Amount</label>
          <input
            type="number"
            id="transfer-amount"
            name="amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
          <br />
          <input type="submit" disabled={buttonsDisabled} value="Send Me Token" />
        </form>
      </div >
    </>
  )
}
