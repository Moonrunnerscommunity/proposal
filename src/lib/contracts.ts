// Basic ERC721 ABI with staking methods
export const PRIMORDIA_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "owner_", "type": "address"}],
    "name": "tokensOfOwner",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]"}],
    "name": "unStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

export const MOONRUNNERS_DRAGONHORDE_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getStake",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256[]",
                        "name": "tokenIds",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TrophiesV2.Stake",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_tokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_tokenIds",
                "type": "uint256[]"
            }
        ],
        "name": "unstakeDragons",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const

export const getContractConfig = (contractAddress: string) => {
    switch (contractAddress.toLowerCase()) {
        case '0x9972edce48d82d16c82326e23f894f9aa0e3bb32':
            return {
                abi: PRIMORDIA_ABI,
                readMethod: 'tokensOfOwner',
                writeMethod: 'unStake'
            }
        case '0x717c6dd66be92e979001aee2ee169aaa8d6d4361':
            return {
                abi: MOONRUNNERS_DRAGONHORDE_ABI,
                readMethod: 'getStake',
                writeMethod: 'unstake'
            }
        default:
            throw new Error(`Unknown contract address: ${contractAddress}`)
    }
}