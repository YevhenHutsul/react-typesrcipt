import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model/model';
import { SingleTodo } from './SingleTodo';
import './style.css';

interface Props {
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    complited: Array<Todo>;
    setComplited: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const TodoList: React.FC<Props> = ({ todos, setTodos, complited, setComplited }) => {
    return (
        <div className='container'>
            <Droppable droppableId='TodosList'>
                {(provider) => (
                    <div 
                    className='todos' 
                    ref={provider.innerRef} 
                    {...provider.droppableProps}>
                        <span className='todos__heading'>Active Task</span>
                        {todos.map((todo,index) => (
                            <SingleTodo
                                index={index}
                                key={todo.id}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                    {provider.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodoRemove'>
                {(provaider) => (
                    <div className='todos remove' ref={provaider.innerRef} {...provaider.droppableProps}>
                        <span className='todos__heading'>Complited Task</span>
                        {complited.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                key={todo.id}
                                todo={todo}
                                todos={complited}
                                setTodos={setComplited}
                            />
                        ))}
                        {provaider.placeholder}
                    </div>
                )}
            </Droppable>

        </div>
    )
}