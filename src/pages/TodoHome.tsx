import React, {  useEffect, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import TodoType from '../components/TodoTypes'
import { FilterOptions } from '../components/FilterOptions'
import TodoList from '../components/TodoList'
import Circle from '../components/Circle'
import Moon from '../components/Moon'
import Sun from '../components/Sun'
import axios from '../axios/axios'

interface ThemeState {
    darkTheme: boolean;
    setDarkTheme: (value: boolean) => void;
}

function TodoHome({darkTheme,setDarkTheme}:ThemeState) {
    const [filter, setFilter] = useState('All')
    const [task, setTask] = useState('')
    const [userName] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : '';
    })
    const [todoList, setTodoList] = useState<TodoType[]>([])

    const getAccessToken = () => {
        return localStorage.getItem('access_token')
    }

    const logOut = () => {
        
          axios.post('/api/user/logout',{},{
            headers: {
                Authorization: getAccessToken()
              }
          }).then((res)=>{
            console.log(res)
            localStorage.setItem('signedIn', JSON.stringify(false));
          window.location.reload()
          })
    }


    const toggleTodo = (id: number) => {
        const index = todoList.findIndex(todo => todo._id === id)
        const newTodoList = [...todoList]
        newTodoList[index].completed = !newTodoList[index].completed
        setTodoList(newTodoList)
        axios.post('/api/todo/markall', {
            ids:[id.toString()]
          }, {
            headers: {
              Authorization: getAccessToken()
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

    const deleteTodo = (id: number) => {
        const index = todoList.findIndex(todo => todo._id === id)
        const newTodoList = [...todoList]
        if (index !== -1)
            newTodoList.splice(index, 1)
        setTodoList(newTodoList)

        axios.delete(`/api/todo/${id}`, {
            headers: {
              Authorization: getAccessToken()
            }
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    }

    const addTodo = (e: React.KeyboardEvent) => {

        if (e.keyCode !== 13)
            return

        if (task.trim() !== '') {
            const newTodo = {
                _id: Date.now(),
                task: task.trim(),
                completed: false,
            }

            axios.post('/api/todo/', {
                title: newTodo.task,
                expiry: new Date().toISOString().slice(0, -1)
            }, {
                headers: {
                    Authorization : getAccessToken()
                }
            }).then((res) => { console.log(res) })
            setTodoList([...todoList, newTodo])
        }
        setTask('')
    }

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination)
            return
        const newTodoList = [...todoList]
        const [reArrangedItem] = newTodoList.splice(result.source.index, 1)
        newTodoList.splice(result.destination.index, 0, reArrangedItem)
        setTodoList(newTodoList)
    }

    useEffect(()=>{
        axios.get('/api/todo', {
            headers: {
                'Authorization': getAccessToken(),
                'Content-Type': 'application/json'
            }
        }).then((res) => { console.log(res)
            const newTodo = res.data.map((item:any)=>{
                const { id: _id,title: task,is_completed: completed } = item;
                return {
                    _id,task,completed
                }
            })
        setTodoList(newTodo)
         }).catch((e:Error)=>{
            console.error(e.message)
                localStorage.removeItem('access_token');
                localStorage.setItem('signedIn',JSON.stringify(false))
                window.location.reload()
         })
    },[])

    useEffect(() => {
        localStorage.setItem(`todolist-${userName}`, JSON.stringify(todoList))
    }, [todoList])


    return (
        <div>

            <div className={`banner ${darkTheme ? 'banner-dark':'banner-light'}`} ></div>
            <main className='w-[540px] mx-auto -mt-56'>
                <div className='flex justify-between items-center mb-11'>
                    <h1 className='text-6xl tracking-[1.2rem]' style={{color:`${darkTheme ? '#3E4A52' : 'white'}`}}>TODO</h1>
                    <div className='inline-flex gap-10'>

                    <div onClick={() => { setDarkTheme(!darkTheme) }} className="w-8 h-8 cursor-pointer" style={{color:`${darkTheme ? '#3E4A52' : 'white'}`}}>
                    {darkTheme ? <Moon/> : <Sun/>}
                    </div>
                    <div onClick={logOut} style={{color:`${darkTheme ? '#3E4A52' : 'white'}`}}><span>Logout</span></div>
                    </div>
                    
                </div>
                <div className='flex mb-5 rounded-md' style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }} >
                    
                    <Circle/>
                    <input
                        className='w-full h-16 rounded-md ml-2 outline-none border-none bg-white dark:bg-20242a'
                        style={{ backgroundColor: `${darkTheme ? '#20242a' : 'white'}` }}
                        type='text'
                        value={task}
                        onChange={e => setTask(e.target.value)}
                        onKeyDown={addTodo}
                        title='Create a new todo'
                        placeholder='Create a new todo...'
                    />
                </div>
                <div className='bg-#ffffff dark:bg-20242a rounded-md shadow-lg' style={{ 'backgroundColor': `${darkTheme ? '#20242a' : 'white'}` }}>
                    <TodoList
                        filter={filter}
                        todoList={todoList}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        handleOnDragEnd={handleOnDragEnd}
                    />

                    <footer className='flex justify-between p-5 text-btn-txt dark:text-btn-txt'>
                        <div>
                            <small>
                                {todoList.filter((item) => !item.completed).length} items left
                            </small>
                        </div>
                        <div className='button-box'>
                            <button className={`${filter === FilterOptions.ALL ? '' : 'inactive'} filter-button`} style={{color:"blue"}} onClick={() => setFilter(FilterOptions.ALL)}>
                                All
                            </button>
                            <button className={`${filter === FilterOptions.ACTIVE ? '' : 'inactive'} filter-button`} style={{color:"purple"}} onClick={() => setFilter(FilterOptions.ACTIVE)}>
                                Active
                            </button>
                            <button className={`${filter === FilterOptions.COMPLETED ? '' : 'inactive'} filter-button`} style={{color:"green"}} onClick={() => setFilter(FilterOptions.COMPLETED)}>
                                Completed
                            </button>
                        </div>
                        <div>
                            <button className='font-semibold opacity-50 hover:opacity-100 filter-button' onClick={() => setTodoList(todoList.filter(item => !item.completed))}>
                                Clear completed
                            </button>
                        </div>
                    </footer>

                </div>
                {/* <div className='text-center mt-10 mb-10 mx-auto text-primary-txt dark:text-dark-primary-txt'>
                    <small>
                        Drag and drop to reorder list
                    </small>
                </div> */}
            </main>
        </div>
    )
}

export default TodoHome