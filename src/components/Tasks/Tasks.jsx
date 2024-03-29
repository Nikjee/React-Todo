import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Droppable } from 'react-beautiful-dnd'

import editSvg from '../../assets/img/edit.svg'

import './Tasks.scss'

import AddTasksForm from './AddTasksForm'
import Task from './Task'

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  withoutEmpty,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => alert('Не удалось обновить название списка'))
    }
  }

  return (
    <div className='tasks'>
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className='tasks__title'>
          {list.name}
          <img onClick={editTitle} src={editSvg} alt='edit'></img>
        </h2>
      </Link>
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div
            className='tasks__items'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {!withoutEmpty && list.tasks && !list.tasks.length && (
              <h2>Задачи отсутсвуют</h2>
            )}
            {list.tasks &&
              list.tasks.map((task, index) => (
                <Task
                  index={index}
                  key={task.id}
                  list={list}
                  onEdit={onEditTask}
                  onRemove={onRemoveTask}
                  onComplete={onCompleteTask}
                  {...task}
                />
              ))}
            {provided.placeholder}
            <AddTasksForm key={list.id} onAddTask={onAddTask} list={list} />
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Tasks
