
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.0009"),
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    /*
    * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    )
    console.log(
        "Contract balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    let waveTxn = await waveContract.wave("1 sending message");
    await waveTxn.wait(); // Wait for the transaction to be mined

    let waveTxn2 = await waveContract.wave("2 sending message");
    await waveTxn2.wait(); // Wait for the transaction to be mined

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await waveContract.connect(randomPerson).wave("Second message");
    // await waveTxn.wait();

    /*
    * Get Contract balance
    */
    contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    )
    console.log(
        "Contract balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)

    } catch(err) {
        console.log(err);
        process.exit(1)
    }
}

runMain();
