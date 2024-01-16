require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {}
      },
      {
        version: "0.8.20",
        settings: {}
      },

    ]
  },
  networks: {
    forking: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`,
    }
  }
};
