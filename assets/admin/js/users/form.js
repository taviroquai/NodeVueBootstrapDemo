
var form = {
    el: '#app',

    data: {
        user: {},
        action: '',
        redirect: false,
        avatar_uri: '/',
        processing: false,
        success: false,
        error: false
    },

    methods: {
        save: function(e) {

            var v = this;
            v.processing = true;
            v.success = false;
            v.error = false;

            v.$http.post(v.action, v.user)
            .then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.redirect ? window.location.href = v.redirect : false;
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