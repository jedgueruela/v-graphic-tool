<template>
  <article class="page">
    <template v-if="page">
      <section class="viewport">
        <Toolbar />
        <div class="stage">
          <Canvas v-if="hasLayers" :layers="page.layers" />
        </div>
      </section>
      <div class="lftabs">
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
            <a href="#layers" aria-controls="layers" role="tab" data-toggle="tab">
              Layers
            </a>
          </li>
          <li role="presentation">
            <a href="#filters" aria-controls="filters" role="tab" data-toggle="tab">
              Filters
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="layers">
            <Layers v-if="hasLayers" :layers="page.layers" />
            <p v-else>No layer found.</p>
          </div>
          <div role="tabpanel" class="tab-pane" id="filters">
            <Filters v-if="activeLayer" :layer="activeLayer.config" :index="activeLayer.index" :pid="pageID" />
            <template v-else>
              <p>No layer selected.</p>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="alert alert-danger">Page not found.</div>
    </template>
  </article>
</template>

<script>
import {
  Filters,
  Layers,
  Canvas,
  Toolbar
} from '../components/page';

export default {
  name: 'page',
  components: {
    Filters,
    Layers,
    Canvas,
    Toolbar
  },
  computed: {
    activeLayer() {
      const layers = this.page.layers;

      let config = null;
      let index = 0;

      for (let i = 0; i < layers.length; i++) {
        if (layers[i].isActive === true) {
          config = layers[i];
          index = i;
          break;
        }
      }

      return (config === null)
        ? false
        : { config, index };
    },
    hasLayers() {
      return (this.page.layers.length) ? true : false;
    },
    page() {
      const pid = this.$route.params.pid;
      return this.$store.getters['workspace/page'](pid);
    },
    pageID() {
      return this.$route.params.pid;
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

.stage {
  border: 1px solid #ddd;
  height: 500px;
}

.viewport {
  width: 708px;
}

.lftabs {
  bottom: 0;
  left: 739px;
  position: absolute;
  top: 15px;
  width: 250px;
}

.lftabs .tab-content {
  background: #f2f2f2;
  border-bottom: 1px solid #ddd;
  max-height: 507px;
  overflow-y: scroll;
  padding: 8px;
}
</style>
