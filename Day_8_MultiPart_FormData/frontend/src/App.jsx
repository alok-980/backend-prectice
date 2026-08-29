import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const App = () => {

  const inputClass = 'border border-gray-500 px-4 py-2 rounded-xl bg-gray-200/50'

  const { register, handleSubmit } = useForm()

  const createUser = async (data) => {
    try {
      const formData = new FormData();

      formData.append('name', data.name)
      formData.append('email', data.email)
      for(let image of data.images) {
        formData.append('images', image)
      }

      await axios.post('http://localhost:3000/user/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center bg-black'>
      <form onSubmit={handleSubmit(createUser)} className='flex flex-col gap-2 w-100 p-2'>
        <div className={`${inputClass}`}>
          <input {...register('name')} type="text" placeholder='enter your name' className='w-full outline-0' />
        </div>
        <div className={`${inputClass}`}>
          <input {...register('email')} type="text" placeholder='enter your email' className='w-full outline-0' />
        </div>
        <div className={`${inputClass}`}>
          <input type="file" {...register('images')} multiple className='w-full outline-0' />
        </div>
        <button type='submit' className='bg-blue-800 text-white py-2 rounded-xl cursor-pointer'>Submit</button>
      </form>
    </div>
  )
}

export default App