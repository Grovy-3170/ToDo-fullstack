import React from 'react'
import { Button } from '../ui/button';

const ListForm = ({toDo, handleCancel, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='p-6 bg-white rounded-2xl flex flex-col gap-8 w-[800px]'>
        <label className='flex flex-col gap-2'>
            Enter the title:
            <input type='text' name='title' placeholder={toDo?.title} className='border-2 p-2 rounded-lg'/>
        </label>
        <label className='flex flex-col gap-2'>
            Enter the description:
            <textarea name='description' placeholder={toDo?.description} className='border-2 p-2 rounded-lg h-56'/>
        </label>
        <label className='flex gap-2'>
            Completed:
            <input type='checkbox' name='completed' defaultChecked={toDo?.completed} className='border-2 p-2 rounded-lg'/>
        </label>
        <div className='w-full flex justify-end items-center gap-8'>
            <Button variant="outline" onClick={handleCancel} className='' type='cancel'>Cancel</Button>
            <Button variant="default" className='bg-green-600 hover:bg-green-700' type='submit'>Submit</Button>
        </div>
    </form>
  )
}

export default ListForm
