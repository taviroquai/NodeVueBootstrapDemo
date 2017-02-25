
var articles_form = {
    delimiters: ['${', '}'],
    template: '#articles_form',
    props: ['article'],
    data: function () {
        return {
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
            var url = '/admin/articles/save';
            v.processing = true;
            v.success = false;
            v.error = false;
            
            v.$http.post(url, v.article)
            .then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.$emit('articles_load');
                    v.setMenu('articles_index');
                } else {
                    v.error = res.body.error;
                }
            });
        }
    }
};