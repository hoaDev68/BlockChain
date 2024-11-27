let provider, signer, contract;
let contractAddress = ""; // Địa chỉ hợp đồng sẽ được tải từ file JSON
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "UserList",
    outputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        internalType: "string",
        name: "userName",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "age",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "userAddress",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_userAddress",
        type: "string",
      },
    ],
    name: "addUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "deleteUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllUsers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
    ],
    name: "getUserById",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "userName",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "age",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "userAddress",
            type: "string",
          },
        ],
        internalType: "struct Loop.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sortUsersByAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_userAddress",
        type: "string",
      },
    ],
    name: "updateUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Tải địa chỉ hợp đồng từ file JSON
async function loadContractAddress() {
  try {
    const response = await fetch("./deployedAddress.json"); // Đọc file JSON
    const data = await response.json();
    contractAddress = data.contractAddress;
    console.log("Loaded Contract Address:", contractAddress);
  } catch (error) {
    console.error("Error loading contract address:", error);
  }
}

// Kết nối blockchain qua MetaMask
async function connectToBlockchain() {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Yêu cầu quyền kết nối MetaMask
      signer = provider.getSigner();

      // Đảm bảo địa chỉ hợp đồng đã được tải
      if (!contractAddress) {
        await loadContractAddress();
      }

      contract = new ethers.Contract(contractAddress, abi, signer); // Kết nối hợp đồng
      console.log("Blockchain connected successfully.");
    } catch (error) {
      console.error("Error connecting to blockchain:", error);
      alert("Failed to connect to MetaMask.");
    }
  } else {
    alert("Please install MetaMask.");
  }
}

// Hàm lưu người dùng
async function saveUser() {
  if (!contract) {
    alert("Contract is not initialized. Please connect your wallet.");
    return;
  }

  const userName = document.getElementById("userName").value;
  const userAge = parseInt(document.getElementById("userHealth").value);
  const userAddress = document.getElementById("userStrength").value;

  if (!userName || isNaN(userAge) || !userAddress) {
    alert("Please fill in all fields correctly.");
    return;
  }

  try {
    console.log("Sending transaction to save user...");
    const tx = await contract.addUser(userName, userAge, userAddress);
    await tx.wait(); // Chờ giao dịch được xác nhận
    alert("User saved successfully!");
    window.location.href = "user_management.html"; // Chuyển hướng sau khi lưu
  } catch (error) {
    console.error("Error saving user:", error);
    alert("Error saving user: " + error.message);
  }
}

// Điều hướng về trang quản lý người dùng khi nhấn "Cancel"
function cancelUser() {
  console.log("Cancel button clicked");
  window.location.href = "user_management.html";
}

// Thêm sự kiện cho nút Save và Cancel khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save").addEventListener("click", saveUser);
  document.getElementById("cancel").addEventListener("click", cancelUser);
  connectToBlockchain(); // Kết nối blockchain
});
