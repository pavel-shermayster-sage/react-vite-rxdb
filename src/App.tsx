import './App.css'
import {useEffect, useState} from "react";
import {collections} from "./utils/db.ts";
import {map} from "rxjs";

interface Todo {
    id: string;
    name: string;
    done: boolean;
};

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        const sub$ = collections.todos.find().$
            .pipe(map(docs => docs.map(d => d.toJSON())))
            .subscribe((todos) => {
                setTodos(todos);
            });
        return () => {
            sub$.unsubscribe();
        }
    }, []);
    return (
        <div>
            App
            <button onClick={() => {
                collections.todos.insert({
                    id: crypto.randomUUID(),
                    name: 'test',
                    done: false
                })
            }}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>

        </div>
    )
}

export default App
