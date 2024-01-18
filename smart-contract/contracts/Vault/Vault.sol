// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// import "../../gho-contract/contracts/gho/GhoToken.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
// import "../../gho-contract/contracts/facilitators/aave/tokens/GhoAToken.sol";
import "https://github.com/jaydeepdey03/gho-contract/blob/main/contracts/gho/interfaces/IGhoToken.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";

contract Vault is ERC4626, IGhoToken {
    IPool public immutable POOL;
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    address payable owner;

    mapping(address => uint256) public shareHolders;

    mapping(address => Facilitator) _facilitatorsList;
    mapping(address => bool) _allowedFacilitators;

    // struct Facilitator {
    //     uint128 bucketCapacity;
    //     uint128 bucketLevel;
    //     string label;
    // }

    constructor(
        address _addressProvider,
        IERC20 _asset
    ) ERC4626(_asset) ERC20("LFGHOCoin", "LFCOIN") {
        ADDRESSES_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(ADDRESSES_PROVIDER.getPool());
        owner = payable(msg.sender);
    }

    function mintGHO(address requester, uint256 amount) private {
        address facilitator = msg.sender;
        require(_allowedFacilitators[facilitator], "You are not a facilitator");
        uint256 shares = amount;
        address receiver = requester;
        mint(shares, receiver);
    }

    function stakeTokensToVault(
        address _tokenAddress,
        uint256 _amount,
        address _onBehalfOf
    ) external payable {
        // fn which will add money to the vault and give GHO Token to the msg.sender guy
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = _onBehalfOf;
        uint16 referralCode = 0;
        POOL.deposit(asset, amount, onBehalfOf, referralCode);
        mintGHO(msg.sender, amount);
    }

    // function mint(address r, uint256 a) external override {}

    function burn(uint256 amount) external override {}

    function borrowGhoToken(
        address _tokenAddress,
        address _userAddress,
        uint256 _amount
    ) external {
        address asset = _tokenAddress;
        address onBehalfOf = _userAddress;
        uint256 amount = _amount;
        uint16 referralCode = 0;
        uint256 interestRateMode = 0;

        _mint(onBehalfOf, amount);
        // POOL.borrow(asset, amount, interestRateMode, referralCode, onBehalfOf);
    }

    function addFacilitator(
        address facilitatorAddress,
        string calldata facilitatorLabel,
        uint128 bucketCapacity
    ) external {
        Facilitator memory facilitator;
        facilitator.bucketCapacity = bucketCapacity;
        facilitator.label = facilitatorLabel;
        facilitator.bucketLevel = 1;
        _facilitatorsList[facilitatorAddress] = facilitator;
        _allowedFacilitators[facilitatorAddress] = true;
    }

    function removeFacilitator(address facilitatorAddress) external {
        // Facilitator memory facilitator;
        // _facilitatorsList[facilitatorAddress] = facilitator;
        _allowedFacilitators[facilitatorAddress] = false;
    }

    function setFacilitatorBucketCapacity(
        address facilitator,
        uint128 newCapacity
    ) external {}

    function getFacilitator(
        address facilitator
    ) external view returns (Facilitator memory) {
        return _facilitatorsList[facilitator];
    }

    function getFacilitatorBucket(
        address facilitator
    ) external view returns (uint256, uint256) {
        return (
            _facilitatorsList[facilitator].bucketCapacity,
            _facilitatorsList[facilitator].bucketLevel
        );
    }

    // function allowance() override public {}

    // function approve() override public {}

    // function balanceOf() override public {}

    // function totalSupply() override view public {}

    // function transfer() override public {}

    // function transferFrom() override public {}

    function hasRole(
        bytes32 role,
        address account
    ) external view override returns (bool) {}

    function getRoleAdmin(
        bytes32 role
    ) external view override returns (bytes32) {}

    function grantRole(bytes32 role, address account) external override {}

    function revokeRole(bytes32 role, address account) external override {}

    function renounceRole(
        bytes32 role,
        address callerConfirmation
    ) external override {}

    function FACILITATOR_MANAGER_ROLE()
        external
        pure
        override
        returns (bytes32)
    {}

    function BUCKET_MANAGER_ROLE() external pure override returns (bytes32) {}

    function getFacilitatorsList()
        external
        view
        override
        returns (address[] memory)
    {}

    // -------------------- My code

    // function mintGHO(address account, uint256 amount) {
    //     GhoToken.mint(account, amount);
    // }

    // function addNewFacilitator(
    //     address facilitatorAddress,
    //     string calldata facilitatorLabel,
    //     uint128 bucketCapacity
    // ) external {
    //     GhoToken.addFacilitator(
    //         facilitatorAddress,
    //         facilitatorLabel,
    //         bucketCapacity
    //     );
    // }

    // function removeOldFacilitator(address facilitator) external {
    //     GhoToken.removeFacilitator(facilitator);
    // }

    // function getFacilitatorBucketGHO(address facilitator) external view {
    //     GhoToken.getFacilitatorBucket(facilitator);
    // }

    // function getFacilitatorsListGHO() external view returns (address[] memory) {
    //     address[] listt = _facilitatorsList.values();
    //     return listt;
    // }
}
