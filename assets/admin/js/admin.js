var admin = {
    el: '#app',
    data: {
        menu: 'dashboard',
        articles: [],
        edit_article: {
            id: 0,
            title: '',
            body: ''
        },
        users: [],
        edit_user: {
            id: 0,
            username: '',
            email: '',
            image: ''
        }
    },
    created: function () {
        this.resetArticles();
        this.resetUsers();
    },
    methods: {
        resetArticles: function () {
            var v = this;
            this.edit_article = {
                id: 0,
                title: '',
                body: ''
            };
            var url = '/admin/articles/table';
            v.$http.get(url).then((res) => {
                v.articles = res.data.success ? res.data.items : [];
            });
        },
        editArticle: function (article) {
            this.edit_article = article;
            this.menu = 'articles_form';
        },
        saveArticle: function () {
            this.menu = 'articles_index';
        },
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