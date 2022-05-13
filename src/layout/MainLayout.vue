<template>
    <div class="container with-nav">
        <router-view></router-view>
    </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'

export default {
    components:{TheNavbar}
}
</script>