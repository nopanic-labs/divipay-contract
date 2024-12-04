require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-chai-matchers')
require('@nomiclabs/hardhat-ethers')
// Import dotenv module to access variables stored in the .env file
require('dotenv').config()

// Define Hardhat tasks here, which can be accessed in our test file (test/rpc.js) by using hre.run('taskName')
task('show-balance', async () => {
  const showBalance = require('./scripts/showBalance')
  return showBalance()
})

task('deploy-contract', async () => {
  const deployContract = require('./scripts/deployContract')
  return deployContract()
})

task('contract-view-call', async taskArgs => {
  const contractViewCall = require('./scripts/contractViewCall')
  return contractViewCall(taskArgs.contractAddress)
})

task('contract-call', async taskArgs => {
  const contractCall = require('./scripts/contractCall')
  return contractCall(taskArgs.contractAddress, taskArgs.msg)
})

const member1_pk =
  '0xef8744144e4e7591d70c0925f4fa9565dccdf16c5f52e8747070c19ed68ed78a'
const member2_pk =
  '0x7f470836d8e5b493dbc22d6e335ed06e89b9a468c7622cccffe4ae5f1fe10160'
const member3_pk =
  '0xb1e95edd00bfa0f270acca42cc2eeeb65d967da3dca3f649f74a1caec19ca2b2'
const member4_pk =
  '0xc418c721203d3db43a661a7f8682710bd1d9bcfbe18e9a1a0ba3e53693a540ec'
const member5_pk =
  '0x85a38a819d745e5e437c3425584e6eba8df2bbff52a6c83ef0dbea6d4e304f6e'

module.exports = {
  mocha: {
    timeout: 3600000
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 500
      }
    }
  },
  defaultNetwork: 'testnet',
  networks: {
    testnet: {
      url: process.env.TESTNET_ENDPOINT,
      accounts: [
        process.env.TESTNET_OPERATOR_PRIVATE_KEY,
        member1_pk,
        member2_pk,
        member3_pk,
        member4_pk,
        member5_pk
      ]
    }

    /**
     * Uncomment the following to add a mainnet network configuration
     */
    //   mainnet: {
    //     // HashIO mainnet endpoint from the MAINNET_ENDPOINT variable in the .env file
    //     url: process.env.MAINNET_ENDPOINT,
    //     // Your ECDSA account private key pulled from the .env file
    //     accounts: [process.env.MAINNET_OPERATOR_PRIVATE_KEY],
    // },
  }
}
