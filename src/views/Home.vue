<template>
  <the-navbar @download="loadMorePosts" @newPost="modal=true"></the-navbar>
  <div class="home">
    <div class="filter card" v-if="this.posts.length">
    <news-filter-select v-model="filter"></news-filter-select>
    <news-filter v-model="seletedSort" :options="sortOptions"></news-filter>  
    </div>
    <news-posts @openPost="openPosts" @modalEdit="postInPosts" @remove='removePost' :posts="displayPost"></news-posts>

    <teleport to="body">
      <app-modal v-if="openPost" title="Просмотр новости" @close="openPost = false">
        <news-open-post  :post='post' @close="openPost = false"></news-open-post>
      </app-modal>
      <app-modal v-if="modal" title="Создать новость" @close="modal = false">
        <news-modal @create="createPost" @created="modal = false"></news-modal>
      </app-modal>
      <app-modal v-if="editModal" title="Редактировать новость" @close="editModal = false">
        <news-edit-modal :post='post' @edit="editPost" @done="editModal = false"></news-edit-modal>
      </app-modal>
    </teleport>
  </div>
   <app-paginate
    v-if="this.posts.length"
    :totalPages="pageCount"
    :perPage="perPage"
    :currentPage="currentPage"
    @pagechanged="onPageChange"
   ></app-paginate>
   <div v-else class="card text-center">
     <h1>Постов нет. Добавьте первый :)</h1>
   </div>
</template>

<script>
import NewsOpenPost from '../components/news/NewsOpenPost.vue'
import AppPaginate from '../components/ui/AppPaginate.vue'
import NewsFilterSelect from '../components/news/NewsSelectFilter.vue'
import NewsEditModal from '../components/news/NewsEditModal.vue'
import AppModal from '../components/ui/AppModal.vue'
import NewsModal from '../components/news/NewsModal.vue'
import NewsPosts from '../components/news/NewsPosts.vue'
import NewsFilter from '../components/news/NewsFilter.vue'
import TheNavbar from '../components/TheNavbar.vue'
import axios from 'axios'
import paginateMixin from '../mixins/paginate.mixin'

export default {
  name: 'Home',
  components:{NewsOpenPost,NewsPosts,NewsFilter,NewsModal,AppModal, TheNavbar,NewsEditModal, NewsFilterSelect,AppPaginate},
  mixins:[paginateMixin],
  data(){
    return{
      kostil:0,
      editModal:false,
      modal:false,
      openPost:false,
      posts:[],
      post:{},
      seletedSort:'',
      sortOptions:[
        {value:'title', name:'По названию'},
        {value:'body', name:'По содержанию'}
      ],
      filter:{},
    }
  },
  mounted(){
    if(localStorage.getItem('posts'))
    {
      const raw = localStorage.getItem('posts')
      const postInStorage = JSON.parse(raw)
      this.posts = postInStorage
      this.setupPagenation(this.posts)
    }
  },
  methods:{
    createPost(post){
      this.posts.unshift(post)
      this.kostil++
    },
    removePost(post){
      if(confirm("Вы уверенны, что хотите удалить пост?")){
      this.posts = this.posts.filter(p => p.id !== post.id)
      }
      this.kostil++
    },
    postInPosts(post, editModal){
      this.editModal = editModal
      this.post = post
    },
    openPosts(post, openPost){
      this.openPost = openPost
      this.post = post
    },
    editPost(post){
      this.posts.forEach( (p) => {
        if (p.id === post.id){
          p.title = post.title
          p.body = post.body
          p.status = post.status
        }
      })
      this.kostil++
    },
    async fetchPosts(){
      try{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
          // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          response.data.forEach(e => {
            delete e.userId
            e.status = 'active'
          })
          this.posts = response.data
          this.kostil++
      }catch(e){
          console.log(e.message)
      }
    },
    async loadMorePosts(){
      try{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
          // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          response.data.forEach(e => {
            delete e.userId
            e.status = 'active'
          })
          this.posts = response.data.concat(this.posts)
          this.kostil++
      }catch(e){
          console.log(e.message)
      }
    }
  },
  watch:{
    kostil(){
      localStorage.setItem('posts', JSON.stringify(this.posts))
      this.setupPagenation(this.posts)
    },
  },
  computed:{
    displayPost(){
      if(this.seletedSort && this.filter.status){
        const sortbyValandStatus = [...this.posts].sort((post1,post2) => post1[this.seletedSort]?.localeCompare(post2[this.seletedSort])).filter(response => response.status === this.filter.status)
        this.setupPagenation(sortbyValandStatus)
        return this.items
      }
      if(this.seletedSort){
        const sortbyVal = [...this.posts].sort((post1,post2) => post1[this.seletedSort]?.localeCompare(post2[this.seletedSort]))
        this.setupPagenation(sortbyVal)
      }
      if(this.filter.status){
        const sortByStatus = this.posts.filter(response => response.status === this.filter.status)
        this.setupPagenation(sortByStatus)
      }
      return this.items
    }
  }
}
</script>
