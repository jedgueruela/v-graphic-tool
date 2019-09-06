<template>
  <section class="layers">
    <ul>
      <li>
        Image
        <div class="pull-right">
          <button><i class="glyphicon glyphicon-trash"></i></button>
          <button><i class="glyphicon glyphicon-eye-close"></i></button>
          <button><i class="glyphicon glyphicon-th"></i></button>
        </div>
      </li>
      <li>
        Text
        <div class="pull-right">
          <button><i class="glyphicon glyphicon-trash"></i></button>
          <button><i class="glyphicon glyphicon-eye-close"></i></button>
          <button><i class="glyphicon glyphicon-th"></i></button>
        </div>
      </li>
    </ul>
  </section>
</template>

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

.layers ul li:first-of-type {
  border-top: 1px solid #d5d5d5;
}

.layers ul li button {
  background: none;
  border: none;
}
</style>
