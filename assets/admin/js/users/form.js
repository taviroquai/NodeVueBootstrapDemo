
var users_form = {
    delimiters: ['${', '}'],
    template: '#users_form',
    props: ['user'],
    data: function () {
        return {
            avatar_uri: '/avatar/',
            processing: false,
            success: false,
            error: false
        };
    },
    methods: {
        setMenu: function (menu) {
            this.success = false;
            this.$emit('set_menu', menu);
        },
        save: function(e) {
            var v = this;
            v.processing = true;
            v.success = false;
            v.error = false;
            
            v.$http.post('/admin/users/save', v.user)
            .then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.$emit('users_load');
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
                    v.$forceUpdate();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        },
        removeImage: function (e) {
            this.user.image = '';
            this.user.image_upload = '';
            this.$forceUpdate();
        },
        removeUpload: function (e) {
            e.target.value = '';
            this.user.image_upload = '';
            this.$forceUpdate();
        },
        getAvatar: function () {
            return this.user.image ? 
                this.avatar_uri + this.user.id + '/' + this.user.image
                : (this.user.image_upload ? this.user.image_upload : false);
        }
    }
};