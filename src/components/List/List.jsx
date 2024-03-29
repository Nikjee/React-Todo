import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

import Badge from '../Badge/Badge'

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

function List({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      console.log(item.id)
      axios
        .delete('/lists/' + item.id)
        .then(() => onRemove(item.id))
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove"
              onClick={() => removeList(item)}
            ></img>
          )}
        </li>
      ))}
    </ul>
  )
}

export default List
