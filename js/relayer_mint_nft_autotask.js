const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');
const ethers = require('ethers');

const ABI = ["function safeMint(address to) public"];
const ProxyContractAddress = "0x52e7759ef6513413d13E0C51e6dE7C0eC60557c7"; // https://goerli.etherscan.io/address/0x52e7759ef6513413d13e0c51e6de7c0ec60557c7#code
const NFTReceiver = "0x00Dd4cE8a3Ba697a17c079589004446d267435df"; 

const main = async (signer, recipient) => {
    const nft = new ethers.Contract(ProxyContractAddress, ABI, signer)
    const tx = await nft.safeMint(recipient)
    console.log(`New NFT minted for ${recipient} in txHash ${tx.hash}`);
}

exports.handler = async function(event) {
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: 'fast' });
  
  console.log(`Using Relayer: ${signer.getAddress()}`);

  await main(signer, NFTReceiver);
}
