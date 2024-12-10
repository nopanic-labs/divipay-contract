require('@nomicfoundation/hardhat-toolbox')
require('@nomicfoundation/hardhat-chai-matchers')
require('@nomiclabs/hardhat-ethers')
// Import dotenv module to access variables stored in the .env file
require('dotenv').config()

task('deploy-contract', async () => {
  const deployContract = require('./scripts/deploy')
  return deployContract()
})

const member1_pk =
  '0xdc7870e04f639d77beffb18bae38e0cbd0b79e4181ea87bf9eddfc1fda68607f'
const member2_pk =
  '0x499be1771c3f74265b44ea92eb770d5e9fe35722f3a9f416ca8de2ebb249d952'
const member3_pk =
  '0x10fae7b89527f895f309eec48ab2f29d57f2ffd0f10abc628b6ad1d0fb17dcba'
const member4_pk =
  '0xb4654d5024ecd7f31f732a95f432c6855fff33e7e3b8b4393ff791b95a28e90f'
const member5_pk =
  '0xeef3cf2ed6ebab10ad79f0e3135d5b46353acc8560c87092820168f2d572c928'

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
