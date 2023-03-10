const photosContainer = document.querySelector('.photos-cards')
let pagination = document.querySelector('.pagination')

function getCardPhotos({ title, url, thumbnailUrl }) {
	return `
  <div class="photos-card">
    <h3>${title}</h3>
    <img src=${url} alt="">
    <img src=${thumbnailUrl} alt="">
  </div>
  `
}

let page = 1
let limit = 50

async function getUser() {
	let photosId = localStorage.getItem('usersId')
	photosContainer.innerHTML = '...loading'
	let res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${photosId}/photos?_page=${page}&_limit=${limit}`
    )
    let photos = await res.json()
    console.log(photos);
	photosContainer.innerHTML = ''
	photos.forEach(element => {
		photosContainer.innerHTML += getCardPhotos(element)
	})
	// let albumCheck = photos.filter(el => el.completed === true)
	// let albumFalse = photos.filter(el => el.completed === false)
}

getUser()

function getPagination() {
	let pagination_numbers = ''
	Array(10)
		.fill(1)
		.forEach((item, index) => {
			pagination_numbers += `<li class="page-item ${
				page == index + 1 ? 'active' : ''
			}" onclick="getPage(${index + 1})">
        <span class="page-link">
          ${index + 1}
        </span>
      </li>`
		})

	pagination.innerHTML = `
    <li onclick="getPage('-')" class="page-item ${
			page == 1 ? 'disabled' : ''
		}"><button class="page-link" href="#">Previous</button></li>
    ${pagination_numbers}
    <li onclick="getPage('+')" class="page-item ${
			page == 20 ? 'disabled' : ''
		}"><button class="page-link" href="#">Next</button></li>
  `
}

getPagination()

function getPage(p) {
	if (p == '+') {
		page++
	} else if (p == '-') {
		page--
	} else {
		page = p
	}
	if (page <= 10) {
		getUser()
		getPagination()
	}
}
