# NFT & Contract Management Todo

## Restore NFT Images

### Collection Status

| Collection | Download | Upload | Contract URL Updated |
|------------|----------|--------|----------------------|
| Moonrunners | ✅ 10,000/10,000 | ⏳ Pending | ⏳ Pending |
| Dragonhorde | ✅ 2,297/2,311 (8 failed) | ⏳ Pending | ⏳ Pending |
| Primordia Land | ✅ 2,883/2,888 (4 failed) | N/A | N/A |
| Secrets of Primordia | ✅ 12/12 (ERC1155) | ⏳ Pending | ⏳ Pending |
| Chronicles of Nogard | ✅ 1/1 | ⏳ Pending | ⏳ Pending |
| History of Primordia | ✅ 3/3 | N/A | N/A |

### Notes
- Moonrunners copied from old repo (`mooncartel-master`)
- Other collections downloaded from OpenSea API
- Dynamic moon-phase backgrounds deferred for later
- Images stored in `/public/nfts/{collection}/images/`

### Failed Downloads to Research
- **Dragonhorde (8):** 347, 371, 1302, 1941, 2044, 2047, 2053, 2164
- **Primordia Land (4):** 1474, 1637, 1691, 1860
- Likely burned tokens or tokens not indexed on OpenSea

---

## Cleanup and Track Contracts
- [x] Get contract addresses from main proposal page
- [x] Enhanced ContractInfo interface with on-chain data
- [x] Added etherscanUrl, tokenStandard, nftImagesDir fields
- [ ] Add dynamic contract info via Ethereum RPC

---

## Detail/Info Pages
- [x] Contract detail pages (`/contracts/[address]`)
- [x] NFT detail pages (`/nfts/[contract]/[tokenId]`)
- [x] Collection gallery pages (`/nfts/[contract]`)

---

## Marketplace Updates
- [ ] Update OpenSea collection metadata
- [ ] Verify all collection URLs are current
- [ ] Check other marketplaces (LooksRare, Blur, etc.)

---

## URL Verification
- [ ] Verify contract tokenURI base URLs
- [ ] Check if on-chain metadata resolves correctly
- [ ] Validate OpenSea collection links
