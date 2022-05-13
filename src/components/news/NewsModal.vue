<template>
     <form @submit.prevent>
        <div class="form-control">
            <label for="title">Заголовок</label>  
            <input type="text" id="title" v-model="post.title">  
        </div>
         <div class="form-control">
            <label for="body">Содержание</label>  
            <textarea id="body" rows="10" v-model="post.body"></textarea> 
        </div>
         <div class="form-control">
            <label for="status">Категория</label>  
            <select id="status" v-model="post.status">
                <option value="done">Спорт</option>
                <option value="canceled">Политика</option>
                <option value="active">Наука</option>
                <option value="pending">Юмор</option>
            </select>    
        </div>
        <button class="btn primary" @click="createPost">Создать</button>
    </form>
</template>
<script>
export default{
    emits:['created','create'],
    data(){
        return{
            post:{
                title:'',
                body:'',
                status:''
            }
        }
    },
    methods:{
        createPost(){
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.$emit('created')
        }
    }
}
</script>