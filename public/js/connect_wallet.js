document.getElementById('connectWallet').onclick = async () => {
    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            document.getElementById('walletInfo').innerText = `Connected Wallet: ${address}`;
            console.log("Connected Wallet Address:", address);

            localStorage.setItem('connectedWallet', address);
            setTimeout(() => window.location.href = "user_management.html", 2000);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert("Failed to connect wallet.");
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
};
