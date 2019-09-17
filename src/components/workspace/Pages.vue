<template>
  <section class="pages">
    <h4>Pages</h4>
    <nav role="navigation">
      <draggable tag="ul" v-model="pages" group="pages" @start="drag=true" @end="drag=false" handle=".page-drag">
        <li v-for="page in pages" :key="page.id" :class="{ active: idIsParam(page.id) }">
          <input type="text" @input="updatePageTitle($event, page.id)" :value="page.title">
          <div class="pull-right">
            <router-link :to="{ name: 'page', params: { pid: page.id } }">
              <i class="glyphicon glyphicon-eye-open"></i>
            </router-link>
            <button @click="deletePage(page.id)"><i class="glyphicon glyphicon-trash"></i></button>
            <button class="page-drag"><i class="glyphicon glyphicon-th"></i></button>
          </div>
        </li>
      </draggable>
    </nav>
    <div class="pages-actions">
      <button @click="addPage" class="btn btn-purple">Add Page</button>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  computed: {
    pages: {
      get() {
        return this.$store.state.workspace.pages;
      },
      set(pages) {
        this.$store.commit('workspace/SORT_PAGES', pages);
      }
    }
  },
  methods: {
    addPage() {
      this.$store.commit('workspace/ADD_PAGE');
    },
    idIsParam(id) {
      return id === this.$route.params.pid;
    },
    deletePage(pid) {
      if (!confirm("Are you sure you want to delete this page?")) {
        return;
      }

      this.$store.commit('workspace/DELETE_PAGE', pid);
    },
    updatePageTitle(event, pid) {
      const title = event.target.value;
      this.$store.commit('workspace/UPDATE_PAGE_TITLE', { title, pid });
    }
  }
}
</script>

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

.pages nav ul li.active {
  background: #ccc;
  position: relative;
}

.pages nav ul li.active:after {
  background: #7f4996;
  content: "";
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 5px;
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
  width: 100%;
}
</style>
