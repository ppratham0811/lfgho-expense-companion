const {Web3Context} = require("@/Context/Web3Context");
const {useContext} = require("react");

const useWeb3Context = () => {
  return useContext(Web3Context);
};

export default useWeb3Context;
