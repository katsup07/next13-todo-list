import prisma from '@/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { validateTodoFormData } from '../services/todos';

async function createTodo(data: FormData){
  "use server";
  const title = data.get("title")?.valueOf() as string;
  const content = data.get("content")?.valueOf() as string;
  const isValid = validateTodoFormData(title, content);

  if(!isValid)
    return console.log('Error: Invalid title or content. Both must be of 1 character or greater.');

  await prisma.todo.create({ data: { title, complete: false, content}})
  redirect('/');
}

const NewPage = () => {
	return (
		<>
			<header className='flex justify-between items-center mb-4'>
				<h1 className='text-3xl font-bold'>New Todo</h1>
			</header>
			<form action={createTodo} className='flex gap-2 flex-col w-full'>
				<input
					type='text'
					name='title'
          placeholder='title'
					className='border border-slate-300 text-slate-300 px-2 py-1 rounded bg-slate-800 focus-within:bg-slate-600 outline-none'
				/>
				<input
					type='text'
					name='content'
          placeholder='content'
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
						Create
					</button>
				</div>
			</form>
		</>
	);
};

export default NewPage;
