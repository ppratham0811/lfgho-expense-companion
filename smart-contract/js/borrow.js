import { Pool, InterestRate } from "@aave/contract-helpers";
import { BigNumber, providers } from 'ethers';

const pool = new Pool(provider, {
    POOL: "0x3De59b6901e7Ad0A19621D49C5b52cC9a4977e52", // Goerli GHO market
    WETH_GATEWAY: "0x9c402E3b0D123323F0FCed781b8184Ec7E02Dd31", // Goerli GHO market
});

/*
- @param `user` The ethereum address that will receive the borrowed amount 
- @param `reserve` The ethereum address of the reserve asset 
- @param `amount` The amount to be borrowed, in human readable units (e.g. 2.5 ETH)
- @param `interestRateMode`//Whether the borrow will incur a stable (InterestRate.Stable) or variable (InterestRate.Variable) interest rate
- @param @optional `debtTokenAddress` The ethereum address of the debt token of the asset you want to borrow. Only needed if the reserve is ETH mock address 
- @param @optional `onBehalfOf` The ethereum address for which user is borrowing. It will default to the user address 
*/

async function submitTransaction({
    provider,  // Signing transactions requires a wallet provider, Aave UI currently uses web3-react (https://github.com/NoahZinsmeister/web3-react) for connecting wallets and accessing the wallet provider
    tx
}) {
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
        ...txData,
        value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
}



const txs = await pool.borrow({
    user: "0x3f93B8DCAf29D8B3202347018E23F76e697D8539",
    reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211", // Goerli GHO market
    amount: 1,
    interestRateMode,
    debtTokenAddress: "0x80aa933EfF12213022Fd3d17c2c59C066cBb91c7", // Goerli GHO market
    onBehalfOf,
    referralCode,
});