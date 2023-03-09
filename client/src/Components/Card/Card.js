import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleCheck, faPen, faTrashCan 
} from '@fortawesome/free-solid-svg-icons'
import "./Card.css"

function Card({listOfTodos, updateTodo, deleteTodo}) {
  return (
  <>
    <div className="mt-4"></div>
    { listOfTodos.map((t, i) => (
        <div key={t.id} className="col taskBg">
            <div 
                // if task status is true, add class to this div named as done
                className={ t.complete ? 'done' : '' }>
                <span className="taskText">{t.task_name}</span>
            </div>
            <div className="iconsWrap">
              <span>
                <input type="checkbox"
                  defaultChecked={t.complete}
                  onClick={() => updateTodo(t, !(t.complete))}
                />
              </span>
              <span title="Delete" 
                  onClick={() => deleteTodo(t.id)}
                  title="Delete">
                  <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
         </div>
        )) }
    </>
  )
  
}
export default Card;