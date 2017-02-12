var index = {
    el: '#app',

    data: {
        processing: false,
        success: false,
        error: false
    },

    methods: {
        del: function(e) {

            var v = this;
            var el = e.currentTarget;
            var url = el.getAttribute('href');
            v.processing = true;
            v.success = false;
            v.error = false;

            v.$http.get(url).then((res) => {
                v.processing = false;
                if (res.body && res.body.success) {
                    v.success = true;
                    $(el).closest('tr').remove();
                } else {
                    v.error = res.body.error;
                }
            });
        }
    }
};