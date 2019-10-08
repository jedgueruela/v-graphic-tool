<template>
  <div class="canvas">
    <v-stage
      ref="stage"
      :config="stageConfig"
      @mousedown="handleStageMouseDown"
      >
      <v-layer
        ref="layer"
        @dragmove="mainLayerDragMove"
        @dragend="mainLayerDragEnd">
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
import Konva from 'konva';

export default {
  props: ['layers'],
  data() {
    return {
      guidelineOffset: 5,
      stageConfig: {
        height: 500,
        width: 708
      }
    }
  },
  computed: {
    layerList() {
      return this.layers;
      // return this.layers.map(layer => {
      //   if (layer.type === 'Image') {
      //     const image = new Image();
      //     image.src = layer.src;
      //     image.onload = () => {
      //       layer.config.image = image;
      //       layer.config.height = image.height;
      //       layer.config.width = image.width;
      //     }
      //   }

      //   return layer;
      // });
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
    },
    // Snapping operations
    // where can we snap our objects?
    mainLayerDragMove(event) {
      // clear all previous lines on the screen
      const layer = this.$refs.layer.getStage();

      layer.find('.guid-line').destroy();

      // find possible snapping lines
      const lineGuideStops = this.getLineGuideStops(event.target);
      // find snapping points of current object
      const itemBounds = this.getObjectSnappingEdges(event.target);

      // now find where can we snap current object
      const guides = this.getGuides(lineGuideStops, itemBounds);

      console.log('guides', guides);

      // do nothing of no snapping
      if (!guides.length) {
        return;
      }

      this.drawGuides(guides);

      // now force object position
      guides.forEach(lg => {
        switch (lg.snap) {
          case 'start': {
            switch (lg.orientation) {
              case 'V': {
                event.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case 'H': {
                event.target.y(lg.lineGuide + lg.offset);
                break;
              }
            }
            break;
          }
          case 'center': {
            switch (lg.orientation) {
              case 'V': {
                event.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case 'H': {
                event.target.y(lg.lineGuide + lg.offset);
                break;
              }
            }
            break;
          }
          case 'end': {
            switch (lg.orientation) {
              case 'V': {
                event.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case 'H': {
                event.target.y(lg.lineGuide + lg.offset);
                break;
              }
            }
            break;
          }
        }
      });
    },

    mainLayerDragEnd() {
      // clear all previous lines on the screen
      const layer = this.$refs.layer.getStage();
      layer.find('.guid-line').destroy();
      layer.batchDraw();
    },
    getLineGuideStops(skipShape) {
      // we can snap to stage borders and the center of the stage
      var vertical = [0, 708 / 2, 708];
      var horizontal = [0, 500 / 2, 500];

      // and we snap over edges and center of each object on the canvas
      this.$refs.layer.getStage().parent.find('.object-*').forEach(guideItem => {
        if (guideItem === skipShape) {
          return;
        }
        var box = guideItem.getClientRect();
        // and we can snap to all edges of shapes
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
      });
      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat()
      };
    },

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    getObjectSnappingEdges(node) {
      var box = node.getClientRect();
      return {
        vertical: [{
            guide: Math.round(box.x),
            offset: Math.round(node.x() - box.x),
            snap: 'start'
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(node.x() - box.x - box.width / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(node.x() - box.x - box.width),
            snap: 'end'
          }
        ],
        horizontal: [{
            guide: Math.round(box.y),
            offset: Math.round(node.y() - box.y),
            snap: 'start'
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(node.y() - box.y - box.height / 2),
            snap: 'center'
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(node.y() - box.y - box.height),
            snap: 'end'
          }
        ]
      };
    },

    // find all snapping possibilities
    getGuides(lineGuideStops, itemBounds) {
      var resultV = [];
      var resultH = [];

      lineGuideStops.vertical.forEach(lineGuide => {
        itemBounds.vertical.forEach(itemBound => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          // if the distance between guild line and object snap point is close we can consider this for snapping
          if (diff < this.guidelineOffset) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach(lineGuide => {
        itemBounds.horizontal.forEach(itemBound => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < this.guidelineOffset) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      var guides = [];

      // find closest snap
      var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: 'V',
          snap: minV.snap
        });
      }
      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: 'H',
          snap: minH.snap
        });
      }
      return guides;
    },

    drawGuides(guides) {
      const layer = this.$refs.layer.getStage();
      let line;
      guides.forEach(lg => {
        if (lg.orientation === 'H') {
          line = new Konva.Line({
            points: [-6000, lg.lineGuide, 6000, lg.lineGuide],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6]
          });
          layer.add(line);
          layer.batchDraw();
        } else if (lg.orientation === 'V') {
          line = new Konva.Line({
            points: [lg.lineGuide, -6000, lg.lineGuide, 6000],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6]
          });
          layer.add(line);
          layer.batchDraw();
        }
      });
    }
  }
}

function formatNumber(number) {
  return Number(number.toFixed(3))
}
</script>
