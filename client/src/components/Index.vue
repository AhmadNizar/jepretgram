<template>
  <div>
    <navbar/>
    <div class="container">
      <timeline/>
      <modalpost/>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Modalpost from './ModalPost'
import Timeline from './Timeline'

export default {
  components: {
    Navbar,
    Modalpost,
    Timeline
  }
}
</script>

<style>

</style>
