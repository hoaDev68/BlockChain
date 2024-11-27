// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.27",
// };

// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//     solidity: "0.8.27",
//     networks: {
//         hardhat: {}, // Mạng local Hardhat
//         goerli: {
//             url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
//             accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
//         },
//     },
// };

// require("@nomicfoundation/hardhat-toolbox");
// //require("dotenv").config(); // Để sử dụng các biến môi trường trong file .env

// module.exports = {
//     solidity: "0.8.27", // Đảm bảo Solidity version đúng
//     networks: {
//         hardhat: {}, // Mạng local Hardhat
//         localhost: {
//             url: "http://127.0.0.1:8545",
//         },
//     },
// };

require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.27", // Phiên bản Solidity của hợp đồng
    networks: {
        hardhat: {}, // Mạng Hardhat mặc định
        localhost: {
            url: "http://127.0.0.1:8545", // Địa chỉ mạng localhost
        },
    },
};


