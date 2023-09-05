import { ethers, network, run } from 'hardhat'

const main = async () => {
    const simpleStorageFactory =
        await ethers.getContractFactory('SimpleStorage')

    console.log('Deployments started...')
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    console.log(`Deployed to: ${simpleStorage.target}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction()?.wait(6)
        await verify(simpleStorage.target, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue.toString()}`)

    // update current value
    const tx = await simpleStorage.store(13)
    await tx.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value: ${updatedValue.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

const verify = async (contractAddress: any, args: any) => {
    console.log('Verify contract...')

    try {
        run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err: any) {
        if (err.message.includes('Contract source code already verified')) {
            console.log('Contract source code already verified')
        } else {
            console.log('Error verifying contract:', err)
        }
    }
}
