import React from 'react'
import classNames from 'classnames'
import './List.scss'

function List({ items, isRemovable }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className={classNames(item.className, { active: item.active })}>
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <i className={`badge badge--${item.color}`}></i>
            )}
          </i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default List
