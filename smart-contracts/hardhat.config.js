//https://eth-goerli.g.alchemy.com/v2/yJXMFvl89By9rWXHWERyxw3Z_v6c9TuX

require('@nomiclabs/hardhat-waffle')

module.exports = 
{
  solidity: '0.8.0',
  networks:
  {
    goerli:
    {
      url: 'https://eth-goerli.g.alchemy.com/v2/yJXMFvl89By9rWXHWERyxw3Z_v6c9TuX',
      accounts: ['4e02613af4dc916072cf371a35b4d04b272b3c0c3a2a8d90aeae649ee12cb88f']
    }
  }
}
