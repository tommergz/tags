let tagText = document.querySelector('.tag-text')
let newTagContainer = document.querySelector('.tag-textarea')
let addTagButton = document.querySelector('.add')
let showTagsButton = document.querySelector('.show')
let hideTagsButton = document.querySelector('.hide')
let updateTagsButton = document.querySelector('.update')
let tagContainer = document.querySelector('.tags')
let tagUpdater = document.querySelector('.tag-updater-wrapper')
let newTagSetter = document.querySelector('.update-button')
let closeTagUpdater = document.querySelector('.close-textarea')

let tags = []

if (localStorage.getItem('data')) {
  tags = JSON.parse(localStorage.getItem('data'))
}

const setLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(tags))
}

let tagsVisibility = false

const app = {

  reloadTags: function() {
    if (tagsVisibility) this.showTags()
  },

  add: function(newTag) {
    if (tags.indexOf(newTag) < 0 && tags.indexOf(`#${newTag}`) < 0) {
      if (newTag[0] !== '#') {
        tags.push(`#${newTag}`)
      } else {
        tags.push(`${newTag}`) 
      }
      setLocalStorage(tags)
    }
    tagText.value = ''
    this.reloadTags()
  },

  delete: function(e) {
    if (e.target.className === 'close-tag') {
      let tag = e.target.parentNode.firstElementChild.innerText
      let index = tags.indexOf(tag)
      tags.splice(index, 1)
      setLocalStorage(tags)
      if (!tags.length) {
        this.hideTags()
      } else {
        this.reloadTags()
      }
    }
  },

  showTags: () => {
    
    if (tags.length) {
      let allTags = ``
      tags.forEach(el => {
        allTags += `
          <div class="tag" id="${el}">
            <div class="tag-text">
              ${el}
            </div>
            <img class="close-tag" src="./assets/images/close.svg" />
          </div>
        `
      })
      tagContainer.innerHTML = allTags
      tagContainer.style.display = 'flex'
      tagsVisibility = true
    }
  },

  hideTags: () => {
    tagContainer.style.display = 'none'
    tagsVisibility = false
  },

  openTagListEditor: () => {
    tagUpdater.style.display = 'flex'
  },

  closeTagListEditor: () => {
    tagUpdater.style.display = 'none'
  },

  updateTags: function(newTags) {
    let updatedTags = newTags.split(',')
    updatedTags = updatedTags.map(item => {
      let newTag = item.trim()
      if (newTag[0] === '#') {
        return item.trim()
      } else {
        return `#${newTag}`
      }
    })
    tags = updatedTags
    setLocalStorage(tags)
    this.reloadTags()
    newTagContainer.value = ''
    tagUpdater.style.display = 'none'
  }

}

addTagButton.addEventListener('click', () => app.add(tagText.value))
showTagsButton.addEventListener('click', app.showTags)
hideTagsButton.addEventListener('click', app.hideTags)
tagContainer.addEventListener('click', (e) => app.delete(e))
updateTagsButton.addEventListener('click', app.openTagListEditor)
closeTagUpdater.addEventListener('click', app.closeTagListEditor)
newTagSetter.addEventListener('click', () => app.updateTags(newTagContainer.value))
