// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IPool } from "https://github.com/aave/aave-v3-core/contracts/interfaces/IPool.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract PoolBorrow {
    IPool public immutable POOL = IPool(0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951);
    address private linkAddress =
            0x779877A7B0D9E8603169DdbD7836e478b4624789;
    IERC20 private link = IERC20(linkAddress);
    address payable owner;
    constructor (){
        owner =  payable (msg.sender);
    }


    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;

        POOL.supply(asset, amount, onBehalfOf, referralCode);
    }

    function borrowGHO(uint256 amount) public {
        // POOL.borrow(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60, amount, 2, 0, 0x3f93B8DCAf29D8B3202347018E23F76e697D8539);
        POOL.borrow(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60, amount, 2, 0, 0xA1008b78e3D1DAb9580F90d1eAEb6F1592C101cD);
    }

    function transferToMetamask(uint256 _amount) public {
        IERC20 ghoTokenAddress = IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60);
        require(ghoTokenAddress.balanceOf(address(this)) >= _amount, "Insufficient DAI balance");
        ghoTokenAddress.transfer(0xA1008b78e3D1DAb9580F90d1eAEb6F1592C101cD, _amount);
    }
    // function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
    //     address asset = _tokenAddress;
    //     uint256 amount = _amount;
    //     address onBehalfOf = address(this);
    //     uint16 referralCode = 0;

    //     POOL.supply(asset, amount, onBehalfOf, referralCode);
    // }

    // function withdrawlLiquidity(address _tokenAddress, uint256 _amount)
    //     external
    //     returns (uint256)
    // {
    //     address asset = _tokenAddress;
    //     uint256 amount = _amount;
    //     address to = address(this);

    //     return POOL.withdraw(asset, amount, to);
    // }

    // function getUserAccountData(address _userAddress)
    //     external
    //     view
    //     returns (
    //         uint256 totalCollateralBase,
    //         uint256 totalDebtBase,
    //         uint256 availableBorrowsBase,
    //         uint256 currentLiquidationThreshold,
    //         uint256 ltv,
    //         uint256 healthFactor
    //     )
    // {
    //     return POOL.getUserAccountData(_userAddress);
    // }

    // function approveLINK(uint256 _amount, address _poolContractAddress)
    //     external
    //     returns (bool)
    // {
    //     return link.approve(_poolContractAddress, _amount);
    // }

    // function allowanceLINK(address _poolContractAddress)
    //     external
    //     view
    //     returns (uint256)
    // {
    //     return link.allowance(address(this), _poolContractAddress);
    // }

    function getBalance() external view returns (uint256) {
        return IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60).balanceOf(address(this));
    }

    // function withdraw() external {
    //     IERC20 token = IERC20(0xc4bF5CbDaBE595361438F8c6a187bDc330539c60);
    //     token.transfer(msg.sender, token.balanceOf(address(this)));
    // }

    // modifier onlyOwner() {
    //     require(
    //         msg.sender == owner,
    //         "Only the contract owner can call this function"
    //     );
    //     _;
    // }

    // receive() external payable {}
}
  