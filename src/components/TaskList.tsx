
import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	
	// Conforme o usuario digitar, ele ira setar o texto na newTaskTitle, fazendo isso em tempo real
	const [newTaskTitle, setNewTaskTitle] = useState('');

	function handleCreateNewTask() {
		// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
		if(!newTaskTitle){ return } // Evita que sejam inseridas tasks vazias

		const newTask = {
			id: Math.random(),
			title: newTaskTitle,
			isComplete: false
		}

		setTasks(oldState => [...oldState, newTask]) // adiciona a nova task sem perder as tasks antigas
		setNewTaskTitle('') // limpa o input ao enviar uma task
	}

	function handleToggleTaskCompletion(id: number) {
		// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
		const completeTask = tasks.map(task => task.id === id ? { // retorna a task que tiver o id igual
			...task, // pega todos os valores antigos da task, como id e title
			isComplete: !task.isComplete // alteramos apenas o isComplete sendo o valor inverso ao que estava anteriormente
		} : task) // caso o id for diferente, ele simplesmente retorna a task sem nenhuma modificacao

		setTasks(completeTask) // seta o estado da task
	}

	function handleRemoveTask(id: number) {
		// Remova uma task da listagem pelo ID
		const filteredTasks = tasks.filter(task => task.id !== id) // retornar todos os itens, menos o que tiver o id passado
		setTasks(filteredTasks)
	}

	return (
		<section className="task-list container">
			<header>
				<h2>Minhas tasks</h2>

				<div className="input-group">
						<input 
							type="text" 
							placeholder="Adicionar novo todo" 
							onChange={(e) => setNewTaskTitle(e.target.value)}
							value={newTaskTitle}
						/>
						<button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
							<FiCheckSquare size={16} color="#fff"/>
						</button>
				</div>
			</header>

			<main>
				<ul>
					{tasks.map(task => (
						<li key={task.id}>
						<div className={task.isComplete ? 'completed' : ''} data-testid="task" >
							<label className="checkbox-container">
								<input 
								type="checkbox"
								readOnly
								checked={task.isComplete}
								onClick={() => handleToggleTaskCompletion(task.id)}
								/>
								<span className="checkmark"></span>
							</label>
							<p>{task.title}</p>
						</div>

						<button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
							<FiTrash size={16}/>
						</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	)
}