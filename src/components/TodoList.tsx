import {DragDropContext,Droppable,Draggable,OnDragEndResponder} from 'react-beautiful-dnd'
import TodoType from './TodoTypes'
import { FilterOptions } from './FilterOptions'
import Circle from './Circle'
import Check from './Check'
import Cross from './Cross'

interface TodoListProps {
    filter:String
    todoList:TodoType[],
    toggleTodo:(id:number) => void,
    deleteTodo:(id:number)=>void,
    handleOnDragEnd:OnDragEndResponder
}

function TodoList({
    filter,
    todoList,
    toggleTodo,
    deleteTodo,
    handleOnDragEnd
}:TodoListProps) {

  const createDraggable = (todo:TodoType,i:number) => {
    return (
      <Draggable key={todo._id} draggableId={todo._id.toString()} index={i}>
        {(provided) => (
          <li
            className='p-5border-b-[1px] border-solid border-custom-border-color 
            dark:border-custom-border-color-dark flex justify-between items-center'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div onClick={()=>toggleTodo(todo._id)}>
               {todo.completed ? <Check/>: <Circle/>}
            </div>
            <div className={todo.completed ? 'line-through opacity-50':''}>
              {todo.task}
            </div>
            <div onClick={()=>deleteTodo(todo._id)} className='opacity-30 hover:opacity-100'>

            <Cross/>
            </div>
          </li>
        )}
      </Draggable>
    )
  }

  return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='todos-list'>
          {provided => (
            <ul
              className='todos-list'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todoList.map((todo,i)=>(
                (
                  filter===FilterOptions.ALL ||
                  (filter===FilterOptions.ACTIVE && !todo.completed) ||
                  (filter===FilterOptions.COMPLETED && todo.completed)
                ) && createDraggable(todo,i)
              ))

              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
  )
}

export default TodoList