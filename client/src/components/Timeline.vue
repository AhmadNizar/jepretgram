<template>
  <div class="jumbotron">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">JepretGram tong</h3>
      </div>
      <div class="panel-body">
        <item v-for="photo in allphotos" :key="photo._id" :photo="photo"/>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './TimelineItem'

export default {
  components: {
    Item
  },
  computed: {
    allphotos () {
      return this.$store.state.photos
    }
  },
  created () {
    this.$store.dispatch('getAllPost')
  }
}
</script>

<style>

</style>
