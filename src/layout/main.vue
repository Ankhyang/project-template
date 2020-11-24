<template>
    <div class="app-main">
        <transition name="slide-fade" mode="out-in">
            <keep-alive :include="keepAlive">
                <router-view :key="key"/>
            </keep-alive>
        </transition>
    </div>
</template>
<script type="text/jsx">
    export default {
        name: 'Main',
        components: {

        },
        computed: {
            keepAlive() {
                return this.$store.getters.cachedViews
            },
            key() {
                return this.$route.fullPath
            }
        },
        created() {
          //  console.log(this.$route)
        }
    }
</script>