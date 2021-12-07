# NFighT

## _Mint NFT, trade it and play!_

NFight is a web dapp based on the Ethereum blockchain.

![](https://img.shields.io/github/issues/bsisic/nfight)
![](https://img.shields.io/github/forks/bsisic/nfight)
![](https://img.shields.io/github/stars/bsisic/nfight)
![](https://img.shields.io/github/license/bsisic/nfight)

![Alt text](/screens/NFighT-MARKET.png?raw=true "NFighT Market")
![Alt text](/screens/NFighT-MINT.png?raw=true "NFighT Mint")
![Alt text](/screens/NFighT-NETWORK.png?raw=true "NFighT Network")

## Features

- wallet binding (Metamask)
- mint NFT (import images and create unique assets)
- buy/sell/trade on an open market

## Tech

NFighT is created with :

- Next.js
- Solidity
- Hardhat
- Ether.js
- IPFS
- Storybook

## Installation

NFighT requires [Node.js](https://nodejs.org/) v12+ to run.

Clone, install the dependencies.

```sh
git clone git@github.com:bsisic/nfight.git
cd nfight
npm i
```

Configure
at the root of the project run:
```sh
touch .secret
touch config.js
```

add your raw private key in .secret file
and
copy/paste this in your config.js file

```
export const nftmarketaddress = ""
export const nftaddress = ""
```

open your terminal and run the following command to spin up a local network

```
npx hardhat node
```
this should create a local network with 19 accounts

then, keep the node running and in a new terminal window run

```
npx hardhat run scripts/deploy.js --network localhost
```
fill the empty strings in the config.js file with the contract addresses printed out by the CLI

add some of the accounts in your Metamask extension and start your app with :

```
npm run dev
```

## Test 

/test

```
npx hardhat test
```

## To do

- [ ] dockerize
- [ ] production cloud deploy (gcp/k8s)
- [ ] create the NFT card generator 
- [ ] add the playground UI
- [ ] setup the pvp system

## License

MIT
