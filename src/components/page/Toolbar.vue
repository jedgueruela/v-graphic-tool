<template>
  <div class="toolbar">
    <div class="btn-group" role="group" aria-label="Toolbar">
      <button type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-upload"></i> Upload image
      </button>
      <button type="button" class="btn btn-default">
        <i class="glyphicon glyphicon-picture"></i> Logo
      </button>
      <button type="button" class="btn btn-default">
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

<style scoped>
.toolbar {
  margin-bottom: 15px;
}
</style>
