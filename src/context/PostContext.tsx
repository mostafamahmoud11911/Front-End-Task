import { createContext, useContext } from "react";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { DataProps, PostProps } from "../utils/interfaces";
import { useToast } from "./toast";



const PostContext = createContext<{ posts: PostProps[], setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>, loading: boolean, handleDelete: (id: number) => void, handleCreateAndUpdate: (data: DataProps, id: number, isEdit: boolean) => void,spinner: boolean }>({
  posts: [],
  setPosts: () => { },
  loading: false,
  handleDelete: () => { },
  handleCreateAndUpdate: () => { },
  spinner: false
});

export const usePosts = () => {
  return useContext(PostContext);
}

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const {getToast} = useToast();

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setPosts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        getToast('error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPosts();
  }, []);


  const handleDelete = async (id: number) => {
    setSpinner(true);
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (response.status === 200) {
        getToast('success', 'Post deleted successfully');
        setPosts(posts.filter((post: PostProps) => post.id !== id));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        getToast('error', error.message);
      }
    }finally{
      setSpinner(false);
    }
  }


  const handleCreateAndUpdate = async (data: DataProps, id: number, isEdit: boolean): Promise<PostProps | undefined> => {
    setSpinner(true);
    try {
      const response = await axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit ? `https://jsonplaceholder.typicode.com/posts/${id}` : 'https://jsonplaceholder.typicode.com/posts',
        data
      })

      if (response.status === 201) {
        getToast('success', 'Post created successfully');
        setPosts((prev) => [...prev, response.data]);
        return response.data;
      }
      if (response.status === 200) {
        getToast('success', 'Post updated successfully');
        setPosts((prev) => prev.map((post: PostProps) => post.id === id ? response.data : post));

      }
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        getToast('error', error.message);
      }
    }finally{
      setSpinner(false);
    }
  }

  return (
    <PostContext.Provider value={{ posts, setPosts, loading, handleDelete, handleCreateAndUpdate, spinner }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
