import React from 'react'
import axios from 'axios'

import List from '../List/List'
import Badge from '../Badge/Badge'

import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss'

function AddListButton({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false)
  const [selectedColor, selectColor] = React.useState(3)
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    selectColor(colors[0].id)
    setInputValue('')
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка')
      return
    }

    setIsLoading(true)
    axios
      .post('/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0]
        const listObj = { ...data, color, tasks: [] }
        onAdd(listObj)
        onClose()
        setIsLoading(false)
      })
      .catch(() => alert('Ошибка при добавлении списка'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddListButton
