//https://eth-sepolia.g.alchemy.com/v2/RB3l-JzYjih_7vhph0Ia15zRAEP8blYZ
// import {Mocha} from './node_modules/mocha/bin/mocha'
// 0xC4E0f22e596f8349Fc0b770D5674866DBd951Ba8

require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url:'https://eth-sepolia.g.alchemy.com/v2/RB3l-JzYjih_7vhph0Ia15zRAEP8blYZ',
      accounts:[ '5ac5c4935982db92a505136ec2e16a78a2724425eb7fa733bdf  b03fed71249ba' ]
    }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}