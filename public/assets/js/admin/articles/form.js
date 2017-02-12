var form = {
    el: '#app',

    data: {
        article: {},
        action: '',
        redirect: false,
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

            v.$http.post(v.action, v.article)
            .then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    v.redirect ? window.location.href = v.redirect : false;
                } else {
                    v.error = res.body.error;
                }
            });
        }
    }
};