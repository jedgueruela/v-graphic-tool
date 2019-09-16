export default {
  namespaced: true,
  state: {
    title: 'Untitled',
    pages: [],
  },
  getters: {
    pageExists: state => pid => {
      const page = state.pages.find(page => page.id === pid);
      return Boolean(page);
    },
    // layersByPage: (state, getters) => pid => {
    //   const page = getters.pageById(pid);
    //   return page.layers || [];
    // }
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
        isActive: true
      });
    },
    DELETE_PAGE(state, index) {
      state.pages.splice(index, 1);
    },
    UPDATE_PAGE_TITLE(state, { title, index }) {
      state.pages[index].title = title;
    },
    SORT_PAGES(state, pages) {
      state.pages = pages;
    }
  }
}
