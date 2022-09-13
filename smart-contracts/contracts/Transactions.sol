//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions 
{
    uint256 transactionNum;

    event TransferEth(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStructure
    {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    //transactions array
    TransferStructure[] transactions;

    function attachToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public
    {
        transactionNum = transactionNum + 1;
        transactions.push(TransferStructure(msg.sender, receiver, amount, message, block.timestamp, keyword));
        emit TransferEth(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function allTransactions() public view returns (TransferStructure[] memory)
    {
        return transactions;
    }

    function transactionCount() public view returns (uint256)
    {
        return transactionNum;
    }
}