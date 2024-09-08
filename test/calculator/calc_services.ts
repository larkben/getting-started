import {
    ALPH_TOKEN_ID,
    Address,
    DUST_AMOUNT,
    HexString,
    NodeProvider,
    ONE_ALPH,
    SignerProvider,
    addressVal,
    binToHex,
    byteVecVal,
    encodePrimitiveValues,
    groupOfAddress,
    hexToBinUnsafe,
    prettifyAttoAlphAmount,
    stringToHex,
    u256Val,
    web3
  } from '@alephium/web3'
  import { randomBytes } from 'crypto'
  import * as blake from 'blakejs'
  import { PrivateKeyWallet } from '@alephium/web3-wallet'
  import { testPrivateKey } from '@alephium/web3-test'
  import { AddTen, Calculator, CalculatorInstance } from '../../artifacts/ts'
  import { off } from 'process'
  import { ValByteVec } from '@alephium/web3/dist/src/api/api-alephium'
  import { MinimalContractDeposit } from '@alephium/web3/dist/src/codec'
  
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
  export const ZERO_ADDRESS = 'tgx7VNFoP9DJiFMFgXXtafQZkUvyEdDHT9ryamHJYrjq'
  export const defaultSigner = new PrivateKeyWallet({ privateKey: testPrivateKey })
  
  const nodeProvider = new NodeProvider('http://127.0.0.1:22973') 
  
  // calculator template
  export async function deployCalculator() {
    return await Calculator.deploy(defaultSigner, {
      initialFields: {
          admin: defaultSigner.account.address,
          calculation: 0n
      }
    })
  }

  // add ten template
  export async function addTenService(
    signer: SignerProvider,
    calc: CalculatorInstance
    ) {
    return await AddTen.execute(signer, {
      initialFields: {
        calc: calc.contractId
      },
      attoAlphAmount: DUST_AMOUNT,
    })
  }