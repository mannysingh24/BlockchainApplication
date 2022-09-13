import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {contractABI, contractAddress} from '../utility-functions/contract_constants'
import { Transactions } from '../website-sections'

export const TransactionContext = React.createContext()

const {ethereum} = window

const getEthContract = () => 
{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract
}

export const TransactionProvider = ({children}) => 
{
    const [formData, setFormData] = useState({addressTo: "", amount: "", keyword: "", message: ""})
    const [currentAccount, setCurrentAccount] = useState("")
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [Transactions, setTransactions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event, name) =>
    {
        setFormData((prev) => ({...prev, [name]:event.target.value}))
    }
    const allTransactions = async () => {
        try
        {
            if(!ethereum)
            {
                return alert("Please Install MetaMask From The Chrome Web Store.")
            }
            const transactionContract = getEthContract()
            const accessibleTransactions = await transactionContract.allTransactions()
            const orderedTransactions = accessibleTransactions.map((transaction) => ({addressTo: transaction.receiver, addressFrom: transaction.sender, timestamp: new Date(transaction.timestamp.toNumber()*1000).toLocaleString(), message: transaction.message, keyword: transaction.keyword, amount: parseInt(transaction.amount._hex) / (10**18)}))
            setTransactions(orderedTransactions)
        }
        catch (error)
        {
            console.log(error)
        }
    }
    const connectWallet = async() =>
    {
        try
        {
            if(!ethereum)
            {
                return alert("Please Install MetaMask From The Chrome Web Store.")
            }
            const accounts = await ethereum.request({method:'eth_requestAccounts'})
            setCurrentAccount(accounts[0])
        }
        catch(error)
        {
            console.log(error)
            throw new Error("No Ethereum Object.")
        }
    }

    const sendTransaction = async() => 
    {
        try
        {
            if(!ethereum)
            {
                return alert("Please Install MetaMask From The Chrome Web Store.")
            }
            const {addressTo, amount, keyword, message} = formData
            const transactionContract = getEthContract()
            const parsedAmount = ethers.utils.parseEther(amount) //converts to gwei hex
            await ethereum.request({method:'eth_sendTransaction', params:[{from: currentAccount, to: addressTo, gas: '0x5208', value: parsedAmount._hex}]})
            const transactionHash = await transactionContract.attachToBlockchain(addressTo, parsedAmount, message, keyword)
            setIsLoading(true)
            console.log(`Loading - ${transactionHash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash}`)
            const transactionCount = await transactionContract.transactionCount()
            setTransactionCount(transactionCount.toNumber())
            window.location.reload()
        }
        catch(error)
        {
            console.log(error)
            throw new Error("No Ethereum Object.")
        }
    }

    const isWalletConnected = async() => 
    {
        try
        {
            if(!ethereum)
            {
                return alert("Please Install MetaMask From The Chrome Web Store.")
            }
            const accounts = await ethereum.request({method:'eth_accounts'})
            if(accounts.length)
            {
                setCurrentAccount(accounts[0])
                allTransactions()
            }
            else
            {
                console.log("No accounts found")
            }
        }
        catch(error)
        {
            console.log(error)
            throw new Error("No Ethereum Object.")
        }
    }
    const doesTransactionExist = async () => {
        try
        {
            const transactionContract = getEthContract()
            const transactionCount = await transactionContract.transactionCount()
            window.localStorage.setItem("transactionCount", transactionCount)
        }
        catch (error)
        {
            console.log(error)
            throw new Error("No Ethereum Object.")
        }
    }

    useEffect(() => 
    {
        isWalletConnected();
        doesTransactionExist()
    }, [])
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, Transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}