// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "../gho-contract/contracts/facilitators/aave/tokens/GhoAToken.sol";

contract LFGHOVault is ERC4626 {
    IPool public immutable POOL;
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    address payable owner;

    constructor(
        address _addressProvider,
        IERC20 _asset
    ) ERC4626(_asset) ERC20("LFGHOCoin", "LFCOIN") {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
        owner = payable(msg.sender);
    }

    // function stakeAssetToVault(address _token, uint256 _amount) external {}

    function stakeTokensToVault(
        address _tokenAddress,
        uint256 _amount
    ) external {
        // fn which will add money to the liquidity pool and give GHO Token to the msg.sender guy
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = msg.sender;
        uint16 referralCode = 0;
        POOL.deposit(asset, amount, onBehalfOf, referralCode);
    }

    function borrowGhoToken(address _tokenAddress, address _userAddress,uint256 _amount) external {
        address asset = _tokenAddress;
        address onBehalfOf = _userAddress;
        uint256 amount = _amount;
        uint16 referralCode = 0;
        uint256 interestRateMode = 0
        POOL.borrow(asset, amount, interestRateMode, referralCode, onBehalfOf);
    }

    function repayAndBurn() external {
      
    }
}
