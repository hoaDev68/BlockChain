// const fs = require('fs');
// const path = require('path');

// async function main() {
//     const UserManager = await hre.ethers.getContractFactory("UserManager");
//     const userManager = await UserManager.deploy();

//     await userManager.deployed();

//     console.log("UserManager deployed to:", userManager.address);

//     const deployedAddressPath = path.join(__dirname, '../public/deployedAddress.json');
//     const addressData = {
//         contractAddress: userManager.address,
//     };

//     fs.writeFileSync(deployedAddressPath, JSON.stringify(addressData, null, 2));
//     console.log("Contract address saved to deployedAddress.json");
// }
// // const hre = require("hardhat");

// // async function main() {
// //     const UserManager = await hre.ethers.getContractFactory("UserManager");
// //     const userManager = await UserManager.deploy();

// //     await userManager.deployed(); // Đảm bảo dùng await đúng

// //     console.log("UserManager deployed to:", userManager.address);
// // }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

const fs = require("fs");
const path = require("path");

async function main() {
  // Lấy ContractFactory từ Hardhat
  const UserManager = await hre.ethers.getContractFactory("Loop");

  // Triển khai hợp đồng
  const userManager = await UserManager.deploy();

  // Chờ hợp đồng được triển khai thành công
  await userManager.deployed();

  // In ra địa chỉ hợp đồng
  console.log("UserManager deployed to:", userManager.address);

  // Lưu địa chỉ hợp đồng vào file JSON
  const deployedAddressPath = path.join(
    __dirname,
    "../public/deployedAddress.json"
  );
  const addressData = {
    contractAddress: userManager.address,
  };

  // Ghi địa chỉ vào file JSON
  fs.writeFileSync(deployedAddressPath, JSON.stringify(addressData, null, 2));
  console.log("Contract address saved to deployedAddress.json");
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exitCode = 1;
});
