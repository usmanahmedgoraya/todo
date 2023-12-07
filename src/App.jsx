import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import uuid from "react-uuid";
import { useRef } from "react";
const LOCAL_STORGE_KEY = "todoApp.todos"

const App = () => {
  const [todo, setTodo] = useState([])
  const [input, setInput] = useState("")
  const inputRef = useRef(null)

  // Store the todo Data
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORGE_KEY,JSON.stringify(todo))
  //   console.log("changed")
  // },[todo])


  // Get the todo Data
  useEffect(() => {
    let getTodo = JSON.parse(localStorage.getItem(LOCAL_STORGE_KEY)) || [];
    setTodo(getTodo)
  }, [])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleAddTodo = () => {
    console.log(input);
    if (!input) return

    let a = [...todo, { id: uuid(), name: input, complete: false }]
    setTodo(a)
    localStorage.setItem(LOCAL_STORGE_KEY, JSON.stringify(a))
    inputRef.current.value = ""
    setInput("")
  }

  const toggleTodo = (id) => {
    const newTodos = [...todo]
    const todos = newTodos.find(todos => todos.id === id);
    todos.complete = !todos.complete
    setTodo(newTodos)
  }

  const handleClearTodos = () => {
    const newTodos = todo.filter(todos => !todos.complete)
    localStorage.setItem(LOCAL_STORGE_KEY, JSON.stringify(newTodos))
    setTodo(newTodos)
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="flex justify-center items-start flex-col ">

        <input ref={inputRef} type="text" name="text" id="text" className="border-2 border-gray-700 w-[14rem] p-2 rounded-md placeholder:text-gray-700" onChange={handleChange} />
        <div className="space-x-2 mt-3" placeholder="Enter Your Todo">

          <button className="bg-gray-500 text-white p-2 rounded-md" onClick={handleAddTodo}>Add Todo</button>
          <button className="bg-gray-500 text-white p-2 rounded-md " onClick={handleClearTodos}>Clear Complete</button>
        </div>
        <div className="mt-3">
          <span className="font-bold bg-gray-800 text-base text-white py-1 px-2 text-center mx-2 rounded-md">{todo && todo.filter(todos => !todos.complete).length} </span> left to do</div>
      </div>
      {
        todo.length > 0 &&
        <div className="flex flex-col items-start w-[14rem] mt-4 justify-start">
          <h1 className="text-2xl font-bold text-gray-700 my-3">TODOS:</h1>
          {todo &&
            todo.map((e, index) => {
              return <div key={index}>

                <TodoList todo={e} toggleTodo={toggleTodo} />
              </div>
            })}
        </div>
      }
    </div>
  )
}

export default App