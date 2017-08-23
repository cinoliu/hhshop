<template lang="pug">
    header
        .wrap.header-wrap
            .logo
                img(src='../../assets/imgs/logo.png')
            .header-links
                li
                    button.btn(@click='login') {{ user ? user.user_name : '登录' }}
                li
                    button.btn(@click='logout') 注销
</template>

<script>
    export default {
        name: 'header',

        computed: {
            user () {
                return this.$store.state.user;
            },
        },

        methods: {
            login () {
                if (!this.user) {
                    this.$router.push('/');
                }
            },

            logout () {
                this.func.ajaxGet(this.api.userLogout, res => {
                    if (res.data.code === 200) {
                        this.$store.commit('user', null);
                        this.$router.push('/');
                    }
                });
            },
        }

    }
</script>