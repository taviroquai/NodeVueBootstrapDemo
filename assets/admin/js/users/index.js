
var users_index = {
    delimiters: ['${', '}'],
    template: '#users_index',
    props:['users'],
    data: function () {
        return {
            processing: false,
            success: false,
            error: false
        };
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