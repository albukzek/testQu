<template>
    <div class="card" v-for="postik in posts" :key="postik.id">
        <app-status :type="postik.status"></app-status>
        <h1>{{postik.title}}</h1>
        <p class="posthide">{{postik.body}}</p>
        <button class="btn primary" @click="$emit('openPost', postik, true)">Открыть новость</button>
        <button class="btn danger" @click="$emit('remove' , postik)">Удалить</button>
        <button class="btn warning" @click="$emit('modalEdit', postik, true)">Редактировать</button>
    </div>
</template> 
<script>    
import AppStatus from '../ui/AppStatus.vue'
export default {
    components:{AppStatus},
    emits:['remove','modalEdit','openPost'],
    props:{
        posts:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
        }
    }
}
</script>