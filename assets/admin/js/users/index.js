
var users_index = {
    delimiters: ['${', '}'],
    template: '#users_index',
    props:['users'],
    data: function () {
        return {
            headers: [
                { title: 'ID', data: 'id' },
                { title: 'Username', data: 'username', class: 'hidden-xs' },
                { title: 'Email', data: 'email' },
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
        users: function (rows, old) {
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
                data: v.users,
                initComplete: function () {
                    
                    // Init events
                    $(v.$el).on('click', 'table .edit', function () {
                        var user = v.dtHandle.row( $(this).parents('tr') ).data();
                        v.edit(user);
                    });
                    $(v.$el).on('click', 'table .trash', function () {
                        var user = v.dtHandle.row( $(this).parents('tr') ).data();
                        v.del(user);
                    });
                }
            });
        }
    },
    methods: {
        formNew: function () {
            var user = {
                id: 0,
                username: '',
                email: '',
                image: '',
                image_upload: false
            };
            this.$emit('edit_user', user);
        },
        edit: function (user) {
            this.$emit('edit_user', user);
        },
        del: function(item) {
            var v = this;
            var url = '/admin/users/del/' + item.id;
            v.processing = true;
            v.success = false;
            v.error = false;
            
            v.$http.get(url).then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.$emit('users_load');
                } else {
                    v.error = res.body.error;
                }
            });
        }
    }
};