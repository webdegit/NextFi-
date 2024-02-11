// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

struct PlanStruct {
    uint8 planId;
    string name;
    uint256 value;
    uint256 maxLimitMultiplier;
}

struct SupportedTokensStruct {
    address contractAddress;
    uint256 decimals;
    bool isStable;
    address aggregatorAddress;
    bool isEnaled;
}

struct TeamStruct {
    uint256 teamId;
    uint256 teamLevel;
}

struct BusinessStruct {
    uint256 selfBusiness;
    uint256 directBusiness;
    uint256 teamBusiness;
    // uint256 spillOverBusiness;
}

struct RewardsStruct {
    uint256 referralRewards;
    uint256 spillOverRewards;
    uint256 globalRewards;
}

struct RefereeAssignedStruct {
    uint256 refereeId;
    uint256 assignedToid;
}

struct AccountStruct {
    address selfAddress;
    uint256[] ids;
}

struct IdStruct {
    uint256 id;
    address owner;
    uint256 referrerId;
    uint256 parentId;
    uint256[] refereeIds;
    RefereeAssignedStruct[] refereesAssigned;
    TeamStruct[] team;
    BusinessStruct business;
    RewardsStruct rewards;
    bool isInPool;
}

struct PoolStruct {
    uint8 poolId;
    uint256 rewardToDistribute;
    uint8 minUserCounter;
    uint256 userCountToUpgrade;
    uint256 count;
    uint256[] userIds;
    uint256 totalRewardDistributed;
}

contract GlobalFiUpgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address[] private _users;
    uint256 private _ids;
    uint256[] private _nonGlobalIds;

    uint256[] private _levelRates;

    uint256 private _maxRefereeLimit;
    uint8 private _teamLevelsToCount;

    uint256 private _registrationAmountInUSD;

    address private _adminAddress;
    address private _taxBeneficiaryAddress;

    uint256 private _taxPer;

    uint256 private _totalReferralPaid;
    uint256 private _totalValueRegistered;

    SupportedTokensStruct[] private _supportedTokensList;

    bool private _reentrancy;

    mapping(address => AccountStruct) private _mappingAccounts;
    mapping(uint256 => IdStruct) private _mappingIds;
    mapping(address => SupportedTokensStruct) private _mappingSupportedToken;
    mapping(uint8 => PoolStruct) private _mappingPools;

    event SelfAddressUpdated(address newAddress);
    event IdUpdated(address userAddress, uint256 id);
    event IdOwnerUpdated(address userAddress, uint256 id);
    event ReferrerUpdated(uint256 referrerId, uint256 userId);
    event RefereeAssigned(uint256 parentId, uint256 referrerId, uint256 userId);
    event TeamUpdated(uint256 parent, uint256 userId);
    event TeamNonGlobalAdded(address parent, address user);
    event TeamNonGlobaRemoved(address parent, address user);
    event SelfBusinessUpdated(uint256 userId, uint256 valueInWei);
    event DirectBusinessUpdated(
        uint256 referrerId,
        uint256 userId,
        uint256 valueInWei
    );
    event TeamBusinessUpdated(
        uint256 referrerId,
        uint256 userId,
        uint256 valueInWei,
        uint256 level
    );

    event ReferralDistributed(
        uint256 referrerId,
        uint256 userId,
        uint256 referralValue,
        uint256 level
    );

    event IdUpgradedInPool(uint256 id, uint8 poolId);
    event DistributedPoolReward(uint256 id, uint8 poolId, uint256 rewardInWei);

    modifier ReentrancyGuard() {
        require(!_reentrancy, "ReentrancyGuard(): Contract ReentrancyGuard");
        _reentrancy = true;
        _;
        _reentrancy = false;
    }

    /**
     * @dev Initializes the contract with default values and sets configuration parameters.
     *      This function is typically called only once during contract deployment.
     */
    function initialize() public initializer {
        // Set the maximum limit for referees to 2.
        _maxRefereeLimit = 2;

        // Set the initial rate for the first team level to 50%.
        _levelRates = [50];

        // Set the maximum number of team levels to be considered for counting.
        _teamLevelsToCount = 20;

        _adminAddress = msg.sender;
        _taxBeneficiaryAddress = 0x14A8EE34eDcb63f88d301215862ff5E017eBdFf1;

        _registrationAmountInUSD = 10 * 1 ether;

        _taxPer = 5;

        // Initialize Pausable, Ownable, and UUPSUpgradeable modules.
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function getSupportedCurrencies()
        external
        view
        returns (SupportedTokensStruct[] memory)
    {
        return _supportedTokensList;
    }

    /**
     * @dev Adds a supported base currency to the system.
     * @param _tokenContractAddress The address of the token contract to be added as a base currency.
     * @param _isStable A boolean indicating whether the added token is a stablecoin or not.
     * @param _aggregatorContractAddress The address of the price aggregator contract for the token.
     * @notice This function is only callable by the owner of the contract.
     * @notice It checks if the token is not already added to the system before adding.
     * @dev It initializes the SupportedTokensStruct for the added token with relevant information such as decimals, stability, aggregator, and enables it.
     * @dev The added token is also appended to the list of supported tokens.
     */

    function addBaseCurrency(
        address _tokenContractAddress,
        bool _isStable,
        address _aggregatorContractAddress
    ) external onlyOwner {
        require(
            _mappingSupportedToken[_tokenContractAddress].contractAddress ==
                address(0),
            "pushSupportedTokenToList(): Token is already added."
        );

        _mappingSupportedToken[_tokenContractAddress] = SupportedTokensStruct({
            contractAddress: _tokenContractAddress,
            decimals: IERC20_EXTENDED(_tokenContractAddress).decimals(),
            isStable: _isStable,
            aggregatorAddress: _aggregatorContractAddress,
            isEnaled: true
        });

        _supportedTokensList.push(
            _mappingSupportedToken[_tokenContractAddress]
        );
    }

    /**
     * @dev Removes or disables a supported base currency in the system.
     * @param _tokenContractAddress The address of the token contract to be removed or disabled.
     * @param _status A boolean indicating whether to enable (true) or disable (false) the token.
     * @notice This function is only callable by the owner of the contract.
     * @notice It checks if the token is already added to the system before attempting to remove or disable it.
     * @notice It also checks if the status change is necessary to avoid unnecessary state changes.
     * @dev It updates the `isEnaled` status of the specified token based on the provided status parameter.
     */

    function removeBaseCurrency(
        address _tokenContractAddress,
        bool _status
    ) external onlyOwner {
        require(
            _mappingSupportedToken[_tokenContractAddress].contractAddress !=
                address(0),
            "setSupportedTokenStatus(): Token is not added added."
        );

        require(
            _mappingSupportedToken[_tokenContractAddress].isEnaled != _status,
            "setSupportedTokenStatus(): Token status is already same as mentioned."
        );

        _mappingSupportedToken[_tokenContractAddress].isEnaled = _status;
    }

    function getPools(uint8 _poolId) external view returns (PoolStruct memory) {
        return _mappingPools[_poolId];
    }

    function setPools(
        uint8[] calldata _poolId,
        uint256[] calldata _rewardToDistributeInDecimals,
        uint8 _minUserCounter
    ) external onlyOwner {
        for (uint8 i; i < _poolId.length; ++i) {
            PoolStruct storage poolsAccount = _mappingPools[_poolId[i]];

            poolsAccount.poolId = _poolId[i];
            poolsAccount.rewardToDistribute =
                _rewardToDistributeInDecimals[i] *
                1 ether;
            poolsAccount.minUserCounter = _minUserCounter;
        }
    }

    function _pushIdToPool(IdStruct storage _idAccount) private {
        if (!_idAccount.isInPool) {
            PoolStruct storage poolAccount = _mappingPools[1];

            poolAccount.userIds.push(_idAccount.id);
            poolAccount.count++;

            _idAccount.isInPool = true;

            emit IdUpgradedInPool(_idAccount.id, 1);
        }
    }

    function _upgradeIdToPool(address _tokenAddress) private ReentrancyGuard {
        for (uint8 i = 1; i < 20; ++i) {
            PoolStruct storage poolAccount = _mappingPools[i];

            if (poolAccount.poolId == 0) {
                break;
            }

            if (poolAccount.count >= poolAccount.minUserCounter) {
                PoolStruct storage nextPoolAccount = _mappingPools[i + 1];
                nextPoolAccount.userIds.push(
                    poolAccount.userIds[poolAccount.userCountToUpgrade]
                );

                emit IdUpgradedInPool(
                    poolAccount.userIds[poolAccount.userCountToUpgrade],
                    i + 1
                );

                IdStruct storage idAccount = _mappingIds[
                    poolAccount.userIds[poolAccount.userCountToUpgrade]
                ];

                IERC20Upgradeable(_tokenAddress).transfer(
                    idAccount.owner,
                    _weiToTokens(poolAccount.rewardToDistribute, _tokenAddress)
                );

                emit DistributedPoolReward(
                    poolAccount.userIds[poolAccount.userCountToUpgrade],
                    poolAccount.poolId,
                    poolAccount.rewardToDistribute
                );

                poolAccount.totalRewardDistributed += poolAccount
                    .rewardToDistribute;

                poolAccount.count = 0;
            }
        }
    }

    /**
     * @dev Internal function to update the self address of a user in their account structure.
     * @param _userAccount The storage reference to the AccountStruct of the user.
     * @param _userAddress The new address to be set as the user's self address.
     * @notice This function updates the self address of a user only if the current self address is null (address(0)) and the new address is not null.
     * @dev It sets the new address as the self address in the user's account structure and emits a `SelfAddressUpdated` event.
     */

    function _updateSelfAddress(
        AccountStruct storage _userAccount,
        address _userAddress
    ) private {
        if (
            _userAccount.selfAddress == address(0) && _userAddress != address(0)
        ) {
            _userAccount.selfAddress = _userAddress;
            emit SelfAddressUpdated(_userAddress);
        }
    }

    function _getNextId() private view returns (uint256 nextId) {
        nextId = _ids + 1;
    }

    function _updateId(
        IdStruct storage _idAccount,
        AccountStruct storage _userAccount
    ) private returns (uint256 id) {
        require(_idAccount.id == 0, "_updateId(): Id is already created.");
        _ids++;
        id = _ids;
        _idAccount.id = id;

        _userAccount.ids.push(id);
        emit IdUpdated(_userAccount.selfAddress, id);

        _idAccount.owner = _userAccount.selfAddress;
        emit IdOwnerUpdated(_userAccount.selfAddress, id);
    }

    function _pushIdToNonGlobal(IdStruct memory _userIdAccount) private {
        _nonGlobalIds.push(_userIdAccount.id);
    }

    function _removeIdFromNonGlobal(IdStruct memory _idAccount) private {
        if (_checkIfMaxRefereeLimit(_idAccount)) {
            _nonGlobalIds[0] = _nonGlobalIds[_nonGlobalIds.length - 1];
            _nonGlobalIds.pop();
        }
    }

    function _checkIfMaxRefereeLimit(
        IdStruct memory _idAccount
    ) private view returns (bool isLimitReached) {
        // Check if the number of referees is equal to the maximum referee limit.
        if (_idAccount.refereeIds.length == _maxRefereeLimit) {
            // If the limit is reached, set the boolean to true.
            isLimitReached = true;
        }
    }

    function _addReferrer(
        IdStruct storage _firstReferrerIdAccount,
        IdStruct storage _userIdAccount
    ) private returns (bool isSpillOver) {
        uint256 userId = _userIdAccount.id;
        if (msg.sender != owner()) {
            require(
                _firstReferrerIdAccount.id != 0,
                "_addReferrer(): Referre Id is not activated."
            );
        }

        require(
            _firstReferrerIdAccount.referrerId != userId,
            "_addReferrer(): Referee cannot be referrer upline."
        );

        require(userId != 0, "_addReferrer(): User referrer already set.");

        if (!_checkIfMaxRefereeLimit(_firstReferrerIdAccount)) {
            _userIdAccount.referrerId = _firstReferrerIdAccount.id;
            _userIdAccount.parentId = _firstReferrerIdAccount.id;
            _firstReferrerIdAccount.refereeIds.push(userId);
            emit ReferrerUpdated(_firstReferrerIdAccount.id, userId);
        } else {
            require(
                _nonGlobalIds.length > 0,
                "_addReferrer(): Global ids are over."
            );

            IdStruct storage nonGlobalIdAccount = _mappingIds[_nonGlobalIds[0]];
            _userIdAccount.referrerId = nonGlobalIdAccount.id;
            _userIdAccount.parentId = _firstReferrerIdAccount.id;
            _firstReferrerIdAccount.refereesAssigned.push(
                RefereeAssignedStruct(userId, nonGlobalIdAccount.id)
            );

            emit RefereeAssigned(
                _firstReferrerIdAccount.id,
                nonGlobalIdAccount.id,
                userId
            );

            nonGlobalIdAccount.refereeIds.push(userId);
            emit ReferrerUpdated(nonGlobalIdAccount.id, userId);

            _removeIdFromNonGlobal(nonGlobalIdAccount);

            isSpillOver = true;
        }

        uint256 levelsToCount = _teamLevelsToCount;

        for (uint256 i; i < levelsToCount; ++i) {
            IdStruct storage referrerIdAccount = _mappingIds[_userIdAccount.id];

            referrerIdAccount.team.push(TeamStruct(userId, i + 1));
            emit TeamUpdated(referrerIdAccount.id, userId);

            _userIdAccount = referrerIdAccount;
        }
    }

    function _payDirectReferral(
        IdStruct storage _userIdAccount,
        uint256 _valueInWei,
        bool _isSpillOver,
        address _tokenAddress
    ) private ReentrancyGuard {
        uint256 userId = _userIdAccount.id;
        IdStruct storage referrerIdAccount;

        if (_isSpillOver) {
            referrerIdAccount = _mappingIds[_userIdAccount.parentId];
        } else {
            referrerIdAccount = _mappingIds[_userIdAccount.referrerId];
        }

        referrerIdAccount.business.directBusiness += _valueInWei;
        emit DirectBusinessUpdated(
            referrerIdAccount.id,
            _userIdAccount.id,
            _valueInWei
        );

        uint256[] memory levelRates = _levelRates;
        uint256 referralPaid;

        for (uint256 i; i < levelRates.length; ++i) {
            referrerIdAccount = _mappingIds[_userIdAccount.referrerId];

            if (i == 0) {
                _pushIdToPool(referrerIdAccount);
            }

            uint256 referralValue = (_valueInWei * levelRates[i]) / 100;

            IERC20Upgradeable(_tokenAddress).transfer(
                referrerIdAccount.owner,
                _weiToTokens(referralValue, _tokenAddress)
            );

            emit ReferralDistributed(
                referrerIdAccount.id,
                userId,
                referralValue,
                i + 1
            );

            referralPaid += referralValue;

            referrerIdAccount.rewards.referralRewards += referralValue;

            referrerIdAccount.business.teamBusiness += _valueInWei;

            emit TeamBusinessUpdated(
                referrerIdAccount.id,
                userId,
                _valueInWei,
                i + 1
            );

            _userIdAccount = referrerIdAccount;
        }

        _upgradeIdToPool(_tokenAddress);

        _totalReferralPaid += referralPaid;
    }

    function _register(
        IdStruct storage _userIdAccount,
        uint256 _valueInWei
    ) private {
        _userIdAccount.business.selfBusiness += _valueInWei;
        emit SelfBusinessUpdated(_userIdAccount.id, _valueInWei);
    }

    function register(
        uint256 _referrerId,
        address _userAddress,
        address _tokenAddress
    ) external ReentrancyGuard {
        address msgSender = msg.sender;
        uint256 valueInWei = _registrationAmountInUSD;

        if (_mappingSupportedToken[_tokenAddress].isEnaled) {
            IERC20Upgradeable(_tokenAddress).transferFrom(
                msgSender,
                address(this),
                _weiToTokens(valueInWei, _tokenAddress)
            );
        } else {
            revert("register(): Base Currency is not supported or enabled.");
        }

        IdStruct storage referrerIdAccount = _mappingIds[_referrerId];

        AccountStruct storage userAccount = _mappingAccounts[_userAddress];

        _updateSelfAddress(userAccount, _userAddress);

        uint256 userId = _getNextId();

        IdStruct storage userIdAccount = _mappingIds[userId];

        _updateId(userIdAccount, userAccount);

        _pushIdToNonGlobal(userIdAccount);

        bool isSpillOver = _addReferrer(referrerIdAccount, userIdAccount);

        _register(userIdAccount, valueInWei);

        // _payDirectReferral(
        //     userIdAccount,
        //     valueInWei,
        //     isSpillOver,
        //     _tokenAddress
        // );

        _totalValueRegistered += valueInWei;
    }

    function getUserAccount(
        address _userAddress
    ) external view returns (AccountStruct memory) {
        return _mappingAccounts[_userAddress];
    }

    function getIdAccount(uint256 _id) external view returns (IdStruct memory) {
        return _mappingIds[_id];
    }

    function getContractAnalytics()
        external
        view
        returns (
            uint256 usersCount,
            uint256 idsCount,
            uint256 nonGlobalIdsCount,
            uint256 totalReferralPaid,
            uint256 totalValueRegistered
        )
    {
        usersCount = _users.length;
        idsCount = _ids;
        nonGlobalIdsCount = _nonGlobalIds.length;
        totalReferralPaid = _totalReferralPaid;
        totalValueRegistered = _totalValueRegistered;
    }

    function getContractDefaults()
        external
        view
        returns (
            uint256[] memory levelRates,
            uint256 maxRefereeLimit,
            uint256 teamLevelsToCount,
            uint256 registrationAmountInUSD,
            address adminAddress,
            address taxBeneficiaryAddress,
            uint256 taxPer
        )
    {
        levelRates = _levelRates;
        maxRefereeLimit = _maxRefereeLimit;
        teamLevelsToCount = _teamLevelsToCount;
        registrationAmountInUSD = _registrationAmountInUSD;
        adminAddress = _adminAddress;
        taxBeneficiaryAddress = _taxBeneficiaryAddress;
        taxPer = _taxPer;
    }

    /**
     * @dev Converts the given amount of ERC-20 tokens to wei, taking into account the token's decimal places.
     *
     * @param _valueInTokens The amount of tokens to be converted to wei.
     * @param _tokenAddress The address of the ERC-20 token.
     * @return tokensToWei The equivalent amount in wei.
     */
    function _tokensToWei(
        uint256 _valueInTokens,
        address _tokenAddress
    ) private view returns (uint256 tokensToWei) {
        // Calculate the value in wei by multiplying the token amount by 1 ether.
        uint256 valueInWei = _valueInTokens * 1 ether;

        // Adjust the value based on the decimal places of the ERC-20 token.
        tokensToWei =
            valueInWei /
            10 ** IERC20_EXTENDED(_tokenAddress).decimals();
    }

    /**
     * @dev Converts the given amount of wei to ERC-20 tokens, considering the token's decimal places.
     *
     * @param _valueInWei The amount in wei to be converted to tokens.
     * @param _tokenAddress The address of the ERC-20 token.
     * @return weiToTokens The equivalent amount in ERC-20 tokens.
     */
    function _weiToTokens(
        uint256 _valueInWei,
        address _tokenAddress
    ) private view returns (uint256 weiToTokens) {
        // Calculate the value in tokens by multiplying the wei amount by 10^decimal places of the ERC-20 token.
        weiToTokens =
            (_valueInWei * 10 ** IERC20_EXTENDED(_tokenAddress).decimals()) /
            1 ether;
    }

    /**
     * @dev Internal function to authorize an upgrade to a new implementation.
     *      Only the owner of the contract can authorize upgrades.
     *
     * @param newImplementation The address of the new implementation contract.
     */
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {
        // This function is empty as it only requires the owner's authorization for upgrades.
        // The 'onlyOwner' modifier ensures that only the owner can call this function.
        // No additional logic is implemented here as the authorization check is the main concern.
    }
}
