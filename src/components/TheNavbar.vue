<template>
  <nav class="navbar">
        <h3>News Blog </h3>
        <ul class="navbar-menu">
           <button class="btn primary" @click="$emit('newPost')">Создать новость</button>
            <button class="btn primary" @click="$emit('download')">Загрузить</button>
        </ul>
    </nav>
</template>
<script>
export default {
    emits:['download','newPost']
}
</script>