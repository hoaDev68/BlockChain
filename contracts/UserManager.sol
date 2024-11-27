// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Loop {
    struct User {
        string id;
        string userName;
        uint8 age;
        string userAddress;
        // uint balance; // Số dư của người dùng
        // uint dailyWithdrawn; // Tổng số tiền đã rút trong ngày
        // uint lastWithdrawTime; // Thời điểm rút tiền gần nhất
        // uint maxDailyWithdrawLimit; // Giới hạn rút tối đa mỗi ngày
    }
    User[] public UserList;
    uint8 genID;
    mapping(string => uint) private userIndex; // Mapping to keep track of user indices

   function genId() internal returns (string memory) {
    genID += 1; // Tăng ID
    return string(abi.encodePacked("USR", uint2str(genID))); // Ghép chuỗi thành "USR1", "USR2", ...
}

    function uint2str(uint _i) internal pure returns (string memory) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len;
    while (_i != 0) {
        k = k - 1;
        uint8 temp = (48 + uint8(_i - _i / 10 * 10));
        bytes1 b1 = bytes1(temp);
        bstr[k] = b1;
        _i /= 10;
    }
    return string(bstr);
}

// Hàm thêm người dùng
function addUser(string memory _userName, uint8 _age, string memory _userAddress) 
    public {
    string memory newID = genId(); // Tạo ID mới
    require(userIndex[newID] == 0, "User already exists."); // Đảm bảo ID là duy nhất

    User memory newUser = User({
        id: newID,
        userName: _userName,
        age: _age,
        userAddress: _userAddress
    });

    UserList.push(newUser); // Thêm vào danh sách
    userIndex[newID] = UserList.length; // Lưu chỉ mục của người dùng
}

    function updateUser(string memory _id, string memory _userName, uint8 _age, string memory _userAddress) public {
        uint index = userIndex[_id];
        require(index > 0, "User does not exist."); 

        User storage existingUser = UserList[index - 1]; 
        existingUser.userName = _userName;
        existingUser.age = _age;
        existingUser.userAddress = _userAddress;
    }

    function deleteUser(string memory _id) public {
        uint index = userIndex[_id];
        require(index > 0, "User does not exist."); 

        uint lastIndex = UserList.length - 1;
        if (index - 1 != lastIndex) {
            User storage lastUser = UserList[lastIndex];
            UserList[index - 1] = lastUser;
            userIndex[lastUser.id] = index;
        }
        UserList.pop();
        delete userIndex[_id];
    }

    // 4. Tìm kiếm người dùng theo ID
    function getUserById(string memory _id) public view returns (User memory) {
        uint index = userIndex[_id];
        require(index > 0, "User does not exist."); 
        return UserList[index - 1];
    }
    

    // 5. Sắp xếp người dùng theo độ tuổi
    function sortUsersByAge() public {
        uint n = UserList.length;
        for (uint i = 0; i < n - 1; i++) {
            for (uint j = 0; j < n - i - 1; j++) {
                if (UserList[j].age > UserList[j + 1].age) {
                    User memory temp = UserList[j];
                    UserList[j] = UserList[j + 1];
                    UserList[j + 1] = temp;

                    // Update userIndex to reflect changes in UserList
                    userIndex[UserList[j].id] = j + 1;
                    userIndex[UserList[j + 1].id] = j + 2;
                }
            }
        }
    }

    // 6. Hiển thị danh sách người dùng
    function getAllUsers() public view returns (uint256) {
        return UserList.length;
    }
   
}
