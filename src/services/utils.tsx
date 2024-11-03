import { NetworkId } from "@alephium/web3";
import { loadDeployments } from "../../artifacts/ts/deployments"

export interface TokenFaucetConfig {
  network: NetworkId
  groupIndex: number
}

function getNetwork(): NetworkId {
  const network = (process.env.NEXT_PUBLIC_NETWORK ?? 'testnet') as NetworkId
  return network
}


function getTokenFaucetConfig(): TokenFaucetConfig {
  const network = getNetwork()
  const groupIndex = 0
  return { network, groupIndex }
}


export const tokenFaucetConfig = getTokenFaucetConfig()
