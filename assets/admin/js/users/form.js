
var users_form = {
    delimiters: ['${', '}'],
    template: '#users_form',
    props: ['user'],
    data: function () {
        return {
            action: '/admin/users/save',
            redirect: '/admin/users',
            avatar_uri: '/avatar/',
            processing: false,
            success: false,
            error: false
        };
    },
    methods: {
        setMenu: function (menu) {
            this.$emit('set_menu', menu);
        },
        save: function(e) {
            var v = this;
            var url = '/admin/users/save';
            v.processing = true;
            v.success = false;
            v.error = false;
            console.log(url); return;
            v.$http.post(v.action, v.user)
            .then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.setMenu('users_index');
                } else {
                    v.error = res.body.error;
                }
            });
        },
        selectImage: function(e) {
            var v = this;
            if (e.target.files.length) {
                var reader = new FileReader();
                reader.onload = (re) => {
                    v.user.image_upload = re.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        removeImage: function (e) {
            this.user.image = '';
            this.user.image_upload = '';
        }
    },
    computed: {
        getAvatarUrl: function () {
            return this.user.image !== '' ? 
                this.avatar_uri + this.user.id + '/' + this.user.image
                : false;
        }
    }
};