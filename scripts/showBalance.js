const { ethers } = require('hardhat')

module.exports = async () => {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  const wallet = (await ethers.getSigners())[0]
  const balance = (await wallet.getBalance()).toString()
  console.log(`The address ${wallet.address} has ${balance} weibars`)
  //0x3cf0597e3c61b0e74505c691bff107e9f2831e61
  return balance
}
