import Web3 from 'web3'
const HttpProvider = "https://data-seed-prebsc-1-s3.binance.org:8545/";

export function L1Block() {
    try{
    return new Web3(new Web3.providers.HttpProvider(HttpProvider));
    }catch(error){
        console.log('Connection Error',error);
    }
}

export async function ChainId() {
    try{
    const web3test = L1Block();
    const Id = await new web3test.eth.getChainId()
    return Id
    }catch(error){
        console.log('Connection Error',error);
    }
}

