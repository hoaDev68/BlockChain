// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock1 {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}

// Hợp đồng Lock cho phép lưu trữ Ether và chỉ chủ sở hữu rút được sau một khoảng thời gian nhất định.
contract Lock {
    address public owner; // Địa chỉ chủ sở hữu hợp đồng
    uint256 public unlockTime; // Thời gian mở khóa
    uint256 public lockedAmount; // Số tiền bị khóa

    // Sự kiện thông báo khi rút tiền
    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockTime) payable {
        require(
            _unlockTime > block.timestamp,
            "Unlock time should be in the future"
        );

        owner = msg.sender; // Lưu chủ sở hữu
        unlockTime = _unlockTime; // Lưu thời gian mở khóa
        lockedAmount = msg.value; // Lưu số tiền bị khóa
    }

    // Hàm rút tiền
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(lockedAmount, block.timestamp); // Phát sự kiện
        payable(owner).transfer(lockedAmount); // Chuyển tiền cho chủ sở hữu
    }
}
