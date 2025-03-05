import { FaRegTrashCan } from 'react-icons/fa6';
import { PostProps } from '../utils/interfaces'
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';



const ListItem = ({ post }: { post: PostProps }) => {

  const { handleDelete } = usePosts()

  function deleteItem(id: number) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      handleDelete(id)
    }
  }

  return (
    <div className='border border-gray-200 rounded-md p-4'>
      <div className='flex justify-between items-center gap-3 mb-2'>
        <h3 className='text-2xl'>{post.title.slice(0, 20)}..</h3>

        <div className='flex gap-2'>
          <Link to={`/editpost/${post.id}`} state={{ post, isEdit: true }}>
            <CiEdit size={20} className='text-green-500' />
          </Link>
          <FaRegTrashCan size={20} onClick={() => deleteItem(post.id)} className='text-red-300 cursor-pointer' />
        </div>


      </div>
      <p>{post.body}</p>
    </div>
  )
}


export default ListItem