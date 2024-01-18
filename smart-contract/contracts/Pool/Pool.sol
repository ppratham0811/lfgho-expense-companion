// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// │      PoolAddressesProvider-Polygon    │'0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0' │

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "https://github.com/ppratham0811/gho-core/blob/main/src/contracts/facilitators/aave/tokens/GhoAToken.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {DataTypes} from "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";

contract Pool is IPool {
    // ERC20 immutable public token;
    
    // constructor(address _tokenAddress) {
    //     token = ERC20(_tokenAddress);
    // }

    mapping(address => uint256) shareHolders;

    function getPOOLBalance(address asset) public view returns(uint256) {
        return ERC20(asset).balanceOf(address(this));
    }

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external {
        ERC20(asset).transferFrom(onBehalfOf, address(this), amount);
    }

    function mintUnbacked(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external virtual {}

    function backUnbacked(
        address asset,
        uint256 amount,
        uint256 fee
    ) external virtual returns (uint256) {}

    function supplyWithPermit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external virtual {}

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external virtual returns (uint256) {}

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external virtual {}

    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external virtual returns (uint256) {}

    function repayWithPermit(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external virtual returns (uint256) {}

    function repayWithATokens(
        address asset,
        uint256 amount,
        uint256 interestRateMode
    ) external virtual returns (uint256) {}

    function swapBorrowRateMode(
        address asset,
        uint256 interestRateMode
    ) external virtual {}

    function rebalanceStableBorrowRate(address asset, address user) external {}

    function setUserUseReserveAsCollateral(
        address asset,
        bool useAsCollateral
    ) external virtual {}

    function liquidationCall(
        address collateralAsset,
        address debtAsset,
        address user,
        uint256 debtToCover,
        bool receiveAToken
    ) external virtual {}

    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata interestRateModes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external virtual {}

    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external virtual {}

    function getUserAccountData(
        address user
    )
        external virtual
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        ) {}

    function initReserve(
        address asset,
        address aTokenAddress,
        address stableDebtAddress,
        address variableDebtAddress,
        address interestRateStrategyAddress
    ) external virtual {}

    function dropReserve(address asset) external {}

    function setReserveInterestRateStrategyAddress(
        address asset,
        address rateStrategyAddress
    ) external virtual {}

    function setConfiguration(
        address asset,
        DataTypes.ReserveConfigurationMap calldata configuration
    ) external virtual override {}

    function getConfiguration(
        address asset
    ) external virtual view returns (DataTypes.ReserveConfigurationMap memory){}

    function getUserConfiguration(
        address user
    ) external virtual view returns (DataTypes.UserConfigurationMap memory){}

    function getReserveNormalizedIncome(
        address asset
    ) external virtual view returns (uint256){}

    function getReserveNormalizedVariableDebt(
        address asset
    ) external virtual view returns (uint256){}

    function getReserveData(
        address asset
    ) external virtual view returns (DataTypes.ReserveData memory){}

    function finalizeTransfer(
        address asset,
        address from,
        address to,
        uint256 amount,
        uint256 balanceFromBefore,
        uint256 balanceToBefore
    ) external virtual{}

    function getReservesList() external virtual view returns (address[] memory){}

    function getReserveAddressById(uint16 id) external view returns (address){}

    function ADDRESSES_PROVIDER()
        external virtual
        view
        override returns (IPoolAddressesProvider) {

        }

    function updateBridgeProtocolFee(uint256 bridgeProtocolFee) external virtual {}

    function updateFlashloanPremiums(
        uint128 flashLoanPremiumTotal,
        uint128 flashLoanPremiumToProtocol
    ) external virtual {}

    function configureEModeCategory(
        uint8 id,
        DataTypes.EModeCategory memory config
    ) external virtual {}

    function getEModeCategoryData(
        uint8 id
    ) external view virtual returns (DataTypes.EModeCategory memory) {}

    function setUserEMode(uint8 categoryId) external virtual {}

    function getUserEMode(address user) external view virtual returns (uint256) {}

    function resetIsolationModeTotalDebt(address asset) external virtual {}

    function MAX_STABLE_RATE_BORROW_SIZE_PERCENT()
        external virtual
        view
        returns (uint256) {}

    function FLASHLOAN_PREMIUM_TOTAL() external virtual view returns (uint128) {}

    function BRIDGE_PROTOCOL_FEE() external virtual view returns (uint256) {}

    function FLASHLOAN_PREMIUM_TO_PROTOCOL() external virtual view returns (uint128) {}

    function MAX_NUMBER_RESERVES() external virtual view returns (uint16) {}

    function mintToTreasury(address[] calldata assets) external virtual {}

    function rescueTokens(address token, address to, uint256 amount) external virtual{}

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external virtual {}

    // function createSupply(address _tokenAddress, uint256 _amount) external {
    //     address asset = _tokenAddress;
    //     uint256 amount = _amount;
    //     address onBehalfOf = address(this);
    //     uint16 referralCode = 0;
    //     this.supply(asset, amount, onBehalfOf, referralCode);
    // }

    // function returnStakedAssets(
    //     address _tokenAddress,
    //     uint256 _amount
    // ) external returns (uint256) {
    //     address asset = _tokenAddress;
    //     uint256 amount = _amount;
    //     address to = msg.sender;
    //     return this.withdraw(asset, amount, to);
    // }

    // function stakeToSupply(address _token, uint256 _amount) public {
    //     address asset = _token;
    //     uint256 amount = _amount;
    //     address onBehalfOf = msg.sender;
    //     uint16 referralCode = 0;
    //     deposit(asset, amount, onBehalfOf, referralCode);
    // }
}
