import { getTodo, editTodo, validateTodoFormData } from "../services/todos";
import { redirect } from "next/navigation";
import ClientEdit from "./ClientEdit";
import { Todo } from "../interfaces/todo";

interface SearchParams{
  searchParams: { id: string }
}

const EditTodo = async({ searchParams: { id }}: SearchParams) => {
  const todo = await getTodo(id);
  
  const updateTodo = async(todo: Todo) => {
    'use server'
    await editTodo(id, todo);
    redirect('/');
  }

  if(!todo)
    return <p>No todo found.</p>

  return <ClientEdit todo={todo} updateTodo={updateTodo}/>
}
 
export default EditTodo;