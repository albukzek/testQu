import _ from 'lodash'

export default{
    data(){
        return{
            perPage:10,
            currentPage: +this.$route.query.page || 1, 
            pageCount: 0,
            items:[],
        }
    },
    methods:{
        setupPagenation(pages){
          this.pages= _.chunk(pages, this.perPage)
          this.pageCount = _.size(this.pages)
          this.items = this.pages[this.currentPage -1 ] || this.pages[0]
        },
        onPageChange(page){
          this.currentPage = page
          this.$router.push(`${this.$route.path}?page=${page}`)
          this.items = this.pages[page-1] || this.pages[0]
        },
        changePage(pageNumber){
          this.page = pageNumber
          this.fetchPosts()
        }
    }

}