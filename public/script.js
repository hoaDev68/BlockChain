// let provider;

// async function connectWallet() {
//     if (window.ethereum) {
//         try {
//             provider = new ethers.providers.Web3Provider(window.ethereum);
//             await provider.send("eth_requestAccounts", []);
//             const signer = provider.getSigner();
//             document.getElementById("status").innerText = `Đã kết nối: ${await signer.getAddress()}`;
//         } catch (err) {
//             console.error("Kết nối thất bại:", err);
//         }
//     } else {
//         alert("Vui lòng cài đặt MetaMask!");
//     }
// }
