<template>
    <div class="card">
      <h2 class="text-center">{{post.title}}</h2>
      <p>{{post.body}}</p>
    </div>
    <button class="btn primary" @click="closePost">Закрыть</button>
</template>
<script>
export default {
    emits:['edit', 'done'],
    props:{
        post:{
            type:Object,
            required:true
        }
    },
    methods:{
        closePost(){
            this.$emit('close')
        },
       
    }
}

</script>