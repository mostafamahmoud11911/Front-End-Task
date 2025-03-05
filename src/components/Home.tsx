import ListItem from "./ListItem";
import { PostProps } from "../utils/interfaces";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { usePosts } from "../context/PostContext";
import { useState } from "react";



export default function Home() {

    const { loading, posts } = usePosts();
    const [search, setSearch] = useState("");



    return (
        <div className="max-w-7xl mx-auto p-1">
            <h1 className="text-center text-4xl my-4">List of Posts</h1>
            <div className="flex justify-between items-center">
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search.." className="border-2 border-gray-600 rounded-md px-2 py-1 " />
                <Link to={`/addpost`}>
                    <button className="bg-green-500 rounded-sm text-white px-4 py-2 m-2 hover:cursor-pointer hover:bg-green-600">Add New Post</button>
                </Link>
            </div>
            {loading ? <div className="flex justify-center my-5"><FadeLoader color="#02C952" /></div> : null}
            {posts.length === 0 && !loading && <p>No posts found</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {posts.filter((post: PostProps) => { return search.toLowerCase() === '' ? post : post.title.toLowerCase().includes(search.toLowerCase()) }).map((post: PostProps) => (
                    <ListItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
