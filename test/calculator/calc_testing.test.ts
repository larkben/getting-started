import { ALPH_TOKEN_ID, Address, NodeProvider, ONE_ALPH, contractIdFromAddress, fetchContractState, groupOfAddress, sleep, web3 } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { getSigners, mintToken, testAddress } from '@alephium/web3-test'
import { CalculatorInstance } from '../../artifacts/ts'
import { assert } from 'console'
import { addTenService, deployCalculator } from './calc_services'

const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 

describe('test add ten', () => {
  const groupIndex = groupOfAddress(testAddress)

  let calculatorTemplate: CalculatorInstance

  let lister: Address
  let buyer: PrivateKeyWallet[]

    beforeEach(async () => {
        buyer = await getSigners(2, ONE_ALPH * 100n, groupIndex)

        calculatorTemplate = (await deployCalculator()).contractInstance
    })

    test('add ten', async () => {
        const creator = buyer[0]
        const spender = buyer[1]

        // before
        let contractStateBefore = await nodeProvider.contracts.getContractsAddressState(calculatorTemplate.address)

        console.log(contractStateBefore)

        // sending tx to add 10 to the contract state
        let addTenTx = await addTenService(creator, calculatorTemplate)

        // after
        let contractStateAfter = await nodeProvider.contracts.getContractsAddressState(calculatorTemplate.address)

        console.log(contractStateAfter)

        // sending tx to add 10 to the contract state
        await addTenService(creator, calculatorTemplate)

        contractStateAfter = await nodeProvider.contracts.getContractsAddressState(calculatorTemplate.address)

        console.log(contractStateAfter)
    })
})