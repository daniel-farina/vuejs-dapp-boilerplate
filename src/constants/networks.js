// ETHEREUM NETWORK
export const RINKEBY_CONFIG = {
    networkId: "0x4",
    name: 'Rinkeby',
    localStorageName: 'ethereum-rinkeby',
    bridge: '0x59557241da46d72E301a1611322c7b638E0b12BE',
    explorer: 'https://rinkeby.etherscan.io',
    explorerTokenTab: '#tokentxns',
    rpc: `https://rinkeby.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`,
    isResil: false,
    isEth: true,
}
//THIS IS THE ETHEREUM TESTNET
export const MAINNET_CONFIG = {
    networkId: "0x1",
    name: 'Ethereum',
    localStorageName: 'eth-mainnet',
    bridge: '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d',
    explorer: 'https://etherscan.io',
    explorerTokenTab: '#tokentxns',
    secondsPerBlock: 15,
    rpc: `https://mainnet.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`,
    isResil: true,
    isEth: true,
}
//LATAM NETWORK TESTNET
export const RESIL_TESTNET_CONFIG = {
    networkId: "0xac",
    name: 'Resil Testnet',
    localStorageName: 'resil-testnet',
    bridge: '0x09b75316259ca5a090697Ef581a4245aabdEB415',
    explorer: 'https://explorer.latam-blockchain.com',
    explorerTokenTab: '?__tab=tokens%20transfers',
    iconUrls: 'https://user-images.githubusercontent.com/54115104/91619952-3d89dc80-e997-11ea-9411-b729c3d49eb4.png',
    rpc: 'https://rpc.latam-blockchain.com',
    crossToNetwork: RINKEBY_CONFIG,
    isResil: true,
    isEth: false,
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 18,
    },
}

//LATAM NETWORK MAINNET, NAME TO NE DEFINED
export const RESIL_MAINNET = {
    networkId: 31,
    name: 'RSK Testnet',
    localStorageName: 'rsk-testnet',
    bridge: '0x684a8a976635fb7ad74a0134ace990a6a0fcce84',
    explorer: 'https://explorer.testnet.rsk.co',
    iconUrls: 'https://user-images.githubusercontent.com/54115104/91619952-3d89dc80-e997-11ea-9411-b729c3d49eb4.png',
    explorerTokenTab: '?__tab=tokens%20transfers',
    rpc: 'https://public-node.testnet.rsk.co',
    crossToNetwork: RINKEBY_CONFIG,
    isRsk: true,
    isEth: false,
    nativeCurrency: {
        name: 'USD',
        symbol: 'USD',
        decimals: 18,
    }
}

export const NETWORKS = [
    RESIL_TESTNET_CONFIG,
    RESIL_MAINNET,
    MAINNET_CONFIG,
    RINKEBY_CONFIG,
    {name:"Ropsen",networkId:"0x3"},
    {name:"Kovan",networkId:"0x2a"},
    {name:"Rinkeby",networkId:"0x4"}
];
