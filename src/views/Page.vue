<template>
  <article class="page">
    <template v-if="pageExists">
      <Viewport />
      <Tabs />
    </template>
    <template v-else>
      <div class="alert alert-danger">Page not found.</div>
    </template>
  </article>
</template>

<script>
import {
  Tabs,
  Viewport
} from '../components/page';

export default {
  name: 'page',
  components: {
    Tabs,
    Viewport
  },
  computed: {
    pageExists() {
      const pid = this.$route.params.pid;
      return this.$store.getters['workspace/pageExists'](pid);
    }
  }
}
</script>

<style scoped>
.page {
  margin-left: 250px;
  margin-top: 60px;
  padding: 15px;
  position: relative;
}
</style>
