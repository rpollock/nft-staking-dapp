import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0x2ec92364276Bd9cb9cd4649197f495B4D460AEd1";
const rewardTokenContractAddress = "0x5c766B3654C402C8c21B7d4c6a0077E00D0249C3";
const stakingContractAddress = "0x01121de02c8E34cD04ec03f2Ca48BBE6871962D4";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});