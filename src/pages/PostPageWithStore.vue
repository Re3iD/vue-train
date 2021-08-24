<template>
<div>
    <h1>{{ $store.state.isAuth?"Пользователь авторизован":"Пользователь неавторизован" }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
        <my-button @click="$store.commit('incrementLikes')">Like</my-button>
        <my-button  @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>
    <h1>Страница с постами</h1>
    <my-input
    placeholder="Поиск..."
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    />
    <div class="app__btns">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
        />
    </div>
    
    <my-dialog v-model:show="dialogVisible">
    <post-form
    @create = "createPost"
    />
    </my-dialog>
    <post-list 
    :posts="sortedAndSearchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading"
    />
    <div v-intersection="loadMorePosts" class="observer">

    </div>
    </div>
    
</template>

<script>
import PostForm from '../components/PostForm.vue'
import PostList from '../components/PostList.vue'
import axios from 'axios'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
    export default{
        components :{
            PostList,
            PostForm,
        },
        data(){
            return{
               dialogVisible:false
            }
        },
        methods: {
            createPost(post){
                this.posts.push(post)
                this.dialogVisible = false
            },
            removePost(post){
                this.posts = this.posts.filter(p=>p.id !==post.id)
            },
            showDialog(){
                this.dialogVisible = true
            },
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort:'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
            
        },
        mounted(){
            this.fetchPosts();
           
        },
        watch:{
            
        },
        computed:{
            ...mapState({
                posts: state=> state.post.posts,
               isPostsLoading: state=> state.post.isPostsLoading,
               selectedSort: state=> state.post.selectedSort,
               searchQuery:state=> state.post.searchQuery,
               page: state=> state.post.page,
               limit: state=> state.post.limit,
               totalPages: state=> state.post.totalPages,
               sortOptions: state=> state.post.setOptions
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        }
        }
</script>
    
<style>

.app__btns{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    flex-direction: row;
    margin-top: 15px;
}
.page{
    border: 1px solid black;
    padding: 10px;
}
.current_page{
    border: 2px solid teal;
}

</style>