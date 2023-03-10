import project from './projects'
import task from './tasks'

const displayController = () => {
  //properties
  const sideBar = document.querySelector('.sidebar-projectList')
  let projectListItem = document.querySelectorAll('.sidebar__project')
  const projectTitle = document.querySelector('#projectTitle')
  const taskContainer = document.querySelector('.task-container')
  let taskFormContainer
  const newTask = document.querySelector('#new-task')
  
  // functions
  const setProjectTitle = (value) => {
    projectTitle.textContent = value
  }
  
  const addToSideBar = (project) => {
    // create list element and append to sidebar
    let listItem = document.createElement('li')
    listItem.classList.add('sidebar__project')
    listItem.textContent = `${project.getProjectName()}`

    listItem.addEventListener('click', () => {
      setProjectTitle(listItem.innerText)
      loadTasks(project)
      getProjectItems()
    })

    sideBar.appendChild(listItem)
  }

  const loadTasks = (project) => {
    taskContainer.innerHTML = ''
    let taskList = project.getTaskList()

    taskList.forEach((element) => {
      populateTaskHTMLData(element)
    })
  }

  const getProjectItems = () => {
    projectListItem = document.querySelectorAll('.sidebar__project')
    return projectListItem
  }

  const populateTaskHTMLData = (task) => {
    let taskDiv = document.createElement('div')
    let taskLeft = document.createElement('div')
    let taskRight = document.createElement('div')

    taskLeft.classList.add('task-left')
    taskRight.classList.add('task-right')
    taskDiv.classList.add('task-div')

    let inputCheckBox = document.createElement('input')
    inputCheckBox.setAttribute('type', 'checkbox')

    inputCheckBox.addEventListener('click', () => {
      // event listener for checkbox to adjust task status
      if (inputCheckBox.checked) {
        task.status = 'complete'
        taskDiv.classList.add('complete')
      } else if (!inputCheckBox.checked) {
        task.status = 'incomplete'
        if (taskDiv.classList.contains('complete')) {
          taskDiv.classList.remove('complete')
        }
      }
      console.log(`Task: ${task.name}, Status: ${task.status}`)
    })

    const taskName = document.createElement('div')
    taskName.textContent = task.name

    if (task.status === 'complete') {
      taskDiv.classList.add('complete')
      inputCheckBox.checked = true
    }

    const dueDate = document.createElement('div')
    dueDate.textContent = task.dueDate

    const priority = document.createElement('div')
    priority.textContent = `Priority: ${task.priority}`

    taskLeft.appendChild(inputCheckBox)
    taskLeft.appendChild(taskName)
    taskRight.appendChild(dueDate)
    taskRight.appendChild(priority)

    taskDiv.appendChild(taskLeft)
    taskDiv.appendChild(taskRight)

    taskContainer.appendChild(taskDiv)
  }

  newTask.addEventListener('click', () => {
    taskFormContainer = document.querySelector('.task-form-container')
    taskFormContainer.style.display ='block'
  })


  return {
    addToSideBar,
    setProjectTitle,
    getProjectItems,
    populateTaskData: populateTaskHTMLData,
    loadTasks,
  }
}

export default displayController
