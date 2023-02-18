import { useState } from 'react';
import { InputFeild } from './components/InputFeild';
import './App.css';
import { Todo } from './model/model';
import { TodoList } from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ListFormat } from 'typescript';

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [complited, setComplited] = useState<Array<Todo>>([])

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
            setTodo('');
        }
    }

    const onDragEnd = (result: DropResult) => {
        const {source, destination} = result;
        console.log(source,destination)

        if(!destination) return;

        if( source.droppableId === destination.droppableId &&
            source.index === destination.index) return;
        
        let add;
        let active = todos;
        let complite = complited;

        if(source.droppableId  === 'TodosList'){
            add = active[source.index];
            active.splice(source.index, 1)
        }else{
            add = complite[source.index];
            complited.splice(source.index, 1)
        }

        if(destination.droppableId  === 'TodosList'){
            active.splice(destination.index, 0,add)
        }else{
            complite.splice(destination.index, 0,add)
        }

        setComplited(complite)
        setTodos(active);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>

            <div className='App'>
                <span className='heading'>Taskify</span>
                <InputFeild
                    todo={todo}
                    setTodo={setTodo}
                    handleAdd={handleAdd}
                />
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    complited={complited}
                    setComplited={setComplited}
                />
            </div>
        </DragDropContext>
    )
}

export default App;
