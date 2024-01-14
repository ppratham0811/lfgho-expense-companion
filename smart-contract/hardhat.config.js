require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150,
          }
        }
      },

      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150,
          },
        }
      },
    ]
  },
  networks: {
    forking: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.API_KEY}`,
    }
  }
};
