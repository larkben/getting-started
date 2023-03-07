import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { groupOfAddress } from '@alephium/web3'
import { FaucetContractIdByGroup, getFaucetContractIdByGroup } from '../../configs/addresses'
import { withdrawToken } from '@/services/token.service'
import { TxStatus } from './TxStatus'
import { useContext } from '@alephium/web3-react'
import { node } from "@alephium/web3"

export const TokenDapp: FC<{
  address: string
  network?: string
}> = ({ address, network }) => {
  const context = useContext()
  const addressGroup = groupOfAddress(address)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawTokenId, setWithdrawTokenId] = useState('')
  const [faucetContractIdByGroup, setFaucetContractIdByGroup] = useState<FaucetContractIdByGroup>()
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  useEffect(() => {
    const faucetContractIdByGroup = getFaucetContractIdByGroup()
    if (!!faucetContractIdByGroup) {
      setFaucetContractIdByGroup(faucetContractIdByGroup)
      setWithdrawTokenId(faucetContractIdByGroup[`${addressGroup}`])
    }
  }, [])

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!!context.signerProvider) {
      const result = await withdrawToken(context.signerProvider, withdrawAmount, withdrawTokenId)
      setOngoingTxId(result.txId)
    }
  }

  const txStatusCallback = (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
    if (
      (status.type === 'Confirmed' && numberOfChecks > 2) ||
      (status.type === 'TxNotFound' && numberOfChecks > 3)
    ) {
      setOngoingTxId(undefined)
    }

    Promise.resolve()
  }

  console.log("ongoing..", ongoingTxId)
  return (
    <>
      {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}

      <div className="columns">
        <form onSubmit={handleWithdrawSubmit}>
          {faucetContractIdByGroup && Object.keys(faucetContractIdByGroup).length > 0 ? (
            <>
              <h2 className={styles.title}>Alephium Token Faucet on {network}</h2>
              <p>
                Since current address group is {addressGroup}, only token from {addressGroup} can be withdrawn.
              </p>
              <p>Maximum 2 tokens can be withdrawn at a time.</p>
              <table>
                <thead>
                  <tr>
                    <td>id</td>
                    <th>group</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(faucetContractIdByGroup).map((group, index) => {
                    if (addressGroup === parseInt(group)) {
                      return (
                        <tr key={index} style={{ background: 'red', color: 'white' }}>
                          <td>{faucetContractIdByGroup[parseInt(group)]}</td>
                          <td>{group}</td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={index} style={{ color: 'lightgrey' }}>
                          <td>{faucetContractIdByGroup[parseInt(group)]}</td>
                          <td>{group}</td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
              <label htmlFor="withdraw-amount">Amount</label>
              <input
                type="number"
                id="transfer-amount"
                name="amount"
                max="2"
                min="1"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <br />
              <input type="submit" disabled={!!ongoingTxId} value="Send Me Token" />
            </>
          ) : (
            <>
              No token faucet detected on {network}, please run <code>npx @alephium/cli deploy -n {network}</code> to
              deploy the token faucet contract.
            </>
          )}
        </form>
      </div>
    </>
  )
}
