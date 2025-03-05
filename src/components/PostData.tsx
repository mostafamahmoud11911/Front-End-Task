import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";


export default function PostData() {
  const { state } = useLocation();
  const edit = state?.isEdit;
  const id = state?.post?.id;
  const { handleCreateAndUpdate, spinner } = usePosts();
  const [titleValidation, setTitleValidation] = useState("");
  const [bodyValidation, setbodyValidation] = useState("");


  const navigate = useNavigate();

  const [data, setData] = useState({ title: '', body: '' });

  const getData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const cloneData = { ...data };
    setData({ ...cloneData, [e.target.name]: e.target.value });
  }


  const validation = () => {
    if (!data.title || !new RegExp(/^[A-Za-z1-9]{3,50}$/).test(data.title)) {
      setTitleValidation('Title is not valid');
      return false;
    } else if (!data.body || !new RegExp(/^[A-Za-z1-9]{10,200}$/).test(data.body)) {
      setbodyValidation('Description is not valid');
      return false;
    } else {
      setTitleValidation('');
      setbodyValidation('');
      return true
    }

  }


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validation();
    console.log(result);

    if (!result) {
      return false;
    } else {
      const info = {
        title: data.title,
        body: data.body
      }
      const response: unknown = await handleCreateAndUpdate(info, id, edit);

      if (response) navigate('/');
    }

  }

console.log(data);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">{edit ? 'Edit Post' : 'Add Post'}</h1>


      <form onSubmit={onSubmit} className="md:w-[600px] w-full mx-auto flex flex-col gap-4 px-3">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" onChange={getData}  name="title" defaultValue={edit ? state?.post?.title : null} className="border-2 border-gray-600 rounded-md px-2 py-1 " placeholder="title" />
          <p className="text-red-500 ">{titleValidation}</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea name="body" onChange={getData}  className="border-2 border-gray-600 rounded-md px-2 py-1 " defaultValue={edit ? state?.post?.body : null} id="description" ></textarea>
          <p className="text-red-500">{bodyValidation}</p>
        </div>
        <button type="submit" disabled={spinner} className={`w-full bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer ${spinner && 'opacity-50'}`}>{edit ? 'Update' : 'Create'}</button>
        <Link to="/" className="w-full text-center bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer">Cancel</Link>
      </form>


    </div>
  )
}
