import React, { useContext, useEffect, useState } from "react"
import Web3 from "web3"
import HeroToken from "./contracts/HeroToken.json"

// interface Props {
//   children: any
// }

const BlockchainContext = React.createContext({})

export default BlockchainContext;

export const BlockchainProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [account, setAccount] = useState("")
  const [balance, setBalance] = useState("")
  const [token, setToken] = useState("")
  const [myTokens, setMyTokens] = useState([])

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        return true
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        return true
      } else {
        console.log("Instale o MetaMask")
        return false
      }
    } catch (error) {
      console.log("Erro: ", error)
      return false
    }
  }

  const getMyTokensFromBlockchain = async (token, account) => {
    let balanceOf = await token.methods.balanceOf(account).call()
    const blockchainTokens = []
    for (let i = 0; i < balanceOf; i++) {
      const id = await token.methods.tokenOfOwnerByIndex(account, i).call()
      const tokenId = await token.methods.tokenURI(id).call()
      blockchainTokens.push(tokenId)
    }

    debugger
    setMyTokens(blockchainTokens)
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()

    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = HeroToken.networks[networkId]
    if (networkData) {
      const abi = HeroToken.abi
      const address = networkData.address
      const _balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether")
      const _token = new web3.eth.Contract(abi, address)

      setToken(_token)
      setBalance(_balance)

      await getMyTokensFromBlockchain(_token, accounts[0])
    } else {
      console.log("Contrato não esta na rede")
    }
  }

  const doLogin = async () => {
    if (await loadWeb3()) {
      await loadBlockchainData()
      setIsAuthenticated(true)
    }
  }

  useEffect(() => {
    doLogin()
  }, [])

  const doMint = async (tokenId, events) => {
    const { onRegistered, onError, onReceipt, onConfirmation } = events
    const web3 = window.web3

    token.methods.mint(account, tokenId)
      .send({ "from": account })
      .on("receipt", async (receipt) => {
        console.log("Seu NFT foi mintado com sucesso")
        await onReceipt(receipt)
        await getMyTokensFromBlockchain(token, account)
      })
      .on("transactionHash", async (hash) => {
        console.log("Seu NFT foi registrado")
        await onRegistered(hash)
      })
      .on("confirmation", async (confirmationNumber, receipt) => {
        console.log("Confirmação registrada")
        await onConfirmation(confirmationNumber, receipt)
      })
      .on("error", async (error) => {
        console.log("Erro: " + error)
        onError(error.message)
      })
  }


  return (
    <BlockchainContext.Provider value={{
      isLoged: isAuthenticated,
      account,
      balance,
      myTokens,
      getMyTokensFromBlockchain,
      doLogin,
      doMint,
    }}>
      {children}
    </BlockchainContext.Provider>
  )
}

export function useBlockchain() {
  return useContext(BlockchainContext)
}