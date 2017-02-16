var admin = {
    el: '#app',
    data: {
        menu: 'dashboard',
        users: [],
        edit_user: {
            id: 0,
            username: '',
            email: '',
            image: ''
        }
    },
    beforeCreate: function () {
        var v = this;
        var url = '/admin/users/table';
        v.$http.get(url).then((res) => {
            v.users = res.data.success ? res.data.items : [];
        });
    },
    methods: {
        editUser: function (user) {
            this.edit_user = user;
            this.menu = 'users_form';
        },
        saveUser: function () {
            this.menu = 'users_index';
        },
        setMenu: function (menu) {
            this.menu = menu;
        },
        isActive: function (item) {
            return this.menu.indexOf(item) >= 0;
        }
    }
};