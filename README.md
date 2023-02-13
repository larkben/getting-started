This is a Alephium template project for the
[Next.js](https://nextjs.org/) framework, it is bootstrapped with the
following command:

```
npx @alephium/cli init $project-name --template nextjs
```

This template project demonstrates how to implement a simple token
faucet and expose it with a Web UI using Next.js.

## Getting Started

First, deploy the token faucet contract:

```bash
# In this case devnet
npx @alephium/cli deploy -n devnet
```

This will deploy the token faucet contracts to all of the 4 groups on
devnet.

After the token faucet contracts are deployed, run the development
server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
to see the token faucet application.

Download the [Alephium Extension Wallet](https://github.com/alephium/extension-wallet)
to interact with the application.

## Learn More

To learn more about smart contract development on Alephium, take a
look at the following resources:

- [Alephium Web3 SDK Guide](https://docs.alephium.org/dapps/alephium-web3/) - Learn about Alephium Web3 SDK
- [Ralph Language](https://nextjs.org/learn) - A guide to the Ralph programming language

You can check out the [Alephium GitHub
repositories](https://github.com/alephium) for more information - your
feedback and contributions are welcome!
