<template>
  <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">JepretGRAM</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="#" data-toggle="modal" data-target="#PostModal">Post Something</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" @click="logoutUser">Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    logoutUser () {
      localStorage.removeItem('tokenJepret')
      this.$router.push({name: 'HelloWorld'})
    }
  }

}
</script>

<style>

</style>
