let tagText = document.querySelector('.tag-text')
let addTagButton = document.querySelector('.add')
let showTagsButton = document.querySelector('.show')
let hideTagsButton = document.querySelector('.hide')
let updateTagsButton = document.querySelector('.update')
let tagContainer = document.querySelector('.tags')

const tags = []
let tagsVisibility = false

const setLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(tags))
}

const app = {
  add: function(newTag) {
    if (tags.indexOf(newTag) < 0) {
      tags.push(`#${newTag}`)
    }
    tagText.value = ''
    if (tagsVisibility) this.showTags()
  },

  delete: function(e) {
    if (e.target.className === 'close-tag') {
      let tag = e.target.parentNode.firstElementChild.innerText
      let index = tags.indexOf(tag)
      tags.splice(index, 1)
      if (tagsVisibility) this.showTags()
    }
  },

  showTags: () => {
    
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
  },

  hideTags: () => {
    tagContainer.style.display = 'none'
    tagsVisibility = false
  }

}

addTagButton.addEventListener('click', () => app.add(tagText.value))
showTagsButton.addEventListener('click', app.showTags)
hideTagsButton.addEventListener('click', app.hideTags)
tagContainer.addEventListener('click', (e) => app.delete(e))