const { ethers } = require('hardhat')

module.exports = async () => {
  let signers = await ethers.getSigners()
  wallet = signers[0]
  member1 = signers[1]
  member2 = signers[2]
  member3 = signers[3]
  member4 = signers[4]
  member5 = signers[5]

  const SplitWiseGroup = await ethers.getContractFactory(
    'SplitWiseGroup',
    wallet
  )
  const splitWiseGroup = await SplitWiseGroup.deploy(
    ethers.utils.parseUnits('1', 8),
    [member1.address, member2.address, member3.address, member4.address],
    wallet.address
  )

  const contractAddress = (await splitWiseGroup.deployTransaction.wait())
    .contractAddress

  console.log(`splitWiseGroup deployed to: ${contractAddress}`)

  return contractAddress
}
