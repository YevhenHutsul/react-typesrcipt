import { useState, useRef, useEffect } from 'react'
import { Todo } from "../model/model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './style.css'
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleDone = (id: Number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const handleDelete = (id: Number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: Number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? { ...todo, todo: editTodo } : todo
        )));

        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provaider) => (
                <form
                    className="todos__single"
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provaider.draggableProps}
                    {...provaider.dragHandleProps}
                    ref={provaider.innerRef}
                >
                    {edit ? (
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => setEditodo(e.target.value)}
                            className={'todos__single--text'} />
                    ) : (
                        todo.isDone ? (
                            <s className="todos__single--text">{todo.todo}</s>
                        ) : (
                            <span className="todos__single--text">{todo.todo}</span>
                        )
                    )}
                    <div>
                        <span className='icon' onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}>
                            <AiFillEdit />
                        </span>
                        <span className='icon' onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className='icon' onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};