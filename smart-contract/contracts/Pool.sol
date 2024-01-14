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

contract Pool {
    IERC20 private GhoTokenAddress =
        IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60);

    IPool public immutable POOL;

    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;

    constructor() {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(
            0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0
        );
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
    }

    function createSupply(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;
        POOL.supply(asset, amount, onBehalfOf, referralCode);
    }

    function returnStakedAssets(
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = msg.sender;
        return POOL.withdraw(asset, amount, to);
    }

    function stakeToSupply(address _token, uint256 _amount) {
        address asset = _token;
        uint256 amount = _amount;
        address onBehalfOf = msg.sender;
        uint16 referralCode = 0;
        POOL.deposit(asset, amount, onBehalfOf, referralCode);
    }
}
