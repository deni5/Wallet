var accountAddress = "0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb";
var sepoliaContractAddress = "0x1234567890abcdef1234567890abcdef12345678";

var web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/3be763d989e54a0e93b760a484fa2aa1"));

function getEthBalance() {
    web3.eth.getBalance(accountAddress, function (error, balance) {
        if (!error) {
            var balanceInEth = web3.utils.fromWei(balance, "ether");
            var balanceDisplay = document.getElementById("balance-display");
            balanceDisplay.textContent = balanceInEth + " ETH";
        } else {
            console.error("Ballance error:", error);
        }
    });
}

function sendTransaction() {
    var amount = document.getElementById("amount").value;
    var currency = document.getElementById("cryptos").value;
    var recipient = document.getElementById("recipient").value;

    var confirmationMessage = "Sending " + amount + " " + currency + " to " + recipient;
    alert(confirmationMessage);
}

function updateSelectedCrypto() {
    var selectElement = document.getElementById("cryptos");
    var selectedCryptoDisplay = document.getElementById("crypto-display");
    var selectedCryptoSpan = document.getElementById(selectElement.value);
    var balanceDisplay = document.getElementById("balance-display");

    selectedCryptoDisplay.textContent = selectElement.value;

    document.querySelectorAll("#cryptolist span").forEach(span => {
        span.style.color = "green";
        span.style.fontWeight = "normal";
    });

    selectedCryptoSpan.style.color = "black";
    selectedCryptoSpan.style.fontWeight = "bold";

    getEthBalance();
}

function updateSelectedCryptoFromList(crypto) {
    var selectElement = document.getElementById("cryptos");
    selectElement.value = crypto;
    updateSelectedCrypto();
}

window.onload = function () {
    var currentAddressElement = document.getElementById("current-address");
currentAddressElement.textContent = sepoliaContractAddress;

    if (typeof ethereum !== 'undefined') {
        ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts) {
            var defaultAddress = accounts.length > 0 ? accounts[0] : "0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb";
            currentAddressElement.textContent = defaultAddress;

            var sepoliaContractElement = document.getElementById("sepolia-contract");
            sepoliaContractElement.textContent = sepoliaContractAddress;

            updateSelectedCryptoFromList(defaultCrypto);
            getEthBalance(defaultAddress);
        }).catch(function (error) {
            console.error("Wallet error:", error);
        });
    } else {
        currentAddressElement.textContent = "0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb";
        var sepoliaContractElement = document.getElementById("sepolia-contract");
        sepoliaContractElement.textContent = sepoliaContractAddress;

        updateSelectedCryptoFromList(defaultCrypto);
        getEthBalance("0xE862Ca4b9389d9bC306c2367A36B8Bd45f6838Bb");
    }
};
