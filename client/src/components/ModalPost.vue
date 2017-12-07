<template>
  <div class="modal" id="PostModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Bagi foto yuk</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
  <fieldset>
    <div class="form-group">
      <label for="inputEmail" class="col-lg-2 control-label">Caption</label>
      <div class="col-lg-10">
        <input class="form-control" placeholder="Your Caption" type="text" v-model="title">
      </div>
    </div>
    <div class="form-group">
      <label for="inputEmail" class="col-lg-2 control-label">Pict</label>
      <div class="col-lg-10">
        <input class="form-control" type="text" v-model="file">
      </div>
    </div>
  </fieldset>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="uploadPost" data-dismiss="modal">POST</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      file: ''
    }
  },
  methods: {
    uploadPost () {
      this.$store.dispatch('uploadFile', {
        title: this.title,
        fiel: this.file
      })
    }
  }
}
</script>

<style>

</style>
