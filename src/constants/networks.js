// THIS IS NOT USED YET
export const RINKEBY_CONFIG = {
    networkId: 1,
    name: 'Ethereum',
    localStorageName: 'eth-mainnet',
    bridge: '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d',
    allowTokens: '0xA3FC98e0a7a979677BC14d541Be770b2cb0A15F3',
    federation: '0x5e29C223d99648C88610519f96E85E627b3ABe17',
    explorer: 'https://etherscan.io',
    explorerTokenTab: '#tokentxns',
    secondsPerBlock: 15,
    rpc: `https://mainnet.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`,
    v2UpdateBlock: 12871770,
    feePercentageDivider: 10_000,
    isRsk: false,
    isEth: true,
}

export const RESIL_TESTNET_CONFIG = {
    networkId: 31,
    name: 'RSK Testnet',
    localStorageName: 'rsk-testnet',
    bridge: '0x684a8a976635fb7ad74a0134ace990a6a0fcce84',
    allowTokens: '0xc65bf0ae75dc1a5fc9e6f4215125692a548c773a',
    federation: '0x5d663981d930e8ec108280b9d80885658148ab0f',
    explorer: 'https://explorer.testnet.rsk.co',
    explorerTokenTab: '?__tab=tokens%20transfers',
    secondsPerBlock: 30,
    rpc: 'https://public-node.testnet.rsk.co',
    v2UpdateBlock: 1945524,
    feePercentageDivider: 10_000,
    crossToNetwork: RINKEBY_CONFIG,
    isRsk: true,
    isEth: false,
}
RINKEBY_CONFIG.crossToNetwork = RESIL_TESTNET_CONFIG



export const MAINNET_CONFIG = {
    networkId: 1,
    name: 'Ethereum',
    localStorageName: 'eth-mainnet',
    bridge: '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d',
    allowTokens: '0xA3FC98e0a7a979677BC14d541Be770b2cb0A15F3',
    federation: '0x5e29C223d99648C88610519f96E85E627b3ABe17',
    explorer: 'https://etherscan.io',
    explorerTokenTab: '#tokentxns',
    secondsPerBlock: 15,
    rpc: `https://mainnet.infura.io/v3/${process.env.VUE_APP_INFURA_KEY}`,
    v2UpdateBlock: 12871770,
    feePercentageDivider: 10_000,
    isRsk: false,
    isEth: true,
}

export const NETWORKS = [
    {Name:"Resil",Value:"0xac"},
    {Name:"Ethereum",Value:"1"},
    {Name:"Rinkeby",Value:"4"}
];
