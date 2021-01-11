import React, { Component } from 'react'

export default class Posts extends Component {
    
    state = {
        posts: []
    }

    async componentDidMount(){
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts') //fetch api del navegador. Realiza peticion a otro sv
        //manejarlo async porque lleva tiempo
        const data = await resp.json();
        this.setState({posts: data})
    }
    
    render() {
        return (
            <div>
                <h1>
                    Posts
                </h1>
                { this.state.posts.map(post => {
                    return <div key={post.id}>
                     <h1>{post.title}</h1>
                     <p>{post.body}</p>
                    </div>})
                }
            </div>
        )
    }
}
