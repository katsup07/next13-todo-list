'use server';

import prisma from '@/db';
import { Todo } from '../interfaces/todo';

// === CRUD Requests ===
export async function getTodos() {
	return await prisma.todo.findMany();
}

export async function getTodo(id: string) {
  return await prisma.todo.findFirst({ where: { id }});
}

export async function toggleTodo(id: string, complete: boolean) {
	console.log('toggling todo', id, complete);
	await prisma.todo.update({ where: { id }, data: { complete } });
}

export async function editTodo(id: string, todo: Todo) {
  console.log('todo: ', todo);
	const { title, content } = todo;

	if (!title && !content) return;

	console.log('editing todo', id, todo);
	await prisma.todo.update({ where: { id }, data: { ...todo } });
}

export async function deleteTodo(id: string) {
	console.log('deleting todo...', id);
	await prisma.todo.delete({ where: { id } });
}

// === Form Validation ===
export async function validateTodoFormData(title: string, content: string){
  // TODO - // throw new Error('Invalid title');
  if(typeof title !== 'string' || title.length === 0) return false;
  // TODO - // throw new Error('Invalid content');
  if(typeof content !== 'string' || content.length === 0)return false;

  return true;
}
