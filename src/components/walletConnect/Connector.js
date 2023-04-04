import { InjectedConnector } from '@web3-react/injected-connector';
import { ChainId } from "shibarium-get-chains";


const RPC = {
  [ChainId.ETHEREUM]: 'https://api.sushirelay.com/v1',
  // [ChainId.ETHEREUM]: 'https://eth-mainnet.alchemyapi.io/v2/HNQXSfiUcPjfpDBQaWYXjqlhTr1cEY9c',
  // [ChainId.MAINNET]: 'https://eth-mainnet.alchemyapi.io/v2/q1gSNoSMEzJms47Qn93f9-9Xg5clkmEC',
  [ChainId.ROPSTEN]: 'https://eth-ropsten.alchemyapi.io/v2/cidKix2Xr-snU3f6f6Zjq_rYdalKKHmW',
  [ChainId.RINKEBY]: 'https://eth-rinkeby.alchemyapi.io/v2/XVLwDlhGP6ApBXFz_lfv0aZ6VmurWhYD',
  [ChainId.GÖRLI]: 'https://eth-goerli.alchemyapi.io/v2/Dkk5d02QjttYEoGmhZnJG37rKt8Yl3Im',
  [ChainId.KOVAN]: 'https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER',
  [ChainId.FANTOM]: 'https://rpcapi.fantom.network',
  [ChainId.FANTOM_TESTNET]: 'https://rpc.testnet.fantom.network',
  [ChainId.MATIC]: 'https://polygon-rpc.com/',
  [ChainId.MATIC_TESTNET]: 'https://rpc-mumbai.matic.today',
  [ChainId.XDAI]: 'https://rpc.xdaichain.com',
  [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-2-s3.binance.org:8545',
  [ChainId.MOONBEAM_TESTNET]: 'https://rpc.testnet.moonbeam.network',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.AVALANCHE_TESTNET]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [ChainId.HECO]: 'https://http-mainnet.hecochain.com',
  [ChainId.HECO_TESTNET]: 'https://http-testnet.hecochain.com',
  [ChainId.HARMONY]: 'https://api.harmony.one',
  [ChainId.HARMONY_TESTNET]: 'https://api.s0.b.hmny.io',
  [ChainId.OKEX]: 'https://exchainrpc.okex.org',
  [ChainId.OKEX_TESTNET]: 'https://exchaintestrpc.okex.org',
  [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [ChainId.PALM]: 'https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267',
  [ChainId.FUSE]: 'https://rpc.fuse.io',
  [ChainId.CELO]: 'https://forno.celo.org',
  [ChainId.MOONRIVER]: 'https://rpc.moonriver.moonbeam.network',
  [ChainId.TELOS]: 'https://mainnet.telos.net/evm',
  [ChainId.SHIBARIUM]: 'https://3.145.115.238:8545',
  [ChainId.PUPPYNET517]: 'https://rpc-dev.analytics-shibaswap.com',
}

export default RPC

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97, 80001],
})

export const walletconnect = {
  connector: async () => {
    const WalletConnectConnector = (await import('@web3-react/walletconnect-connector')).WalletConnectConnector
    return new WalletConnectConnector({
      rpc: RPC,
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      supportedChainIds: [1, 3, 4, 5, 42, 97, 80001],
    })
  },
  name: 'WalletConnect',
  iconName: 'wallet-connect.svg',
  description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  href: null,
  color: '#4196FC',
  mobile: true,
}

export const coinbase = {
  connector: async () => {
    const WalletLinkConnector = (await import('@web3-react/walletlink-connector')).WalletLinkConnector
    return new WalletLinkConnector({
      url: RPC[ChainId.ETHEREUM],
      appName: 'SushiSwap',
      appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
      darkMode: true,
    })
  },
  name: 'Coinbase Wallet',
  iconName: 'coinbase.svg',
  description: 'Use Coinbase Wallet app on mobile device',
  href: null,
  color: '#315CF5',
}

export const metamskMobile = {
  name: 'MetaMask',
  iconName: 'metamask.png',
  description: 'Open in MetaMask app.',
  href: 'https://metamask.app.link/dapp/devui.hailshiba.com',
  color: '#E8831D',
  mobile: true,
  mobileOnly: true,
}