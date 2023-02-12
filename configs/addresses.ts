export const NETWORK: string = process.env.NEXT_PUBLIC_NETWORK || 'devnet'

import mainnet from '../.deployments.mainnet.json'
import testnet from '../.deployments.testnet.json'
import devnet from '../.deployments.devnet.json'

export type FaucetContractIdByGroup = {
  [Key in number]: string
}

export function getFaucetContractIdByGroup(): FaucetContractIdByGroup {
  const deploymentFile = NETWORK === 'mainnet' ? mainnet : NETWORK === 'testnet' ? testnet : devnet

  const contractIdByGroup = {}
  Object.keys(deploymentFile).forEach((key) => {
    contractIdByGroup[`${key}`] = deploymentFile[key]?.deployContractResults.TokenFaucet.contractId
  })

  return contractIdByGroup
}
