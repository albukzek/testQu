import axios from "axios"

export const postModule = {
    state:() => ({
        posts: [],
        isPostLoading: false,

    }),
    mutations:{
        setPosts(state, posts){
            state.posts = posts
        },
        setLoading(state, bool){
            state.isPostLoading = bool
        },
    },
    actions:{
        async fetchPosts({commit}){
            try{
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
                commit('setPosts',  response.data)
            }
            catch(e){
                console.log(e.message)
            } finally {
                commit('setLoading', false)
            }
        }
    },
    namespaced: true
    
}