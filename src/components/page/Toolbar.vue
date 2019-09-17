<template>
  <div class="toolbar">
    <div class="btn-group" role="group" aria-label="Toolbar">
      <button type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-upload"></i> Upload image
      </button>
      <button @click="addLogo" type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-picture"></i> Logo
      </button>
      <button @click="addText" type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-text-size"></i> Text
      </button>
    </div>
    <div class="btn-group" role="group" aria-label="Toolbar">
      <button type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-tags"></i> Tags
      </button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
function createTextLayerObject(obj) {
  const DEFAULTS = {
    type: 'Text',
    isActive: false,
    config: {
      draggable: true,
      fill: '#000',
      fontSize: 18,
      name: new Date().getTime(),
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      text: '',
      visible: true,
      x: 0,
      y: 0,
      width: 150
    }
  };

  return {
    ...DEFAULTS,
    ...obj,
    config: {
      ...DEFAULTS.config,
      ...obj.config
    }   
  }
}

export default {
  methods: {
    addLogo() {
      const pid = this.$route.params.pid;
      const layer = {
        name: 'Image',
        selected: false
      };
      this.$store.commit('workspace/ADD_PAGE_LAYER', { layer, pid });
    },
    addText(text = 'Enter text here...') {
      const pid = this.$route.params.pid;
      const layer = createTextLayerObject({ text })
      this.$store.commit('workspace/ADD_PAGE_LAYER', { layer, pid });
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 15px;
}
</style>
