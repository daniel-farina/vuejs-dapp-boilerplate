<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <div class="connectBox">
      <!--Check if MetaMask is installed-->
      <div v-if="isMetaMaskInstalled">
        <div  v-if="!homeProvider.account">
          <h3>Connect Wallet</h3>
          <p>To get started, connect your wallet.</p>
          <button class="btn btn-sm btn-primary" v-on:click="connectAccount()"> Connect via MetaMask</button>
        </div>
      </div>
      <div v-else>
        Metamask is not installed.
        <div><a href="#" class="btn btn-primary bt-md" v-on:click="startOnboarding()" >Please click here to install it.</a></div>
      </div>

      <!--Wrong Network Message-->
      <div v-if="!isValidNetwork && isLoggedIn">
        <h3>Wrong network</h3>
        <p>Please, add and connect the to Resil Chain.</p>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn btn-sm btn-primary" v-on:click="addChain()"> Connect to Resil</button>
          <button class="btn btn-sm btn-secondary" v-on:click="disconnect()"> Disconnect</button>

        </div>
      </div>

      <!--Connected Layout-->
      <div v-if="isValidNetwork && isLoggedIn">
        <h3>Connected</h3>
        <p>Trasnfer money UI will be here...</p>
        <div>
          <button class="btn btn-sm btn-primary" v-on:click="addToken()"> Add Stake Token</button>
              <div class="p-4"> <b>Provider's Data</b></div>
              <div>{{homeProvider}}</div>
        </div>

        <button class="btn btn-sm btn-primary" v-on:click="disconnect()"> Disconnect</button>

        <div>

        </div>


      </div>
    </div>
  </div>
</template>

<script>
  //State from Vuex -> https://vuex.vuejs.org/
  import { mapState } from 'vuex'
  //Ethers - library for interacting with the Ethereum Blockchain and its ecosystem
  import { ethers } from "ethers";
  // Detect ethereum provider utility
  import detectEthereumProvider from '@metamask/detect-provider'
  //Notifications
  import { useToast } from "vue-toastification";
  //Onboarding for Metamask
  import MetaMaskOnboarding from '@metamask/onboarding';
  //Some of this will be moved to a .env

  //Import data
  import {
    NETWORKS
  } from '@/constants/networks.js'

  export default {
    name: 'bridge',
    data: function () {
      return {
        "isMetaMaskInstalled": false
      }
    },
    created(){
      //Check metamask is installed
      this.checkMetaMask();
      this.checkInternet();

      //React to paths on load
      if (this.$route.name === "Login") {
        this.connectAccount();
        this.$router.push({ path: '/' })
      }
      if (this.$route.name === "Logout") {
        this.disconnect();
        this.$router.push({ path: '/' })
      }

    },
    setup() {
      //Setup notifications
      const toast = useToast();
      return { toast }
    },
    methods : {
      async checkMetaMask() {
        //Detect ethereum Provider
        const provider = await detectEthereumProvider()
        if (provider) {
          //If Ethereum provider is detected then create events triggers
          ethereum.on('accountsChanged', this.requestAccountDetails);
          ethereum.on('chainChanged', this.requestAccountDetails);
          this.isMetaMaskInstalled = true;
          console.log('Ethereum successfully detected!');
        } else {
          this.isMetaMaskInstalled = false;
          console.error('Please install MetaMask!')
        }
      },
      startOnboarding(){
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding()
      },
      async  connectAccount() {
        this.checkInternet();
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          //Get account information
          const accounts = await provider.send("eth_requestAccounts", []);
          this.requestAccountDetails();
        } catch (err) {
          if (err.code === 4001) {
            this.toast.warning("You must connect with Metamask in order to use this Dapp.");
          } else if (err.code === -32002) {
            this.toast.warning("There is already a Metamask request. Please accept it.");
          } else {
            console.error(err);
          }
        }
      },
      requestAccountDetails() {
        //Dispatch store method to get accounts details and save them in the store
        this.$store.dispatch("requestAccountDetails").then( () => {
          if(this.homeProvider.length !== 0){
            this.toast.success("Connected.");
          }
        }
      );
      },
      async  disconnect() {
        //Removing data from store will reset the UI
        this.$store.commit("setHomeProvider", {});
      },
      async  checkInternet() {
        const isOnline = require('is-online');
        let isOnlineCheck = await isOnline();
        if (!isOnlineCheck){
          this.toast.warning("No internet connection.");
          return false;
        }else {
          console.log("Checked internet connectivity"); // cannot connect to a server or error occurred.
          return true;
        }
      },
      /*
      ADD TOKEN
       */
      async addToken(){
        const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
        const tokenSymbol = 'STK';
        const tokenDecimals = 18;
        const tokenImage = 'http://placekitten.com/200/300';

        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
              },
            },
          });

          if (wasAdded) {
            this.toast.success("You token has been added to your MetaMask wallet.");
            console.log('Thanks for your interest!');
          } else {
            this.toast.warning("The token was not added to your MetaMask wallet.");

            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
          this.toast.error(error);

        }
      },
      /*
      ADD CHAIN
       */
      async addChain(){
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const networkData = {
          chainId: '0xAC',
          chainName: 'Resil',
          nativeCurrency: {
            name: 'LUSD',
            symbol: 'LUSD',
            decimals: 18,
          },
          rpcUrls: ['https://rpc.latam-blockchain.com'],
          blockExplorerUrls: ['https://google.com/'],
          iconUrls: ['https://gblobscdn.gitbook.com/spaces%2F-MendG3CmDhj8SU5cDta%2Favatar-1626514264309.png?alt=media'],
        };

        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await provider.send("wallet_addEthereumChain",[networkData],);

          if (wasAdded) {
            this.toast.success("You network has been added to your MetaMask wallet.");
            this.requestAccountDetails();
          } else {
            this.toast.warning("The network was not added to your MetaMask wallet.");
            console.log('Your loss!');
          }
        } catch (error) {
          console.log(error);
          this.toast.error(error);

        }
      },
      async getBalance(){
        const balanceData = {
          address: this.homeProvider.account,
        };
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const getBalance = await ethereum.request({
            method: 'wallet_getBalance',
            params: [balanceData],
          });
          if (getBalance) {
            return  getBalance;
          } else {
            this.toast.warning("The was a problem obtaining the Balance.");
          }
        } catch (error) {
          console.log(error);
          this.toast.error(error);

        }
      }

    },
    computed: {
      homeProvider() {
        return this.$store.state.homeProvider;
      },
      chainId() {
        return this.$store.state.homeProvider.chainID;
      },
      isValidNetwork: function () {
        if(this.chainId == 1 || this.chainId == 4 || this.chainId == 172){
          return true;
        }
      },
      isLoggedIn: function () {
        if(Object.keys(this.homeProvider).length == 0){
          return false;
        }else {
          return true;
        }
      }
    },
    watch: {
      $route: function() {
        if (this.$route.path === "/login") {
          this.connectAccount();
        }else if (this.$route.path === "/logout")
        {
          this.disconnect();
        }
      },
      immediate: true
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


  .connectBox {
    background: rgba(0, 0, 0, 0);
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    .connectBox {
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }

  .connectBox {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;

    box-shadow: rgb(117 129 141 / 10%) 0px 15px 30px;
    border-radius: 12px;
    width: 440px;
    padding: 30px;
    min-height: 100px;
    z-index: 2;
  }

  .flexbox-container {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    align-items: center;
    height: 100%;
  }
</style>
