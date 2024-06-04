import { useState, useEffect } from 'react'
import './App.css'
import LightModeIcon from "./assets/images/icon-moon.svg"
import DarkModeIcon from "./assets/images/icon-sun.svg"
import CrossIcon from "./assets/images/icon-cross.svg"
import {DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter} from "@dnd-kit/core"

import {SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable"

import { CSS } from '@dnd-kit/utilities'

import { useSensors, useSensor } from '@dnd-kit/core'

function App() {
  const [todos, setTodos] = useState([])

  const [inputTodos, setInputTodos] = useState("")

  const [itemsLeft, setItemsLeft] = useState(10)

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    setItemsLeft(10 - todos.length)
  }, [todos])

  const displayAll = () => {
      localStorage.setItem("display", "display all")
      let displayAllState = document.getElementById("all")
      let displayActiveState = document.getElementById("active")
      let displayCompletedState = document.getElementById("completed")
      displayAllState.style.color = "rgb(43, 43, 255)"
      displayActiveState.style.color = "#9294ac"
      displayCompletedState.style.color = "#9294ac"
    const displayState = localStorage.getItem("display")
    todos.map(todo => {
      const displayInputWithState = document.getElementById(todo.id)
      const displayLabelWithState = document.getElementById(`todoListLabel - ${todo.id}`)

      
      if(displayState === "display all") {
        displayInputWithState.style.display = "block"
        displayLabelWithState.style.display = "block"
      } else if (displayState === "display active") {
 
        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        } else {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        }
      } else if(displayState === "display completed") {

        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        } else {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        }
      }
    })
  }

  const displayActive = () => {
    localStorage.setItem("display", "display active")
      let displayAllState = document.getElementById("all")
      let displayActiveState = document.getElementById("active")
      let displayCompletedState = document.getElementById("completed")
      displayAllState.style.color = "#9294ac"
      displayActiveState.style.color = "rgb(43, 43, 255)"
      displayCompletedState.style.color = "#9294ac"
    const displayState = localStorage.getItem("display")
    todos.map(todo => {
      const displayInputWithState = document.getElementById(todo.id)
      const displayLabelWithState = document.getElementById(`todoListLabel - ${todo.id}`)

      
      if(displayState === "display all") {

        displayInputWithState.style.display = "block"
        displayLabelWithState.style.display = "block"
      } else if (displayState === "display active") {

        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        } else {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        }
      } else if(displayState === "display completed") {
        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        } else {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        }
      }
    })
  }

  const displayCompleted = () => {
      localStorage.setItem("display", "display completed")
      let displayAllState = document.getElementById("all")
      let displayActiveState = document.getElementById("active")
      let displayCompletedState = document.getElementById("completed")
      displayAllState.style.color = "#9294ac"
      displayActiveState.style.color = "#9294ac"
      displayCompletedState.style.color = "rgb(43, 43, 255)"
    const displayState = localStorage.getItem("display")
    todos.map(todo => {
      const displayInputWithState = document.getElementById(todo.id)
      const displayLabelWithState = document.getElementById(`todoListLabel - ${todo.id}`)

      
      if(displayState === "display all") {

        displayInputWithState.style.display = "block"
        displayLabelWithState.style.display = "block"
      } else if (displayState === "display active") {

        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        } else {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        }
      } else if(displayState === "display completed") {

        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        } else {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        }
      }
    })
  }
  const addTodo = () => {
    if(todos.length < 10) {
      if(inputTodos === "") {
        return
      } else {
        
        const newTodo = {
          id: todos.length + 1,
          title: inputTodos,
          completed: false,
        }
        setTodos([...todos, newTodo])
        setInputTodos("")
      }
    }
    else {
      return
    }
  }

  

  

  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {delay:1 , tolerance:0}, }),
    useSensor(PointerSensor, {activationConstraint: {delay:1, tolerance:0}, }),
    useSensor(TouchSensor, {activationConstraint: {delay:1, tolerance:0}, }),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  )

  const SortableList = ({todo}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: todo.id})

    
    const style = {
      transition,
      transform: CSS.Transform.toString(transform)
    }

    const handleCheckboxChange = (id) => {
      setTodos(todos.map(todo => todo.id === id? {...todo, completed: !todo.completed}: todo))
      if(todo.id === id) {
        const checkboxElement = document.getElementById(id)
        if (checkboxElement.checked) {
          localStorage.removeItem(id)
          /* localStorage.setItem(id, `checked ${id}`) */
        } else {
          /* localStorage.removeItem(id) */
          localStorage.setItem(id, `checked ${id}`)
        }
      }
    }


    const deleteById = (id) => {
      setTodos(todos => todos.filter(todo => todo.id !== id).map((todo, index) => ({...todo, id: index + 1})))
      localStorage.removeItem(id)
    }

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {todo && (
          <div className='todoListEachListContainer'>
            <input
              onMouseUp={() => handleCheckboxChange(todo.id)}
              className='checkbox'
              type="checkbox"
              id={todo.id}
              name={`todoListCheckbox-${todo.id}`}
            />
            <label id={`todoListLabel - ${todo.id}`} className="todoList">{todo.title}</label>
            <img onMouseDown={() => deleteById(todo.id)} src={CrossIcon} alt="deleteBtn" id='cross' />
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    todos.map(todo => {
      const checkboxElement = document.getElementById(todo.id)
      const labelElement = document.getElementById(`todoListLabel - ${todo.id}`)
    const getCheckedItem = localStorage.getItem(todo.id)
    if(getCheckedItem) {
      checkboxElement.setAttribute("checked", true)
      labelElement.style.cssText = "color: rgba(128, 128, 128, 0.8); text-decoration: line-through"
    } else {
      checkboxElement.removeAttribute("checked")  
    }
    })
  })

  useEffect(() => {
    const displayState = localStorage.getItem("display")
    todos.map(todo => {
      const displayInputWithState = document.getElementById(todo.id)
      const displayLabelWithState = document.getElementById(`todoListLabel - ${todo.id}`)

      const displayAllState = document.getElementById("all")
      const displayActiveState = document.getElementById("active")
      const displayCompletedState = document.getElementById("completed")

      if(displayState === "display all") {
        displayActiveState.style.color = "#9294ac"
        displayCompletedState.style.color = "#9294ac"
        displayAllState.style.color = "rgb(43, 43, 255)"
        displayInputWithState.style.display = "block"
        displayLabelWithState.style.display = "block"
      } else if (displayState === "display active") {
        displayAllState.style.color = "#9294ac"
        displayCompletedState.style.color = "#9294ac"
        displayActiveState.style.color = "rgb(43, 43, 255)"
        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        } else {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        }
      } else if(displayState === "display completed") {
        displayAllState.style.color = "#9294ac"
        displayActiveState.style.color = "#9294ac"
        displayCompletedState.style.color = "rgb(43, 43, 255)"
        if(displayInputWithState.checked) {
          displayInputWithState.style.display = "block"
          displayLabelWithState.style.display = "block"
        } else {
          displayInputWithState.style.display = "none"
          displayLabelWithState.style.display = "none"
        }
      }
    })
  }, [inputTodos, addTodo])

  

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(!active || !over ) return

    if(active.id === over.id) {
      return
    }
    setTodos(todos => {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id)
      const newIndex = todos.findIndex((todo) => todo.id === over.id)

      return arrayMove(todos, oldIndex, newIndex)
    })
  }

  const clearCompleted = () => {

    //Use => {} for single-expression implicit returns in arrow functions.

    //Use => ({}) or return {...} when you need to explicitly create and return an object within the arrow function.


    const remainingTodos = todos.filter(todo => !todo.completed).map((todo, index) => ({
      ...todo,
      id: index + 1, // Update ID to its new index + 1
    }))
    setTodos(remainingTodos)

    todos.map(todo => {localStorage.removeItem(todo.id)})
  }


  try {
    const getInput = document.getElementById("listInput")
    localStorage.setItem("rendered", "true")
    getInput.addEventListener("keypress", event => {
      if(event.key === "Enter") {
        addTodo()
      }
    })
  } catch {
    localStorage.setItem("rendered", false)
  }

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light")
    localStorage.setItem("theme", "light")
  }

  const selectedTheme = localStorage.getItem("theme")
  
  useEffect(() => {
    if(selectedTheme === "dark") {
      setIsDarkTheme(true)
      setDarkMode()
    }else {
      setIsDarkTheme(false)
      setLightMode()
    }
  })
  


  const toggleTheme = (e) => {
    if(e.target.checked) {
      setIsDarkTheme(true)
      setDarkMode()
    } else {
      setIsDarkTheme(false)
      setLightMode()
    }
  }
  return (
      <div id='mainContent'>
        <div id='heading'>
          <h1 id='todoTitle'>TODO</h1>
          <input type="checkbox" id='themeSetter' name='themeSetter' onChange={toggleTheme} defaultChecked={selectedTheme === "dark"}/>
          <label htmlFor="themeSetter"><img id='themeIcon' src={isDarkTheme ? DarkModeIcon : LightModeIcon} alt="light mode icon" /> </label>
        </div>

        <div id='listInputContainer'>
          <button id='addListItemBtn' className='darkTheme' onClick={addTodo}>+</button>
          <input className='darkTheme' autoFocus id='listInput' type="text" placeholder='Create a new todo..' value={inputTodos} onChange={e => setInputTodos(e.target.value)}/>
        </div>
          <div className='darkTheme' id='todoListContainer'>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                {todos.map((todo) => (
                  <SortableList key={todo.id} todo={todo}/>
                ))}
              </SortableContext>
            </DndContext>
            <div className='darkTheme' id='itemsLeftAndClearComplete'>
              <p id='itemsLeft'>{itemsLeft} items left</p>
              <button className='darkTheme' onClick={clearCompleted} id='clearComplete'>Clear Completed</button>
            </div>
          </div>
          <div className='darkTheme' id='allActiveOrCompletedStates'>
            <button onClick={displayAll} className='whichToDisplayStates darkTheme' id='all'>All</button>
            <button onClick={displayActive}className='whichToDisplayStates darkTheme' id='active'>Active</button>
            <button onClick={displayCompleted} className='whichToDisplayStates darkTheme' id='completed'>Completed</button>
          </div>

          <p id='dndInfo'>Drag and drop to reorder list</p>
      </div>
  )

  
}

export default App