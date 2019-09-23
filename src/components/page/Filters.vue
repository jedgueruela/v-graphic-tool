<template>
  <fieldset>
    <template v-if="layer.type === 'Text'">
      <div class="form-group">
        <label for="text">Text</label>
        <input
          id="text"
          class="form-control"
          type="text"
          name="text"
          :value="layer.config.text"
          @input="updateLayer"
          >
      </div>
      <div class="form-group">
        <label for="fill">Fill</label>
        <input
          id="fill"
          class="form-control"
          type="text"
          name="fill"
          :value="layer.config.fill"
          @input="updateLayer"
          >
      </div>
      <div class="form-group">
        <label for="fontSize">Font Size</label>
        <input
          id="fontSize"
          class="form-control"
          type="number"
          name="fontSize"
          :value="layer.config.fontSize"
          @input="updateLayer"
          >
      </div>
    </template>
    <template v-if="layer.type === 'Image'">
      <div class="form-group">
        <label for="height">Height</label>
        <input
          id="height"
          class="form-control"
          type="number"
          name="height"
          :value="layer.config.height"
          @input="updateLayer"
          >
      </div>
    </template>
    <div class="form-group">
      <label for="width">Width</label>
      <input
        id="width"
        class="form-control"
        type="number"
        name="width"
        :value="layer.config.width"
        @input="updateLayer"
        >
    </div>
    <div class="form-group">
      <label for="x">X</label>
      <input
        id="x"
        class="form-control"
        type="number"
        name="x"
        :value="layer.config.x"
        @input="updateLayer"
        >
    </div>
    <div class="form-group">
      <label for="y">Y</label>
      <input
        id="y"
        class="form-control"
        type="number"
        name="y"
        :value="layer.config.y"
        @input="updateLayer"
        >
    </div>
    <div class="form-group">
      <label for="scaleX">Scale X</label>
      <input
        id="scaleX"
        class="form-control"
        type="number"
        name="scaleX"
        :value="layer.config.scaleX"
        @input="updateLayer"
        >
    </div>
    <div class="form-group">
      <label for="scaleY">Scale Y</label>
      <input
        id="scaleY"
        class="form-control"
        type="number"
        name="scaleY"
        :value="layer.config.scaleY"
        @input="updateLayer"
        >
    </div>
    <div class="form-group">
      <label for="rotation">Rotation</label>
      <input
        id="rotation"
        class="form-control"
        type="number"
        name="rotation"
        :value="layer.config.rotation"
        @input="updateLayer"
        >
    </div>
  </fieldset>
</template>

<script>
export default {
  props: ['layer', 'index', 'pid'],
  methods: {
    updateLayer({ target: { name, value }}) {
      if (name !== 'text' && name !== 'fill') {
        value = formatNumber(Number(value));
      }

      this.$store.commit('workspace/UPDATE_PAGE_LAYER', {
        config: {
          [name]: value
        },
        index: this.index,
        pid: this.pid
      });
    }
  }
}

function formatNumber(number) {
  return Number(number.toFixed(3))
}
</script>
