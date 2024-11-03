import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { ONE_ALPH, ZERO_ADDRESS } from '@alephium/web3'
import { loadDeployments } from '../artifacts/ts/deployments'
import { WrappedWangProtocol } from '../artifacts/ts'

const zero = BigInt(0)

const deployNFTTemplate: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const result = await deployer.deployContract(WrappedWangProtocol, {
    initialFields: {
      wwang: '05fceaf3d6f0e5e3ebce239f6c5503d42f9595ee4dcb1c8f21965f089e4b9600',
      wwangamount: 0n,
      owner: deployer.account.address,
      wang: 'c1aeea313e36454f35beaf40130c9219faa40ba645aff93e16429146039f8202',
      wangamount: 0n,
      fee: 100000000000000000n, // 0.1 alph fee
      feescollected: 0n
    }
  })
  const contractId = result.contractInstance.contractId
  const contractAddress = result.contractInstance.address
  console.log(`WW address: ${contractAddress}, contract id: ${contractId}`)
}

export default deployNFTTemplate