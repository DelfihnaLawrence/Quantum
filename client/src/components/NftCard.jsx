import React from 'react'
import styles from './NftCard.module.css'
function NftCard({ nft, setSelectedNft, selectedNft }) {
  return (
    <div className={styles.card} onClick={() => setSelectedNft(nft)} style={{backgroundColor: selectedNft?.name === nft?.name ? "rgba(71, 48, 107)" : "rgba(34, 23, 51)", display: "flex", flexDirection: "column", padding: "20px", borderRadius: "10px", justifyContent: "center", alignItems: "center", gap: "10px", cursor: "pointer"}}>
        <h1 style={{color: "white"}}>{nft.name}</h1>
        <img src={nft.image} style={{width: "100px", height: "100px"}}/>
    </div>
  )
}

export default NftCard