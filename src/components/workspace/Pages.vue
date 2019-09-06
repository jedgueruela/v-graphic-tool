<template>
  <section class="pages">
    <h4>Pages</h4>
    <nav role="navigation">
      <ul>
        <li>
          <input type="text" value="Front">
          <div class="pull-right">
            <button><i class="glyphicon glyphicon-trash"></i></button>
            <button><i class="glyphicon glyphicon-th"></i></button>
          </div>
        </li>
        <li>
          <input type="text" value="Back">
          <div class="pull-right">
            <button><i class="glyphicon glyphicon-trash"></i></button>
            <button><i class="glyphicon glyphicon-th"></i></button>
          </div>
        </li>
      </ul>
    </nav>
    <div class="pages-actions">
      <a href="#" class="btn btn-purple">Add New</a>
    </div>
  </section>
</template>

<style scoped>
.pages {
  background: #f2f2f2;
  bottom: 0;
  color: white;
  left: 0;
  position: fixed;
  top: 60px;
  width: 250px;
}

.pages h4 {
  background: #333;
  color: white;
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0;
  padding: 15px;
  text-transform: uppercase;
}

.pages nav ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.pages nav ul li {
  background: #e6e6e6;
  border-bottom: 1px solid #d5d5d5;
  color: #212324;
  display: block;
  padding: 8px 15px;
  text-decoration: none;
}

.pages nav ul li input {
  background: none;
  border: none;
  outline: none;
  width: 150px;
}

.pages nav ul li button {
  background: none;
  border: none;
}

.pages .pages-actions {
  bottom: 0;
  left: 0;
  padding: 15px;
  position: absolute;
  width: 100%;
}

.pages .pages-actions .btn {
  display: block;
}
</style>
