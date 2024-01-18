// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Pool} from "./Pool.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AddressProvider} from "./AddressProvider.sol";

contract PoolHelpers {
    address payable owner;

    AddressProvider public immutable ADDRESSES_PROVIDER;
    Pool public POOL;
    ERC20 private immutable DAI;


    constructor(address _addressProvider, address asset_) {
        ADDRESSES_PROVIDER = AddressProvider(_addressProvider);
        DAI = ERC20(asset_);
        owner = payable(msg.sender);
    }

    function setPool() public {
        POOL = Pool(ADDRESSES_PROVIDER.getPoolAddress());
    }

    function createSupply(address asset_, uint256 amount_, address onBehalfOf_, uint16 referralCode_) public {
        require(address(POOL) != address(0), "Pool address not set");
        POOL.supply(asset_, amount_, onBehalfOf_, referralCode_);
    }

    function getBalance(address _asset) public view returns (uint256) {
        return ERC20(_asset).balanceOf(address(this));
    }

    function approveLINK(
        uint256 _amount,
        address _poolContractAddress
    ) external returns (bool) {
        return DAI.approve(_poolContractAddress, _amount);
    }

    function allowanceDAI(
        address _poolContractAddress
    ) external view returns (uint256) {
        return DAI.allowance(address(this), _poolContractAddress);
    }
}
