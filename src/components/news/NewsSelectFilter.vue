<template>
        <div class="form-control">
            <select v-model="status">
                <option disabled value="">Выберите категорию</option>
                <option value="done">Спорт</option>
                <option value="canceled">Политика</option>
                <option value="active">Наука</option>
                <option value="pending">Юмор</option>
            </select>
        </div> 
</template>
<script>
export default {
    props:['modalValue'],
    emits:['update:modalValue'],
    data(){
        return{
            name:'',
            status:'',
        }
    },
    watch:{
        status(value){
            this.$emit('update:modelValue', {
                status : value,
        })
        }
    }
    
}
</script>