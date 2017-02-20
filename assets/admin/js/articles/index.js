var articles_index = {
    delimiters: ['${', '}'],
    template: '#articles_index',
    props:['articles'],

    data: function () {
        return {
            processing: false,
            success: false,
            error: false
        };
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