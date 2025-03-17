import { MediaRenderer, TransactionButton, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contract";
import { getNFT } from "thirdweb/extensions/erc721";
import { client } from "@/app/client";
import { prepareContractCall } from "thirdweb";

type StakedNFTCardProps = {
    tokenId: bigint;
    refetchStakedInfo: () => void;
    refetchOwnedNFTs: () => void;
};

export const StakedNFTCard: React.FC<StakedNFTCardProps> = ({ tokenId, refetchStakedInfo, refetchOwnedNFTs }) => {
    const { data: nft } = useReadContract(
        getNFT,
        {
            contract: NFT_CONTRACT,
            tokenId: tokenId,
        }
    );
    
    return (
        <div style={{ margin: "10px" }}>
            <MediaRenderer
                client={client}
                src={nft?.metadata.image}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    height: "200px",
                    width: "200px"
                }}
            />
            <p className="o-p" style={{ margin: "0 10px 10px 10px"}}>{nft?.metadata.name}</p>
            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract: STAKING_CONTRACT,
                        method: "withdraw",
                        params: [[tokenId]]
                    })
                )}
                className="s-but"
                onTransactionConfirmed={() => {
                    refetchOwnedNFTs();
                    refetchStakedInfo();
                    alert("Withdrawn!");
                }}
                style={{
                    border: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%"
                }}
            >Withdraw</TransactionButton>
        </div>
    )
};