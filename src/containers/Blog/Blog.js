import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import Filter from '../../components/Filter/Filter';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
        filter: '',
        users:[]

    }

    //merge the posts and user data 
    mergePostsWithUsers = (posts, users) => {
        const updatedPosts = posts.map(post => {
            const user = users.find(user => user.id == post.userId);
            return {
                ...post,
                author: user.name
            }
        });

        return updatedPosts;
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 92);
                let mergedPosts =null;
                axios.get('/users')
                    .then( users => {

                        mergedPosts = this.mergePostsWithUsers(posts, users.data);
                        this.setState({
                                posts: mergedPosts,
                                users: users.data
                            });

                    }).catch(error => {
                        console.log(error);

                    });
                
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    filterHandler = (event, author) => {
        this.setState({filter: author});
    }

    filterPosts = () => {

        const filteredPosts = this.state.posts.filter(post => post.author == this.state.filter) ;


        return filteredPosts;

    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {

            posts = this.state.filter === '' ? this.state.posts : this.filterPosts() ;
            posts = posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        }

        return (
            <div>
                <Filter 
                    author={this.state.filter}
                    users={this.state.users} 
                    listCount={posts.length}
                    changed={this.filterHandler}/>
                <div className="Posts">
                    {posts}
                </div>
                
                
            </div>
        );
    }
}

export default Blog;