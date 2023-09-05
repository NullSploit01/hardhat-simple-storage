import { expect } from 'chai'
import { BaseContract, ContractTransactionResponse, Contract } from 'ethers'
import { ethers } from 'hardhat'

describe('Simple Storage', () => {
    let simpleStorageFactory
    let simpleStorage: BaseContract & {
        deploymentTransaction(): ContractTransactionResponse
    } & Omit<Contract, keyof BaseContract>

    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it('Should start with a value of 0', async () => {
        expect(await simpleStorage.retrieve()).to.equal(0)
    })

    it('Should update when we call the store function', async () => {
        await simpleStorage.store(13)
        expect(await simpleStorage.retrieve()).to.equal(13)
    })
})
