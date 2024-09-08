import { Configuration } from '@alephium/cli'
import { Number256 } from '@alephium/web3'

const dotenv = require('dotenv');
dotenv.config()

export type Settings = {
  commissionRate: number // basis point. e.g. 200: 2%
}

export function loadSettings(network: 'devnet' | 'testnet' | 'mainnet'): { commissionRate: number } {
  return {
    commissionRate: 100, // 1%
  }
}

const configuration: Configuration<Settings> = {
  deploymentScriptDir: 'scripts',
  compilerOptions: {
    errorOnWarnings: false,
    ignoreUnusedConstantsWarnings: false,
  },

  networks: {
    devnet: {
      networkId: 4,
      nodeUrl: 'http://localhost:22973',
      privateKeys: [
        'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'
      ],
      confirmations: 1,
      settings: loadSettings('devnet')
    },

    testnet: {
      nodeUrl: process.env.NODE_URL as string ?? 'https://wallet-v20.testnet.alephium.org',
      privateKeys: process.env.key === undefined ? [] : process.env.key.split(','),
      confirmations: 2,
      settings: loadSettings('testnet')
    },

    mainnet: {
      nodeUrl: process.env.NODE_URL as string ?? 'https://wallet-v20.testnet.alephium.org',
      privateKeys: process.env.prodkey === undefined ? [] : process.env.prodkey.split(','),
      confirmations: 2,
      settings: loadSettings('mainnet')
    }
  }
}

export default configuration