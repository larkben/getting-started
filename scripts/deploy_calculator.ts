import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Calculator } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployCalculator: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings
  const result = await deployer.deployContract(Calculator, {
    initialFields: {
      admin: deployer.account.address,
      calculation: 0n
    }
  })
  console.log('Calculator contract id: ' + result.contractInstance.contractId)
  console.log('Calculator contract address: ' + result.contractInstance.address)
}

export default deployCalculator
