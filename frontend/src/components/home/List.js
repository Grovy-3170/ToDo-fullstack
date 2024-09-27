'use client'
import { createToDo, deleteToDo, fetchToDoList, updateToDo } from '@/api/request';
import React, { useEffect, useState } from 'react'
import Modal from '../common/Modal';
import ListForm from './ListForm';
import { Button } from '../ui/button';
import Image from 'next/image';

const List = () => {

  const [toDos, setToDos] = useState([]);
  const [changeModal, setChangeModal] = useState(false);
  const [operableToDo, setOperableToDo] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);

  useEffect(()=>{
    getToDoList();
  },[])

  const getToDoList = async()=>{
    try{
      const response = await fetchToDoList();
      setToDos(response.data);
    } catch(error){
      console.log("error fetching to do list", error);
    }
  }

  const handleEditClick = (toDo)=>{
    setOperableToDo(toDo);
    handleChangeModalToggle();
  }

  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const data = {
        id:operableToDo.id,
        title:payload.title?payload.title:operableToDo.title,
        description:payload.description?payload.description:operableToDo.description,
        date:operableToDo.date,
        completed:Object.keys(payload).indexOf('completed') !== -1
    }
    if(operableToDo.id === -1){
        handleCreate(data);
    }else{
        handleUpdate(data);
    }
    handleChangeModalToggle();
}

  const handleUpdate = async(data)=>{
    try{
      const response = await updateToDo(data.id, {title:data.title, description:data.description,date:data.date, completed:data.completed});
      setToDos((prev)=>prev.map((todo)=>todo.id === response.data.id?response.data:todo));
    }catch(error){
      console.log(error);
    }
  }

  const handleCreate = async(data)=>{
    try{
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10);
      const response = await createToDo({title:data.title, description:data.description, completed:data.completed, date:formattedDate});
      setToDos((prev)=>[...prev, response.data])
    }catch(error){
      console.log(error)
    }
  }

  const handleDelete = async(id)=>{
    try{
      const response = await deleteToDo(id);
      setToDos((prev)=>prev.filter((todo)=>todo.id !== id))
    } catch(error){
      console.log(error)
    }
  }

  const handleChangeModalToggle = ()=>{
    setChangeModal((prev)=>!prev);
  }

  const handleDetailsModalToggle = ()=>{
    setDetailsModal((prev)=>!prev);
  }

  return (
    <div className='flex flex-col m-16 gap-4 w-full'>
    <div className='w-full flex justify-end'><Button onClick={()=>{handleEditClick({id:-1})}} variant="default" className="bg-green-600 hover:bg-green-700 flex gap-4 text-lg" size="lg">Add<div className='w-6 h-6 relative text-white'><Image fill className='absolute' src={"/images/plus_icon.svg"} alt='add'/></div></Button></div>
    {toDos.length === 0?(<div className='w-full flex justify-center text-4xl text-blue-500'>Nothing in the list</div>):(
      <div className='w-full mt-0 border-4 rounded-3xl overflow-hidden'>
        <table className='w-full'>
            <tbody>
                <tr className='bg-neutral-700 text-white h-20'>
                    <th className='w-8 text-left p-4 border-r-2 border-white'>Index</th>
                    <th className=' text-left p-4 border-r-2 border-white'>Title</th>
                    <th className='w-2/12 text-left p-4 border-r-2 border-white'>Created at</th>
                    <th className='w-2/12 text-left p-4 border-r-2 border-white'>Completed</th>
                    <th className='w-2/12 text-left p-4'>Edit/Delete</th>
                </tr>
                {toDos?.map((todo, index)=>{
                  return(
                    <tr key={todo.id} className='h-20 border-b'>
                      <td className='p-4 border-r-2'>{index + 1}.</td>
                      <td onClick={()=>{setOperableToDo(todo); handleDetailsModalToggle();}} className='p-4 border-r-2 hover:bg-neutral-100 cursor-pointer'>{todo.title}</td>
                      <td className='p-4 border-r-2'>{todo.date}</td>
                      <td className={`${todo.completed?"bg-green-600":"bg-red-600"} text-white p-4`}>{todo.completed?"YES":"NO"}</td>
                      <td className='p-4 border-r-2 flex flex-col gap-2'>
                        <Button variant="outline" onClick={()=>{handleEditClick(todo)}}>Edit</Button>
                        <Button variant="destructive" onClick={()=>{handleDelete(todo.id)}}>Delete</Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
        </table>
      </div>
    )}
    <Modal visible={changeModal} handleModalToggle={handleChangeModalToggle}>
        <ListForm toDo={operableToDo} handleCancel={handleChangeModalToggle} handleSubmit={handleFormSubmit}/>
    </Modal>
    <Modal visible={detailsModal} handleModalToggle={handleDetailsModalToggle}>
      <div className='w-[1000px] flex flex-col gap-8 justify-start p-8 h-[500px] overflow-auto bg-white rounded-lg'>
        <h2 className='text-2xl text-dark font-bold flex justify-between w-full'>{operableToDo?.title}<button onClick={handleDetailsModalToggle} className='w-6 h-6 relative'><Image fill className='absolute' alt='close' src={"/images/cross_icon.svg"}/></button></h2>
        <p>{operableToDo?.description}</p>
      </div>
    </Modal>
    </div>
  )
}

export default List
