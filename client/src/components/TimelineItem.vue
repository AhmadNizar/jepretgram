<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <p>{{photo.title}}</p>
      <img :src="photo.imgurl"/>
    </div>
    <div class="panel-body">
      <p>Like Count: {{photo.voter_id.length}}</p>
      <button v-if="userStatus === false" class="btn btn-info" @click="likePhoto">Like</button>
    </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  props: ['photo'],
  data () {
    userStatus: ''
  },
  methods: {
    likePhoto () {
      this.$http.put(`/photos/${this.photo._id}`, {
        title: this.photo.title
      }, {
        headers: {
          token: localStorage.getItem('tokenJepret')
        }
      })
      .then(({data}) => console.log(data))
      .catch(err => console.error(err))
    }
  },
  created () {
    var decoded = jwt.decode(localStorage.getItem('tokenJepret'))
    console.log(decoded)
    console.log(this.photo)
    if (this.photo.user_id === decoded._id) {
      this.userStatus = true
    } else {
      this.userStatus = false
    }
  }
}
</script>

<style>

</style>
