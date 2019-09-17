function findPage(state, pid) {
  return state.pages.find(page => page.id === pid);
}

function pageLayers(state, pid) {
  return findPage(state, pid).layers;
}

export default {
  namespaced: true,
  state: {
    title: 'Untitled',
    pages: [],
  },
  getters: {
    page: state => pid => {
      return findPage(state, pid);
    }
  },
  mutations: {
    // WORKSPACE OPERATIONS
    SET_TITLE(state, title) {
      state.title = title;
    },

    // PAGES OPERATIONS
    ADD_PAGE(state) {
      state.pages.push({
        id: new Date().getTime(),
        title: 'Untitled Page',
        layers: []
      });
    },
    DELETE_PAGE(state, pid) {
      state.pages = state.pages.filter(page => page.id !== pid);
    },
    UPDATE_PAGE_TITLE(state, { title, pid }) {
      const page = findPage(state, pid);
      page.title = title;
    },
    SORT_PAGES(state, pages) {
      state.pages = pages;
    },

    // LAYERS OPERATIONS
    ADD_PAGE_LAYER(state, { layer, pid }) {
      pageLayers(state, pid).push(layer);
    },
    DELETE_PAGE_LAYER(state, { index, pid }) {
      pageLayers(state, pid).splice(index, 1);
    },
    SORT_PAGE_LAYERS(state, { layers, pid }) {
      findPage(state, pid).layers = layers;
    }
  }
}
