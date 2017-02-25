var articles_index = {
    delimiters: ['${', '}'],
    template: '#articles_index',
    props:['articles'],

    data: function () {
        return {
            headers: [
                { title: 'ID', data: 'id' },
                { title: 'Title', data: 'title' },
                {
                    data: 'id',
                    orderable: false,
                    searchable: false,
                    render: function (id, a, row) {
                        return '<a class="btn btn-danger btn-sm pull-right trash">' 
                            + '<i class="fa fa-trash"></i>' 
                            + '</a>&nbsp;'
                            + '<a class="btn btn-success btn-sm pull-right edit">' 
                            + '<i class="fa fa-pencil"></i>' 
                            + '</a>';
                    }
                }
            ],
            dtHandle: null,
            processing: false,
            success: false,
            error: false
        };
    },
    
    watch: {
        articles: function (rows, old) {
            var v = this;
            
            // Update if already exists
            if (v.dtHandle) {
                v.dtHandle.clear();
                v.dtHandle.rows.add(rows);
                v.dtHandle.draw();
                return;
            }
            
            // Create datatables instance
            v.dtHandle = $(v.$el).find('table').DataTable({
                columns: v.headers,
                data: v.articles,
                initComplete: function () {
                    
                    // Init events
                    $(v.$el).on('click', 'table .edit', function () {
                        var row = v.dtHandle.row( $(this).parents('tr') ).data();
                        v.edit(row);
                    });
                    $(v.$el).on('click', 'table .trash', function () {
                        var row = v.dtHandle.row( $(this).parents('tr') ).data();
                        v.del(row);
                    });
                }
            });
        }
    },

    methods: {
        formNew: function () {
            var article = {
                id: 0,
                title: ''
            };
            this.$emit('edit_article', article);
        },
        edit: function (article) {
            this.$emit('edit_article', article);
        },
        del: function(item) {
            var v = this;
            var url = '/admin/articles/del/' + item.id;
            v.processing = true;
            v.success = false;
            v.error = false;
            
            v.$http.get(url).then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.$emit('articles_load');
                } else {
                    v.error = res.body.error;
                }
            });
        }
    }
};