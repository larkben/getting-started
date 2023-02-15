import { useTxStatus } from '@alephium/web3-react'
import { useState } from 'react'

interface TxStatusAlertProps {
  txId: string
}

export const TxStatus = ({ txId }: TxStatusAlertProps) => {
  const [show, setShow] = useState(true)

  let numberOfChecks = 0
  const { txStatus } = useTxStatus(txId, (status) => {
    numberOfChecks = numberOfChecks + 1

    if ((status.type === 'Confirmed' && numberOfChecks > 2) || (status.type === 'TxNotFound' && numberOfChecks > 3)) {
      setShow(false)
    }

    return Promise.resolve()
  })

  return show ? (
    <>
      <h3 style={{ margin: 0 }}>
        Transaction status: <code>{txStatus?.type || 'unknown'}</code>
      </h3>
      <h3 style={{ margin: 0 }}>
        Transaction hash: <code>{txId}</code>
      </h3>
    </>
  ) : (
    <></>
  )
}
