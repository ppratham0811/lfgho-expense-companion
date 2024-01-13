// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// │      PoolAddressesProvider-Polygon      │ '0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0' │

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
// import "https://github.com/ppratham0811/gho-core/blob/main/src/contracts/facilitators/aave/tokens/GhoAToken.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LFGHOVault {
    // IPool public immutable POOL = IPool();

    constructor() {}

    function stakeAssets(address _tokenAddress, uint256 _amount) external {
        // fn which will add money to the liquidity pool and give GHO Token to the msg.sender guy
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = msg.sender;
        uint16 referralCode = 0;
        // POOL.deposit(asset, amount, onBehalfOf, referralCode);
    }
}
