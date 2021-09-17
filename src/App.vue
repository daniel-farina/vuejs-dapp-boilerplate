<template>

  <div class="bk">

    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
      <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample03">
          <ul class="navbar-nav me-auto mb-2 mb-sm-0">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" :to="{ name: 'Home'}">Home</router-link>
            </li>
          </ul>
          <form>
            <div v-if="!isValidNetwork && isLoggedIn">
              <router-link type="button" class="btn btn-primary" :to="{ name: 'Logout'}" >Disconnect</router-link>
            </div>
            <div v-else>
              <div v-if="isLoggedIn">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a type="button" class="btn btn-primary" alt="{{homeProvider.account}}">{{shortAccount}}</a>
                  <a type="button" class="btn btn-primary">{{homeProvider.netWorkName}}</a>
                </div>
              </div>
              <div v-else>
                <router-link type="button" class="btn btn-primary" :to="{ name: 'Login'}" >Connect</router-link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </nav>


    <router-view>

    </router-view>

  </div>

</template>

<script>
  export default {
    name: 'App',
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
      },
      shortAccount: function () {
        if(Object.keys(this.homeProvider).length == 0){
          return "Not connected";

        }else {
          return  this.homeProvider.account.substring(0,6)+"..."+this.homeProvider.account.substring(this.homeProvider.account.length - 3);

        }
      }
    }
  }
</script>


<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.Routerview{
  z-index: 2;
}

nav {
  z-index: 2;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


/* CSS which you need for blurred box */
.bk{
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: relative;
  overflow: hidden;
}


</style>
