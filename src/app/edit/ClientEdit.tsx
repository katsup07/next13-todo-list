'use client'

import { Todo } from "../interfaces/todo";
import Link from "next/link";
import { validateTodoFormData } from "../services/todos";
import { ChangeEvent, useState } from "react";

interface Props{
  todo: Todo;
  updateTodo: (todo: Todo) => void;
}

const ClientEdit = ({ todo, updateTodo }: Props) => {
  const [titleInput, setTitleInput] = useState(todo.title || '');
  const [contentInput, setContentInput] = useState(todo.content || '');
// handle the input change event
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  console.log('handling change...');
  const { name, value } = e.target;
  if(name === 'title')
    setTitleInput(value);
  if(name === 'content')
    setContentInput(value);
};

const submitData = async() => {
  console.log('Updating todo...');
  if(!todo) return console.error('No todo found');

  const isValid = validateTodoFormData(titleInput, contentInput);
  if(!isValid) return console.log('Error: Invalid title or content. Both must be of 1 character or greater.');
  
  updateTodo({ title: titleInput, content: contentInput});
};

  return (<>
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-3xl font-bold'>Edit Entry</h1>
    </header>
    <form action={submitData} className='flex gap-2 flex-col w-full'>
      <input
        type='text'
        name='title'
        value={titleInput}
        onChange={handleChange}
       /*  placeholder='title' */
        className='border border-slate-300 text-slate-300 px-2 py-1 rounded bg-slate-800 focus-within:bg-slate-600 outline-none'
      />
      <input
        type='text'
        name='content'
        value={contentInput}
        onChange={handleChange}
        /* placeholder='content' */
        className='border border-slate-300 text-slate-300 px-2 py-1 rounded bg-slate-800 focus-within:bg-slate-600 outline-none'
      />
      <div className='flex gap-1 justify-end'>
        <Link
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-red-500  outline-none'
          href='..'>
          Cancel
        </Link>
        <button
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-blue-500 focus-within:bg-slate-700 outline-none'
          type='submit'>
          Update
        </button>
      </div>
    </form></>)
}
 
export default ClientEdit;