<template>
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
        <Layers />
      </div>
      <div role="tabpanel" class="tab-pane" id="filters">
        <Filters />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from './Filters';
import Layers from './Layers';

export default {
  components: {
    Filters,
    Layers
  }
}
</script>

<style scoped>
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
