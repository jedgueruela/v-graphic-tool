<template>
  <article class="page">
    <Viewport />
    <Tabs />
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
