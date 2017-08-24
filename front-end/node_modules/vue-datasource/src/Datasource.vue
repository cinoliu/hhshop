<template>
  <div class="vue-datasource">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="form-inline">
          <!--limits-->
          <div class="form-group pull-left">
            <label class="control-label pr2">{{ translation.table.label_limits }}</label>
            <select class="form-control" v-model="perpage" number>
              <option v-for="limit in limits" :value="limit">{{ limit }}</option>
            </select>
          </div><!--/limits-->
          <!--search-input-->
          <div class="form-group pull-right">
            <input class="form-control" type="text"
                   v-model="search"
                   :placeholder="translation.table.placeholder_search">
            <button type="button" class="btn btn-primary"
                    @click.prevent="searching">{{ translation.table.label_search }}
            </button>
          </div><!--/search-input-->
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="panel-body Vue__panel-body">
        <table class="table table-striped Vue__table">
          <thead>
          <tr>
            <!--columns-->
            <th v-for="column in columns">{{ column.name }}</th>
            <!--/columns-->
          </tr>
          </thead>
          <tbody>
          <tr v-if="pagination.total == 0">
            <td :colspan="columns.length">{{ translation.table.records_not_found }}</td>
          </tr>
          <!--rows-->
          <tr v-else
              :class="{ 'success': (index == indexSelected) }"
              v-for="(row, index) in tableData"
              @click.prevent="selectRow(row, index)">
            <td v-for="k in columns" v-html="fetchFromObject(row, k.key, k.render)"></td>
          </tr>
          <!--/rows-->
          <tr>
            <!--info-table-->
            <td class="text-center" :colspan="columns.length">
              {{ tableInfo }}
            </td>
            <!--/info-table-->
          </tr>
          </tbody>
        </table>
      </div>
      <div class="panel-footer Vue__panel-footer">
        <div class="pull-left">
          <!--actions-buttons-->
          <div class="btn-group Vue__datasource_actions">
            <button class="btn btn-default" type="button"
                    :class="btn.class"
                    v-for="btn in actions"
                    @click="btn.event($event, selected)">
              <i class="pr1" v-if="btn.icon" :class="btn.icon"></i>
              {{ btn.text }}
            </button>
          </div>
          <!--/actions-buttons-->
        </div>
        <div class="pull-right">
          <!--pagination-->
          <pagination :pages="pagination" :translation="translation.pagination" @change="changePage"></pagination>
          <!--/pagination-->
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Utils from './utils/DatasourceUtils';
  import Language from './utils/DatasourceLanguage';
  import Pagination from './components/Pagination.vue';

  export default {
    components: {
      Pagination
    },
    props: {
      /**
       * Table information
       * @type {Array}
       */
      tableData: {
        type: Array,
        required: true
      },
      /**
       * Defines the table labels language
       * @type {String}
       */
      language: {
        type: String,
        default: 'es'
      },
      /**
       * Columns to display
       * @type {Array}
       */
      columns: {
        type: Array,
        required: true
      },
      /**
       * Pagination information about the table data
       * @type {Object}
       */
      pagination: {
        type: Object,
        default() {
          return {
            total: 0,
            to: 0,
            from: 0,
            per_page: 15
          }
        }
      },
      /**
       * Action buttons
       * @type {Array}
       */
      actions: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        limits: [1, 5, 10, 15, 20], // values that the user can select to display records
        perpage: 15, // default value to show records
        selected: null, // row and Object selected on click event
        indexSelected: -1, // index row selected on click event
        search: '' // word to search in the table
      }
    },
    computed: {
      /**
       * Defines the table labels language
       * @return {Object}
       */
      translation() {
        return Language.translations[this.language];
      },
      tableInfo: Utils.tableInfo
    },
    methods: {
      fetchFromObject: Utils.fetchFromObject,
      changePage: Utils.changePage,
      selectRow: Utils.selectRow,
      searching() {
        this.selected = null;
        this.indexSelected = -1;
        this.$emit('searching', this.search);
      }
    },
    watch: {
      /**
       * Handle show limit changed.
       * @return {void}
       */
      perpage() {
        this.selected = null;
        this.indexSelected = -1;
        this.$emit('change', {perpage: this.perpage, page: 1});
      },
      tableData() {
        this.selected = null;
        this.indexSelected = -1;
      }
    }
  }
</script>
<style lang="sass" scoped>
  .vue-datasource {

  .Vue__panel-body {
    padding: 0;

  .Vue__table {
    margin-bottom: 0;
  }

  }
  .Vue__panel-footer {

  .Vue__datasource_actions {
    margin: 10px 0;
  }

  }
  }
</style>