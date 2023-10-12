import Link from 'next/link';
import TodoItem from '../Components/TodoItem';
import Button from '@/Components/Button';
import { getTodos, getTodo, toggleTodo, deleteTodo, editTodo } from './services/todos';
import { TiDeleteOutline, TiEdit, TiPencil } from 'react-icons/ti';
import { redirect } from 'next/navigation';

export default async function Home() {
	const todos = await getTodos();

	const onOpenEditTodo = async (id: string) => {
		'use server';
    // TODO - Fix the edit todo page redirect
		redirect('/edit?id=' + id);
	};

	const onDeleteTodo = async (id: string) => {
		'use server';
		// TODO - Add modal confirmation to check before deleting.
		await deleteTodo(id);
		// TODO - Add code for refreshing page on data update
		redirect('./'); // TODO - There must be a better way to do this besides redirecting to the current page.
	};
	return (
		<main>

			<header className='flex justify-between items-center mb-4'>
				<h1 className='text-4xl font-black self-end text-slate-500'>
					Todo List
				</h1>
				<Link
					href='/new'
					className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-blue-500 focus-within:bg-slate-700 outline-none'>
					<TiPencil />
				</Link>
			</header>

			<ul className='flex flex-col items-start gap-6 pl-4'>
				{todos.map((todo) => (
					<div key={todo.id}>
						<TodoItem {...todo} toggleTodo={toggleTodo} />
						<div className='actions flex flex-row justify-between'>
							<Button
								doAction={onOpenEditTodo}
								hoverColor={`text-sky-500`}
								id={todo.id}>
								{<TiEdit />}
							</Button>
							<Button
								doAction={onDeleteTodo}
								hoverColor={`text-red-500`}
								id={todo.id}>
								{<TiDeleteOutline />}
							</Button>
						</div>
					</div>
				))}
			</ul>

		</main>
	);
}
