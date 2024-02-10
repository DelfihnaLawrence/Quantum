 import {Navbar, Footer , Services} from './components';
 
 import Welcome from './components/Welcome';
 import Transaction from './components/Transaction';
import { NFTs, users} from '../../server/data';
import NftCard from './components/NftCard';
import { useContext, useEffect, useMemo, useState } from 'react';
 import axios from 'axios';
 import Login from'./Login.jsx';
import { TransactionContext } from './context/TransactionContext';

 const App=()=> {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
 
 const [nft, setNft] = useState([])
 const [selectedNft, setSelectedNft] = useState();
 const [currentUser, setCurrentUser] = useState(users[0]);
 const [loanDetails, setLoanDetails] = useState({})
 const [userNft, setUserNft] = useState([]);
 const [quantumNft, setQuantumNft] = useState([]);
 
 useMemo(() => {
  setNft(NFTs);
 }, [NFTs])
 
 useEffect(() => {
  setUserNft(
    nft.filter(cnft => {
      return cnft.owner === currentUser.name
    })
  )
  
  setQuantumNft(
    nft.filter(cnft => {
      return cnft.owner === 'quantum'
    })
  )
 }, [nft])
 const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

 const requestLoan = () => {
  handleChange({target: {value: currentUser.walletAddress}}, "addressTo");
  handleChange({target: {value: loanDetails.totalAmount}}, "amount")
  handleChange({target: {value: "Loan from Quantum"}}, "message")
  console.log("called")
  if(selectedNft){
      axios.post("http://localhost:3001/quantum/request-loan",{
        user: currentUser,
        NFT: selectedNft
      }).then(response => {
        alert(response.data)
      }).catch(error => console.log(error));
      
      axios.post("http://localhost:3001/quantum/approve-loan",{
        user: currentUser,
        NFT: selectedNft,
        loanDetails: loanDetails
      }).then(response => {
        console.log(response.data)
        sendTransaction()
      }).catch(error => console.log(error));
  } else {
    alert("Please select a NFT")
  }
 }
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
        <Services/>  
        <Transaction/>
        <div style={{width: "100%",backgroundColor: "black", display: 'flex', gap: "50px", flexDirection: "column", justifyContent: "center", alignContent: "center", padding: "20px 10px"}}>
        <div style={{display: "flex", justifyContent: "center", alignContent: "center", gap: "50px"}}>
        {
        
            NFTs.map(nft => {
            return <NftCard nft={nft} setSelectedNft={setSelectedNft} selectedNft={selectedNft}/>
            })
        }
        </div>
        <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}> 
        <div className="p-5 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
        <input
    placeholder="Enter Loan amount"
    type="number"
    step= "0.0001"
    value={loanDetails.totalAmount}
    onChange={(e) => setLoanDetails({
      ...loanDetails,
      totalAmount: e.target.value
    })}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
  <input
    placeholder="Enter Rate Per Year"
    type="number"
    max="9"
    value={loanDetails.ratePerYear}
    onChange={(e) => setLoanDetails({
      ...loanDetails,
      ratePerYear: e.target.value
    })}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
  <input
    placeholder="Enter Total Months"
    type="number"
    value={loanDetails.months}
    onChange={(e) => setLoanDetails({
      ...loanDetails,
      months: e.target.value
    })}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
  

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {
                <button
                  type="button"
                  onClick={requestLoan}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Request Loan
                </button>
              }
          </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default App
 