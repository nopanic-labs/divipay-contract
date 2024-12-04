const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('SplitWiseGroup contract', function () {
  let owner, member1, member2, member3, member4, member5, splitWiseGroup

  const REQUIRED_HBAR_AMOUNT = '0.01'

  before(async function () {
    const signers = await ethers.getSigners()
    owner = signers[0]
    member1 = signers[1]
    member2 = signers[2]
    member3 = signers[3]
    member4 = signers[4]
    member5 = signers[5]

    const SplitWiseGroup = await ethers.getContractFactory(
      'SplitWiseGroup',
      owner
    )
    splitWiseGroup = await SplitWiseGroup.deploy(
      ethers.utils.parseUnits(REQUIRED_HBAR_AMOUNT, 8),
      [member1.address, member2.address, member3.address, member4.address],
      owner.address
    )
    await splitWiseGroup.deployed()
  })

  describe('Deployment', function () {
    it('Should set the owner correctly', async function () {
      expect(await splitWiseGroup.owner()).to.equal(owner.address)
    })

    it('Should set the required amount correctly', async function () {
      expect(
        ethers.utils.formatUnits(await splitWiseGroup.requiredAmount(), 8)
      ).to.equal(REQUIRED_HBAR_AMOUNT)
    })

    it('Should initialize with isOpen as true', async function () {
      expect(await splitWiseGroup.isSettled()).to.equal(false)
    })

    it('Should add owner as active member during deployment', async function () {
      expect(await splitWiseGroup.isMember(owner.address)).to.equal(true)
      expect(await splitWiseGroup.getActiveMember(0)).to.equal(owner.address)
    })

    it('Should add members to the whitelist during deployment', async function () {
      expect(await splitWiseGroup.isWhitelisted(member1.address)).to.equal(true)
      expect(await splitWiseGroup.isWhitelisted(member2.address)).to.equal(true)
    })
  })

  //   describe('Joining the group', function () {
  //     it('Should allow members to join the group with the required amount', async function () {
  //       await splitWiseGroup
  //         .connect(member1)
  //         .join({ value: ethers.utils.parseEther('1') })
  //       await splitWiseGroup
  //         .connect(member2)
  //         .join({ value: ethers.utils.parseEther('1') })
  //       await splitWiseGroup
  //         .connect(member4)
  //         .join({ value: ethers.utils.parseEther('1') })

  //       expect(await splitWiseGroup.isMember(member1.address)).to.equal(true)
  //       expect(await splitWiseGroup.isMember(member2.address)).to.equal(true)
  //       expect(await splitWiseGroup.isMember(member4.address)).to.equal(true)
  //     })

  //     it('Should not allow members to join without sending the required amount', async function () {
  //       await expect(
  //         splitWiseGroup
  //           .connect(member3)
  //           .join({ value: ethers.utils.parseEther('0.5') })
  //       ).to.be.revertedWith('You must send the required amount to join')
  //     })

  //     it('Should not allow members to join if already a member', async function () {
  //       await expect(
  //         splitWiseGroup
  //           .connect(member1)
  //           .join({ value: ethers.utils.parseEther('1') })
  //       ).to.be.revertedWith('You are already a member')
  //     })
  //   })

  //   describe('Add expenses to the group', function () {
  //     it('should allow the owner to add an expense', async function () {
  //       const name = 'Test Expense'
  //       const amount = ethers.utils.parseEther('1.0')

  //       // Call the addExpense function
  //       await splitWiseGroup.addExpense(
  //         member1.address,
  //         name,
  //         [member2.address, member3.address],
  //         amount
  //       )

  //       const expensesLength = await splitWiseGroup.expensesLength()

  //       // Get the last added expenses
  //       const lastExpense = await splitWiseGroup.getExpense(expensesLength - 1)

  //       const debt1to2 = await splitWiseGroup.getDebt(
  //         member1.address,
  //         member2.address
  //       )
  //       const debt1to3 = await splitWiseGroup.getDebt(
  //         member1.address,
  //         member3.address
  //       )
  //       const debt2to1 = await splitWiseGroup.getDebt(
  //         member2.address,
  //         member1.address
  //       )
  //       const debt2to3 = await splitWiseGroup.getDebt(
  //         member2.address,
  //         member3.address
  //       )
  //       const debt3to1 = await splitWiseGroup.getDebt(
  //         member3.address,
  //         member1.address
  //       )
  //       const debt3to2 = await splitWiseGroup.getDebt(
  //         member3.address,
  //         member2.address
  //       )

  //       expect(debt1to2).to.equal(0)
  //       expect(debt1to3).to.equal(0)
  //       expect(debt2to1).to.equal(amount.div(2))
  //       expect(debt2to3).to.equal(0)
  //       expect(debt3to1).to.equal(amount.div(2))
  //       expect(debt3to2).to.equal(0)

  //       // Assert that the expense data matches the input
  //       expect(lastExpense.payer).to.equal(member1.address)
  //       expect(lastExpense.name).to.equal(name)
  //       expect(lastExpense.amount).to.equal(amount)
  //       expect(lastExpense.debtor_addresses).to.deep.equal([
  //         member2.address,
  //         member3.address
  //       ])

  //       const amount2 = ethers.utils.parseEther('2.0')

  //       // Call the addExpense function
  //       await splitWiseGroup.addExpense(
  //         member2.address,
  //         name,
  //         [member1.address, member3.address],
  //         amount2
  //       )

  //       debt1to2 = await splitWiseGroup.getDebt(member1.address, member2.address)
  //       debt1to3 = await splitWiseGroup.getDebt(member1.address, member3.address)
  //       debt2to1 = await splitWiseGroup.getDebt(member2.address, member1.address)
  //       debt2to3 = await splitWiseGroup.getDebt(member2.address, member3.address)
  //       debt3to1 = await splitWiseGroup.getDebt(member3.address, member1.address)
  //       debt3to2 = await splitWiseGroup.getDebt(member3.address, member2.address)
  //       console.log(
  //         debt1to2.toString(),
  //         debt1to3.toString(),
  //         debt2to1.toString(),
  //         debt2to3.toString(),
  //         debt3to1.toString(),
  //         debt3to2.toString()
  //       )
  //       expect(
  //         debt1to2,
  //         'Debt from member1 to member2 should be 0.5 ETH'
  //       ).to.equal(ethers.utils.parseEther('0.5'))
  //       expect(debt1to3, 'Debt from member1 to member2 should be 0').to.equal(0)
  //       expect(debt2to1, 'Debt from member2 to member1 should be 0').to.equal(0)
  //       expect(debt2to3, 'Debt from member2 to member3 should be 0').to.equal(0)
  //       expect(
  //         debt3to1,
  //         'Debt from member3 to member1 should be 0.5 ETH'
  //       ).to.equal(ethers.utils.parseEther('0.5'))
  //       expect(
  //         debt3to2,
  //         'Debt from member3 to member2 should be 1.0 ETH'
  //       ).to.equal(ethers.utils.parseEther('1.0'))
  //     })
  //   })

  //   describe('Remove members from the group', function () {
  //     it('Should allow the owner to remove an active member', async function () {
  //       // Ensure member1 is an active member
  //       expect(await splitWiseGroup.isMember(member4.address)).to.be.true

  //       // Get the initial length of the activeMembers array
  //       const initialActiveMembersLength =
  //         await splitWiseGroup.getActiveMembersCount()

  //       // Remove member4 from the group
  //       await splitWiseGroup.removeMember(member4.address)

  //       // Ensure member4 is no longer an active member
  //       expect(await splitWiseGroup.isMember(member4.address)).to.be.false

  //       // Check if member4's stake is cleared
  //       expect(await splitWiseGroup.stakes(member4.address)).to.equal(0)

  //       // Check if member4 is removed from the activeMembers array
  //       const finalActiveMembersLength =
  //         await splitWiseGroup.getActiveMembersCount()
  //       expect(finalActiveMembersLength).to.equal(
  //         initialActiveMembersLength.sub(1)
  //       )
  //     })

  //     it('Should not allow the owner to remove a non-member address', async function () {
  //       // Attempt to remove the owner (deployer)
  //       await expect(
  //         splitWiseGroup.removeMember(member5.address)
  //       ).to.be.revertedWith('The address is not a member')

  //       // Ensure the owner is still an active member
  //       expect(await splitWiseGroup.isMember(member5.address)).to.be.false
  //     })

  //     it('Should not allow non-owners to remove a member', async function () {
  //       // Attempt to remove member2 as a non-owner (member1)
  //       await expect(
  //         splitWiseGroup.connect(member1).removeMember(member2.address)
  //       ).to.be.revertedWith('Only the owner can call this function')

  //       // Ensure member2 is still an active member
  //       expect(await splitWiseGroup.isMember(member2.address)).to.be.true
  //     })
  //   })

  //   describe('Settling the group', function () {
  //     it('Should allow the owner to settle the group and distribute evenly', async function () {
  //       const tx = await splitWiseGroup.settleGroup()

  //       await expect(tx).to.changeEtherBalance(
  //         member1,
  //         ethers.utils.parseEther('1')
  //       )
  //       await expect(tx).to.changeEtherBalance(
  //         member2,
  //         ethers.utils.parseEther('1')
  //       )
  //       expect(await splitWiseGroup.isSettled()).to.equal(true)
  //     })

  //     it('Should not allow settling the group multiple times', async function () {
  //       await expect(splitWiseGroup.settleGroup()).to.be.revertedWith(
  //         'The group is already settled'
  //       )
  //     })
  //   })

  //   describe('Transfer from group', function () {
  //     it('should transfer funds from the contract to the recipient', async function () {
  //       const initialBalance = await member3.getBalance()
  //       const amountToSend = ethers.utils.parseEther('0.25') // Amount to send in Ether

  //       // Send some Ether to the contract
  //       await member5.sendTransaction({
  //         value: ethers.utils.parseEther('0.5'),
  //         to: splitWiseGroup.address
  //       })

  //       // Check the contract's balance before the transfer
  //       const contractBalanceBefore = await ethers.provider.getBalance(
  //         splitWiseGroup.address
  //       )

  //       expect(contractBalanceBefore).to.equal(ethers.utils.parseEther('0.5'))

  //       // Call the transfer function
  //       await splitWiseGroup.transfer(amountToSend, member3.address)

  //       // Check the contract's balance after the transfer
  //       const contractBalanceAfter = await ethers.provider.getBalance(
  //         splitWiseGroup.address
  //       )

  //       expect(contractBalanceAfter).to.equal(ethers.utils.parseEther('0.25')) // The contract balance should be empty after the transfer

  //       // Check the recipient's balance after the transfer
  //       const recipientBalanceAfter = await member3.getBalance()

  //       expect(recipientBalanceAfter).to.equal(initialBalance.add(amountToSend)) // Recipient's balance should have increased by the transferred amount
  //     })

  //     it('should revert if the contract has no balance', async function () {
  //       await expect(
  //         splitWiseGroup.transfer(ethers.utils.parseEther('1'), member5.address)
  //       ).to.be.revertedWith('Group has not enough balance')
  //     })
  //   })
})
