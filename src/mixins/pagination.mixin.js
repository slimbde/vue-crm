///// mixin is merged to a component
///// mixin allows to pull out some logic data to a separate file
import _ from 'lodash'  // lodash

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [], // entire chunked items array
      items: [],    // current items array
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)    // adds query to request to get exact page
      this.items = this.allItems[page - 1] || this.allItems[0];
    }
  }
}