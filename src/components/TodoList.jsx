/* eslint-disable react/prop-types */

function TodoList({ todo, toggleTodo }) {
    const handleCheckBox = () => {
        toggleTodo(todo.id)
    }
    return (
        <>
            <div>
                <input type="checkbox" className="mx-2" checked={todo.complete} onChange={handleCheckBox} />
                <span className="text-lg">
                    {todo.name}
                </span>
            </div>
        </>
    )
}

export default TodoList