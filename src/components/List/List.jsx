import React from 'react'
import classNames from 'classnames'
import Badge from '../Badge/Badge'

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

function List({ items, isRemovable, onClick, onRemove }) {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?'))
      onRemove(item)
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item) => (
        <li className={classNames(item.className, { active: item.active })}>
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
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
