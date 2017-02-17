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
    created: function () {
        this.resetUsers();
    },
    methods: {
        resetUsers: function () {
            var v = this;
            this.edit_user = {
                id: 0,
                username: '',
                email: '',
                image: ''
            };
            var url = '/admin/users/table';
            v.$http.get(url).then((res) => {
                v.users = res.data.success ? res.data.items : [];
            });
        },
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