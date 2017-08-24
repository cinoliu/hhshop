<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'index',

        created () {
            this.func.ajaxGet(this.api.userAutoLogin, res => {
                if (res.data.code === 200) {
                    this.$store.commit('user', res.data.user);
                } else {
                    this.$router.push('/');
                }
            });
        },
    }
</script>