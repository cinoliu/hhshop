<template>
  <div class="Vue__pagination">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="(pages.current_page == 1) ? 'disabled' : ''">
          <a href="#" @click.prevent="firstPage">{{ translation.btn_first }}</a>
        </li>
        <li :class="(pages.current_page == 1) ? 'disabled' : ''">
          <a href="#" @click.prevent="previous" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="n in items" :class="(pages.current_page == n) ? 'active': ''">
          <a href="#" @click.prevent="change(n)">{{ n }}</a>
        </li>
        <li :class="(pages.current_page == pages.last_page) ? 'disabled' : ''">
          <a href="#" @click.prevent="next" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li :class="(pages.current_page == pages.last_page) ? 'disabled' : ''">
          <a href="#" @click.prevent="lastPage(pages.last_page)">{{ translation.btn_last }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script type="text/babel">
  export default {
    props: ['pages', 'translation'],
    computed: {
      items() {
        let temp = [],
          bottomLimit = this.pages.current_page - 2,
          topLimit = this.pages.current_page + 2,
          showing = 5;

        if (bottomLimit <= 0) {
          bottomLimit = 1;
          topLimit = 5;
        }

        if (topLimit >= this.pages.last_page) {
          bottomLimit = this.pages.last_page - 4;
          topLimit = this.pages.last_page;
        }

        if (this.pages.last_page < 5) {
          showing = this.pages.last_page;
        }

        if (bottomLimit <= 0) {
          bottomLimit = 1;
        }

        if (this.pages.last_page == 0 || this.pages.last_page == 1) {
          showing = 1;
        }

        for (let i = 0; i < showing; i++) {
          temp[i] = i + bottomLimit;
        }

        return temp;
      }
    },
    methods: {
      firstPage() {
        if (this.pages.current_page != 1) {
          this.change(1);
        }
      },
      previous() {
        if (this.pages.current_page != 1) {
          this.change(--this.pages.current_page);
        }
      },
      change(page) {
        this.$emit('change', page);
      },
      next() {
        if (this.pages.current_page != this.pages.last_page) {
          this.change(++this.pages.current_page);
        }
      },
      lastPage(page){
        if (this.pages.current_page != this.pages.last_page) {
          this.change(page);
        }
      },
      changePageWithKeyBoard(key) {
        if (key === 'ArrowLeft') {
          this.previous();
        }
        else if (key === 'ArrowRight') {
          this.next();
        }
      }
    },
    created() {
      window.addEventListener('keyup', ({key}) => this.changePageWithKeyBoard(key));
    }
  }
</script>
<style lang="sass" scoped>
  .Vue__pagination {

  nav {

  .pagination {
    margin: 10px 0 !important;
  }

  }
  }
</style>