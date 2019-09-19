<template>
  <div class="toolbar">
    <input type="file" class="hidden" ref="fileUpload" @change="uploadFile" accept="image/jpeg,image/png">
    <div class="btn-group" role="group" aria-label="Toolbar">
      <button @click="triggerUpload" type="button" class="btn btn-default" :class="{ disabled: uploading }">
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
        <li><a href="javascript:void(0)" @click="addText($event, '|COMPANY_NAME|')">Name</a></li>
        <li><a href="javascript:void(0)" @click="addText($event, '|COMPANY_ADDRESS|')">Address</a></li>
        <li><a href="javascript:void(0)" @click="addText($event, '|COMPANY_EMAIL|')">Email</a></li>
        <li><a href="javascript:void(0)" @click="addText($event, '|COMPANY_PHONE|')">Phone Number</a></li>
        <li><a href="javascript:void(0)" @click="addText($event, '|COMPANY_WEBSITE|')">Website</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
function textLayerObject(obj) {
  const DEFAULTS = {
    type: 'Text',
    isActive: false,
    config: {
      draggable: true,
      fill: '#000',
      fontSize: 18,
      name: new Date().getTime().toString(),
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      text: '',
      visible: true,
      x: 0,
      y: 0,
      width: 200
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

function imageLayerObject(obj) {
  const DEFAULTS = {
    type: 'Image',
    src: 'https://placehold.it/300x300',
    isActive: false,
    config: {
      draggable: true,
      height: 300,
      image: null,
      name: new Date().getTime().toString(),
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      x: 0,
      y: 0,
      width: 300
    }
  }

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
  data() {
    return {
      uploading: false,
    }
  },
  computed: {
    pageID() {
      return this.$route.params.pid;
    },
  },
  methods: {
    addLogo() {
      this.$store.commit('workspace/ADD_PAGE_LAYER', {
        layer: imageLayerObject({
          src: 'https://placehold.it/100x60',
          config: {
            height: 60,
            width: 100
          }
        }),
        pid: this.pageID
      });
    },
    addText(event, text = 'Enter text here...') {
      this.$store.commit('workspace/ADD_PAGE_LAYER', {
        layer: textLayerObject({ config: { text } }),
        pid: this.pageID
      });
    },
    triggerUpload() {
      this.$refs.fileUpload.click();
    },
    uploadFile({ target: { files } }) {
      this.uploading = true;
    }
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 15px;
}
</style>
