<template>
  <div class="canvas">
    <v-stage
      ref="stage"
      :config="stageConfig"
      @mousedown="handleStageMouseDown"
      >
      <v-layer ref="layer">
        <template v-for="(layer, index) in layerList">
          <v-image
            v-if="layer.type === 'Image'"
            :config="layer.config"
            :key="index"
            @click="activateLayer(index)"
            @dragstart="dragStart"
            @dragend="dragEnd"
            @transformend="transformEnd"
            />
          <v-text
            v-else
            :config="layer.config"
            :key="index"
            @click="activateLayer(index)"
            @dragstart="dragStart"
            @dragend="dragEnd"
            @transformend="transformEnd"
            />
        </template>
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
function formatNumber(number) {
  return Number(number.toFixed(3))
}

export default {
  props: ['layers'],
  data() {
    return {
      stageConfig: {
        height: 500,
        width: 708
      }
    }
  },
  computed: {
    layerList() {
      return this.layers.map(layer => {
        if (layer.type === 'Image') {
          const image = new Image();
          image.src = layer.src;
          image.onload = () => layer.config.image = image;
        }

        return layer;
      });
    },
    pageID() {
      return this.$route.params.pid;
    }
  },
  methods: {
    activateLayer(index) {
      this.$store.commit('workspace/ACTIVATE_PAGE_LAYER', {
        index,
        pid: this.pageID
      });
    },
    dragStart({ target: { index } }) {
      this.activateLayer(index);
    },
    dragEnd({ target }) {
      this.$store.commit('workspace/UPDATE_PAGE_LAYER', {
        config: {
          x: formatNumber(target.x()),
          y: formatNumber(target.y())
        },
        index: target.index,
        pid: this.pageID
      });
    },
    transformEnd({ target }) {
      this.$store.commit('workspace/UPDATE_PAGE_LAYER', {
        config: {
          rotation: formatNumber(target.rotation()),
          scaleX: formatNumber(target.scaleX()),
          scaleY: formatNumber(target.scaleY()),
        },
        index: target.index,
        pid: this.pageID
      });
    },
    handleStageMouseDown({ target }) {
      if (target === target.getStage()) {
        this.selectedLayerName = '';
        this.updateTransformer();
        return;
      }

      const clickedOnTransformer = target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked layer by its name
      const name = target.name();
      const layer = this.layers.find(r => r.config.name === name);
      if (layer) {
        this.selectedLayerName = name;
      } else {
        this.selectedLayerName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();
      const { selectedLayerName } = this;
      const selectedNode = stage.findOne('.' + selectedLayerName);

      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        transformerNode.attachTo(selectedNode);
      } else {
        transformerNode.detach();
      }
      transformerNode.getLayer().batchDraw();
    }
  }
}
</script>
