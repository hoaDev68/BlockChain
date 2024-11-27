let provider, signer, contract;
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
let contractAddress = "";

// Tải địa chỉ hợp đồng từ file JSON
async function loadContractAddress() {
  try {
    const response = await fetch("./deployedAddress.json");
    const data = await response.json();
    contractAddress = data.contractAddress;
    console.log("Loaded Contract Address:", contractAddress);
  } catch (error) {
    showToast("Error loading contract address.", true);
    console.error("Error loading contract address:", error);
  }
}

// Kết nối ví MetaMask và hợp đồng
async function connectWallet() {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Yêu cầu kết nối ví
      signer = provider.getSigner();

      if (!contractAddress) {
        await loadContractAddress(); // Đảm bảo địa chỉ hợp đồng đã được tải
      }

      contract = new ethers.Contract(contractAddress, abi, signer);

      const address = await signer.getAddress();
      document.getElementById("walletAddress").innerText = `Wallet: ${address}`;
      showToast("Connected successfully!");
    } catch (error) {
      showToast("Failed to connect wallet.", true);
      console.error("Error connecting wallet:", error);
    }
  } else {
    showToast("MetaMask not installed. Please install MetaMask.", true);
  }
}

// Hiển thị danh sách người dùng
async function loadUsers() {
  try {
    const usersCount = await contract.getAllUsers();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    if (usersCount === 0) {
      userList.innerHTML =
        "<div class='empty-list'>No users available. Please add a user.</div>";
      return;
    }

    for (let i = 1; i <= usersCount; i++) {
      const user = await contract.getUserById("USR" + i);
      const userDiv = document.createElement("div");
      userDiv.className = "user-row";
      userDiv.innerHTML = `
                <div>${i}. ${user[0]}</div>
                <div>
                    <button class="update-button" onclick="updateUser(${i})">Update</button>
                    <button class="delete-button" onclick="deleteUser(${i})">Delete</button>
                </div>
            `;
      userList.appendChild(userDiv);
    }
  } catch (error) {
    showToast("Failed to load users.", true);
    console.error("Error loading users:", error);
  }
}

// Chuyển hướng tới form thêm người dùng
document.getElementById("addUser").onclick = () => {
  window.location.href = "user_form.html";
};

// Cập nhật người dùng
async function updateUser(index, currentName, currentHealth, currentStrength) {
  // Hiển thị form chỉnh sửa người dùng
  const newName = prompt("Enter new name:", currentName);
  const newAge = parseInt(prompt("Enter new age:", currentHealth));
  const newAddress = parseInt(prompt("Enter new address:", currentStrength));

  if (!newName || isNaN(newAge) || !newAddress) {
    showToast("Invalid input. Please try again.", true);
    return;
  }

  try {
    const tx = await contract.updateUser(index, newName, newAge, newAddress);
    await tx.wait();
    showToast("User updated successfully!");
    loadUsers();
  } catch (error) {
    showToast("Error updating user.", true);
    console.error("Error updating user:", error);
  }
}

// Xóa người dùng
async function deleteUser(index, userName) {
  if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;

  try {
    const tx = await contract.deleteUser(index);
    await tx.wait();
    showToast("User deleted successfully!");
    loadUsers();
  } catch (error) {
    showToast("Error deleting user.", true);
    console.error("Error deleting user:", error);
  }
}

// Hiển thị thông báo toast
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.backgroundColor = isError ? "#dc3545" : "#28a745";
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// Hiển thị thông báo toast
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.backgroundColor = isError ? "#dc3545" : "#28a745";
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

// Ngắt kết nối ví
document.getElementById("disconnectWallet").onclick = () => {
  localStorage.removeItem("connectedWallet");
  window.location.href = "index.html";
};

// Tải trang và thực hiện kết nối
window.onload = async () => {
  await connectWallet();
  loadUsers();
};
