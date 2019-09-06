<template>
  <section class="viewport">
    <Toolbar />
    <Stage />
  </section>
</template>

<script>
import Stage from './Stage';
import Toolbar from './Toolbar';

export default {
  components: {
    Stage,
    Toolbar
  }
}
</script>

<style scoped>
.viewport {
  width: 708px;
}
</style>
