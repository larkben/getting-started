import { NETWORK } from '../../configs/addresses'
import { connect } from '@alephium/get-extension-wallet'

export const silentConnectWallet = async (onDisconnected: () => Promise<void>) => {
  const windowAlephium = await connect({ showList: false })
  await windowAlephium?.enable({ onDisconnected, networkId: NETWORK })
  return windowAlephium
}

export const connectWallet = async (onDisconnected: () => Promise<void>) => {
  const windowAlephium = await connect({
    include: ['alephium']
  })

  await windowAlephium?.enable({
    onDisconnected,
    networkId: NETWORK
  })

  return windowAlephium
}
