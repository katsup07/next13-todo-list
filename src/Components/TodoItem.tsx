'use client';
import { TiPinOutline } from "react-icons/ti";

interface Props {
	id: string;
	title: string;
  content: string;
	complete: boolean;
	toggleTodo: (id: string, complete: boolean) => void;
}

const TodoItem = ({ id, title, complete, toggleTodo, content }: Props) => {
	return (
    <li className='flex flex-col items-center' key={id}>
      <h2 className='text-xl text-slate-400'><span className='flex flex-row items-center'>{ title }<span className='text-blue-500'><TiPinOutline/></span></span></h2>
			<div className='flex gap-1'>
        <input
          className='cursor-pointer peer'
          id={id}
          type='checkbox'
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className='cursor-pointer peer-checked:line-through border peer-checked:text-slate-700 border-slate-500 peer-checked:border-slate-700 mb-1 px-3 py-1 rounded hover:bg-slate-600 w-full'>
          {content}
        </label>
      </div>
		</li>
	);
};

export default TodoItem;
