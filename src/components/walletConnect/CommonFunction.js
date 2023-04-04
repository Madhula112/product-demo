import erc20Abi from "../../ABI/ERC20.json";

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return address.slice(0, 6) + "..." + address.slice(-3);
  };
  
  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  export const currentGasPrice = async (web3) => {
    let value;
    await web3.eth
      .getGasPrice()
      .then((res) => {
        value = parseInt(res * 2.1);
      })
      .catch((err) => {
        console.log(err)
      });
    return value;
  };

  export const allPools = (data) => {
    const set = new Set()
    const unique = data.filter(item => {
      const alreadyHas = set.has(item.id)
      set.add(item.id)
      return !alreadyHas
    }) 
    
    return unique
  }

  export const PRIVATE_KEY = "e213f6e64dcec563b8f4efde10abbd4aaed0a0dc98cb7b69326b837c2833b927"

  export const getNameSymbol = async (web3, tokenAddress) => {
    try {
      const instance = new web3.eth.Contract(erc20Abi, tokenAddress);
      const name = await instance.methods.name().call()
      const symbol = await instance.methods.symbol().call()
      return {name, symbol}
    } catch (err) {
      // console.log(err)
    }
  }