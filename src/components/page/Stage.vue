<template>
  <div class="stage">
    <img :src="background" class="img-responsive">
  </div>
</template>

<script>
import background from '../../assets/images/leaflet.jpeg';

export default {
  data() {
    return {
      background
    }
  }
}
</script>

<style scoped>
.stage {
  border: 1px solid #ddd;
  height: 500px;
}
</style>
