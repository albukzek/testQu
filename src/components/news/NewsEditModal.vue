<template>
    <form @submit.prevent>
        <div class="form-control">
            <label for="title">Заголовок</label>  
            <input type="text" id="title" v-model="postEdit.title">  
        </div>
        <div class="form-control">
            <label for="body">Содержание</label>  
            <textarea id="body" rows="10" v-model="postEdit.body"></textarea> 
        </div>
         <div class="form-control">
            <label for="status">Категория</label>  
            <select id="status" v-model="postEdit.status">
                <option value="done">Спорт</option>
                <option value="canceled">Политика</option>
                <option value="active">Наука</option>
                <option value="pending">Юмор</option>
             </select>    
            </div>

        <button class="btn primary" @click="editPost">Изменить</button>
    </form>
</template>
<script>
export default{
    emits:['edit', 'done'],
    props:{
        post:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            postEdit:{
                id: this.post.id,
                title: this.post.title,
                body: this.post.body,
                status:this.post.status
            }
        }
    },
    methods:{
        editPost(){
            this.$emit('edit', this.postEdit)
            this.$emit('done')
        },
       
    }
}
</script>