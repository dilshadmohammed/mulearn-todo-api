import { FormEvent, useState } from "react";
interface TodoTypes {
    name: String,
    completed: Boolean
}

function Home() {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState<TodoTypes[]>([]);
    // Function to handle adding a new todo
    const handleAddTodo = (e: FormEvent) => {
        e.preventDefault()
        if (todo.trim() !== '') {
            setTodoList([...todoList, { name: todo, completed: false }]);
            setTodo('');
        }
    };
    function toggleTodoCompletion(index:number) {
        // Create a new array with the updated todo item
        const updatedTodoList = todoList.map((todo, i) => {
            // If the index matches, toggle the completed status
            if (i === index) {
                return { ...todo, completed: !todo.completed };
            }
            // Otherwise, return the todo item as it is
            return todo;
        });
    
        // Update the todoList state with the new array
        setTodoList(updatedTodoList);
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <div className="w-full h-[40vh] bg-cover bg-center bg-[url('banner.jpg')]"></div> {/* Banner image */}
            <div className="w-full h-[60vh] bg-gray-200 flex flex-col justify-center">

            </div>
            <form className="absolute z-10 mt-24 p-4 w-[30%]" onSubmit={handleAddTodo}>

                <h1 className="text-5xl  font-semibold text-white mb-4">TODO</h1> {/* Heading */}
                <div className="inline-flex p-2 bg-white items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#C6A0F5" className="w-6 h-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Enter your todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="w-full h-10 px-4 outline-none border-none"
                    />



                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>



                    {/* Input field */}
                </div>
                <br /><br />
                <div className="w-full min-h-72 bg-white shadow-md">
                    {/* Todo list */}
                    {todoList.map((todoItem, index) => (

                        <div key={index} className="p-2 border-b border-gray-300 my-1 rounded-none inline-flex w-full items-center">
                            {todoItem.completed ? (

                            <svg onClick={()=>toggleTodoCompletion(index)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C6A0F5" className="w-6 h-6 m-1">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                            ):(

                            <svg onClick={()=>toggleTodoCompletion(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#C6A0F5" className="w-6 h-6 m-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            )}

                            <span className={` ${todoItem.completed ? 'line-through' : ''} ml-3`}>
                                {todoItem.name}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1 ml-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    ))}
                    <div>
                        
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Home