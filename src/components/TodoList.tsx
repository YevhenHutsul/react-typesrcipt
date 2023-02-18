import { Todo } from '../model/model';
import { SingleTodo } from './SingleTodo';
import './style.css';

interface Props {
    todos:Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const TodoList:React.FC<Props> = ({todos,setTodos}) => {
    return (
    <div className="todos">
        {todos.map((todo) => (
            <SingleTodo 
            todo = {todo}
            setTodos = {setTodos}
            todos = {todos}
            />
        ))}
    </div>
    )
}