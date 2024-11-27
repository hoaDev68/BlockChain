const connectedWallet = localStorage.getItem('connectedWallet');
document.getElementById("walletInfo").innerText = connectedWallet || "No wallet connected";

function disconnectWallet() {
    localStorage.removeItem('connectedWallet');
    alert("Wallet disconnected.");
    window.location.href = "index.html";
}
