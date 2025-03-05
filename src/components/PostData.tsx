import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";


export default function PostData() {
  const { state } = useLocation();
  const edit = state?.isEdit;
  const id = state?.post?.id;
  const { handleCreateAndUpdate,spinner } = usePosts();

  const navigate = useNavigate();


  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: title.current?.value,
      body: description.current?.value
    }
    const response: unknown = await handleCreateAndUpdate(data, id, edit);

    if (response) navigate('/');

  }



  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">{edit ? 'Edit Post' : 'Add Post'}</h1>


      <form onSubmit={onSubmit} className="md:w-[600px] w-full mx-auto flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" ref={title} defaultValue={edit ? state?.post?.title : null} className="border-2 border-gray-600 rounded-md px-2 py-1 " placeholder="title" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea name="description" className="border-2 border-gray-600 rounded-md px-2 py-1 " defaultValue={edit ? state?.post?.body : null} ref={description} id="description" ></textarea>
        </div>
        <button type="submit" disabled={spinner} className={`w-full bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer ${spinner && 'opacity-50'}`}>{edit ? 'Update' : 'Create'}</button>
        <Link to="/" className="w-full text-center bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer">Cancel</Link>
      </form>


    </div>
  )
}
