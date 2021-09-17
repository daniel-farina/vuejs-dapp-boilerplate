import { createStore } from 'vuex'
const ethers = require("ethers");

export default createStore({
  state: {
    networkId: null,
    homeProvider:{
    }
  },
  mutations: {
    setHomeChainData (state, data) {
      state.homeChain = data;
    },
    setForeignChainData (state, data) {
      state.foreignChain = data;
    },
    setHomeProvider (state, data) {
      state.homeProvider = data;
    },
    setNetworkId (state, id) {
      state.networkId = id;
    }
  },
  actions: {
    async  requestAccountDetails(state) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        //Get account information
        // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];

        //Get ChainID
        const chainID = await provider.send("eth_chainId",[]);
        //Account Balance
        const homeBalance = await provider.send("eth_getBalance",[account,'latest']);
        //Account Transaction Count
        const transactionCount = await provider.send("eth_getTransactionCount",[account,'latest']);
        //Account Transaction Count
        const gasPrice = await provider.send("eth_gasPrice",[]);


        const networks = [
          {name:"Resil",value:"0xac"},
          {name:"Ethereum",value:"0x1"},
          {name:"Ropsen",value:"0x3"},
          {name:"Kovan",value:"0x2a"},
          {name:"Rinkeby",value:"0x4"}
        ];

        //Default network name
        const NETWORK_NAME = {'name': 'Unknown'};
        //Check if chainID matches one of the network names
        const network = await networks.find(elem => elem.value === chainID);

        //If results then use the correct network name
        if (network !== undefined){
          NETWORK_NAME.name = network.name;
        }

        let homeData = {
          chainID: chainID,
          netWorkName: NETWORK_NAME.name,
          account: account,
          homeBalance: homeBalance,
          transactionCount: transactionCount,
          gasPrice: gasPrice,
        }
        state.commit("setHomeProvider", homeData);

        console.log("Connected! Account number:"+account);
        console.log(homeData);

      } catch (err) {
        console.error(err);

      }
    },
  },
  modules: {
  }
})
