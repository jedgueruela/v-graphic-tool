<template>
  <header role="banner">
    <div class="container-fluid">
      <a class="brand" href="#">
        <img :src="logo" alt="MyVal logo">
      </a>
      <form>
        <label for="workspace-title" class="sr-only">Title</label>
        <input type="text" name="workspace-title" id="workspace-title" v-model="title">
      </form>
      <a href="#" class="btn btn-purple">Save Workspace</a>
    </div>
  </header>
</template>

<script>
import logo from '../../assets/images/myval-logo-purple-small.png';

export default {
  data() {
    return {
      logo
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.workspace.title;
      },
      set(title) {
        this.$store.commit('workspace/SET_TITLE', title);
      }
    }
  }
}
</script>

<style scoped>
header {
  background: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  left: 0;
  padding-bottom: 10px;
  padding-top: 10px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;
}

header .brand {
  margin-right: 30px;
}

header .brand img {
  height: 39px;
}

header .brand,
header form {
  float: left;
}

header form input {
  background: #f6f6f6;
  border: none;
  font-size: 17px;
  height: 39px;
  outline: none;
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.4s;
}

header form input:focus {
  background: #e7e7e7;
}

header .btn {
  float: right;
  padding-bottom: 8px;
  padding-top: 8px;
}
</style>
