<template>
  <section class="layers">
    <draggable tag="ul" v-model="layerList" group="layerList" @start="drag=true" @end="drag=false" handle=".layer-drag">
      <li 
        v-for="(layer, index) in layerList"
        :key="index"
        :class="{ active: layer.isActive, visible: layer.config.visible }"
        @click="activateLayer(index)">
        {{ layer.type }}
        <div class="pull-right">
          <button class="layer-hide" @click.stop="hideLayer(index)"><i class="glyphicon glyphicon-eye-close"></i></button>
          <button @click.stop="deleteLayer(index)"><i class="glyphicon glyphicon-trash"></i></button>
          <button class="layer-drag"><i class="glyphicon glyphicon-th"></i></button>
        </div>
      </li>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props: ['layers'],
  components: {
    draggable
  },
  computed: {
    layerList: {
      get() {
        return this.layers;
      },
      set(layers) {
        this.$store.commit('workspace/SORT_PAGE_LAYERS', { layers, pid: this.pageID });
      }
    },
    pageID() {
      return this.$route.params.pid;
    },
  },
  methods: {
    activateLayer(index) {
      this.$store.commit('workspace/ACTIVATE_PAGE_LAYER', {
        index,
        pid: this.pageID
      });
    },
    deleteLayer(index) {
      this.$store.commit('workspace/DELETE_PAGE_LAYER', {
        index,
        pid: this.pageID
      });
    },
    hideLayer(index) {
      this.$store.commit('workspace/HIDE_PAGE_LAYER', {
        index,
        pid: this.pageID
      });
    }
  }
}
</script>

<style scoped>
.layers ul {
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;
}

.layers ul li {
  background: #e6e6e6;
  border-bottom: 1px solid #d5d5d5;
  color: #212324;
  padding: 8px;
}

.layers ul li.active {
  background: #ccc;
}

.layers ul li:not(.visible) button.layer-hide,
.layers ul li:hover button.layer-hide {
  visibility: visible;
}

.layers ul li:first-of-type {
  border-top: 1px solid #d5d5d5;
}

.layers ul li button {
  background: none;
  border: none;
}

.layers ul li button.layer-hide {
  visibility: hidden;
}
</style>
