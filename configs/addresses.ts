export const NETWORK: string = process.env.NEXT_PUBLIC_NETWORK || 'devnet'

import mainnet from '../.deployments.mainnet.json'
import testnet from '../.deployments.testnet.json'
import devnet from '../.deployments.devnet.json'

export type FaucetContractIdByGroup = {
  [Key in number]: string
}

export function getFaucetContractIdByGroup(): FaucetContractIdByGroup {
  const deploymentFile: any = NETWORK === 'mainnet' ? mainnet : NETWORK === 'testnet' ? testnet : devnet

  const contractIdByGroup: FaucetContractIdByGroup = {}
  Object.keys(deploymentFile).forEach((key) => {
    contractIdByGroup[parseInt(key)] = deploymentFile[key]?.deployContractResults.TokenFaucet.contractId
  })

  return contractIdByGroup
}
