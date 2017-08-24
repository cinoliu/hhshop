import Vue from 'vue/dist/vue.js';
import Datasource from './Datasource.vue';

var data = {
  "pagination": {
    "total": 4,
    "per_page": 15,
    "current_page": 1,
    "last_page": 1,
    "next_page_url": null,
    "prev_page_url": null,
    "from": 1,
    "to": 4
  },
  "data": [
    {
      "id_grupo": 1,
      "tipo_grupo": "1",
      "nombre_grupo": "All",
      "estado_grupo": "1",
      "created_at": "2016-12-06 14:18:54",
      "updated_at": "2016-12-06 14:18:54",
      "deleted_at": null,
      "detalle_grupos_count": "4"
    },
    {
      "id_grupo": 2,
      "tipo_grupo": "1",
      "nombre_grupo": "Ladies",
      "estado_grupo": "1",
      "created_at": "2016-12-06 14:18:54",
      "updated_at": "2016-12-06 14:18:54",
      "deleted_at": null,
      "detalle_grupos_count": "1"
    },
    {
      "id_grupo": 3,
      "tipo_grupo": "2",
      "nombre_grupo": "Mens",
      "estado_grupo": "2",
      "created_at": "2016-12-06 14:18:54",
      "updated_at": "2016-12-06 14:18:54",
      "deleted_at": null,
      "detalle_grupos_count": "3"
    },
    {
      "id_grupo": 4,
      "tipo_grupo": "1",
      "nombre_grupo": "Chiefs",
      "estado_grupo": "1",
      "created_at": "2016-12-06 14:18:54",
      "updated_at": "2016-12-06 14:18:54",
      "deleted_at": null,
      "detalle_grupos_count": "1"
    },
    {
      "id_grupo": 5,
      "tipo_grupo": "2",
      "nombre_grupo": "Operators",
      "estado_grupo": "1",
      "created_at": "2016-12-06 14:18:54",
      "updated_at": "2016-12-06 14:18:54",
      "deleted_at": null,
      "detalle_grupos_count": "1"
    }
  ]
};

new Vue({
  el: '#app',
  components: {
    Datasource
  },
  data() {
    return {
      groups: {
        pagination: {},
        data: []
      },
      columns: [
        {
          name: 'Id',
          key: 'id_grupo',
          filter: false,
          render(value) {
            return `# ${value}`;
          }
        },
        {
          name: 'Name',
          key: 'nombre_grupo',
          filter: false
        },
        {
          name: 'Type',
          key: 'tipo_grupo',
          filter: false,
          render(value) {
            switch (value) {
              case '1':
                return 'Global';
                break;
              case '2':
                return '<b>General</b>';
                break;
              case '3':
                return 'Personal';
                break;
            }
          }
        },
        {
          name: 'Total',
          key: 'detalle_grupos_count',
          filter: false,
        },
        {
          name: 'Date',
          key: 'created_at',
          filter: false
        },
      ],
      actions: [
        {
          text: 'Edit',
          icon: 'glyphicon glyphicon-pencil',
          class: 'btn-primary',
          event(e, row) {
            console.warn('Did clicked me?', e);
            if (row == null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row));
            }
          }
        },
        {
          text: 'Delete',
          icon: 'glyphicon glyphicon-trash',
          class: 'btn-danger',
          event(e, row) {
            console.warn('Are you clicked me?', e);
            if (row == null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row));
            }
          }
        },
        {
          text: 'Show',
          icon: 'glyphicon glyphicon-eye-open',
          class: 'btn-info',
          event(e, row) {
            console.warn('Are you clicked me?', e);
            if (row == null) {
              console.info('Ups.. data not found :(')
            } else {
              console.info('Yeeei, I found this :)', JSON.stringify(row));
            }
          }
        }
      ]
    }
  },
  mounted() {
    this.groups = data;
  },
  methods: {
    changePage(values) {
      alert(`Show limit changed, the new limit is ${values.perpage} and the current page is ${values.page}`);
    },
    onSearch(searchQuery) {
      alert(`Did you find this? ${searchQuery}`);
    }
  }
});