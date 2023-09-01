import { ethers } from 'hardhat'

const main = async () => {
    const simpleStorageFactory =
        await ethers.getContractFactory('SimpleStorage')

    console.log('Deployments started...')
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    console.log(`Deployed to: ${simpleStorage.target}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
