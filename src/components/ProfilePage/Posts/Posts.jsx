import React from 'react';
import s from './Posts.module.css';
import Post from "./Post/Post";
import NewPostForm from "./NewPostForm/NewPostForm";


const Posts = (props) => {

    let postsList = props.postData.map( p =>
        <Post post={p.text} ava={props.user.avatar} likes={p.likeCount}/>
    );

    return <div className={s.posts}>

        <div className={s.postsHeader}>My posts</div>

        <NewPostForm/>

        {postsList}

    </div>


}

export default Posts;