export default {
  namespaced: true,
  state: {
    title: 'Untitled',
    pages: [],
  },
  getters: {
    activePage() {
      return this.state.pages.find(page => page.isActive);
    }
  },
  mutations: {
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
    EDIT_PAGE(state, { title, index }) {
      state.pages[index].title = title;
    },
    SORT_PAGES(state, pages) {
      state.pages = [ ...pages ];
    }
  }
}
