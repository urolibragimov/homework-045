const usersContainer = document.querySelector('.users-cards')

let page = 1
let limit = 10

function getCardUsers({
	id,
	name,
	username,
	email,
	address: {
		street,
		suite,
		city,
		zipcode,
		geo: { lat, lng },
	},
	phone,
	website,
	company: { name: companyName, catchPhrase, bs },
}) {
	return `
		<div class='user-card d-flex flex-column gap-3'>
			<div class='user-name d-flex justify-content-between'>
				<h2>${name}</h2>
				<h2>${username}</h2>
			</div>
			<div class='user-address d-grid gap-2'>
				<div class='user_address-street d-flex justify-content-between'>
					<h4>${street}</h4>
					<p>${suite}</p>
				</div>
				<div class='user_address-city d-flex align-items-center justify-content-between'>
					<h5>${city}</h5>
					<h6>${zipcode}</h6>
				</div>
				<div class='user_address-geo d-flex justify-content-between'>
					<p>${lat}</p>
					<p>${lng}</p>
				</div>
			</div>
			<div class="d-flex flex-column gap-1">
				<a href='tel: ${phone}'>${phone}</a>
				<a href='${website}'>${website}</a>
			</div>
			<div class="user-company d-grid gap-2">
				<h2>${companyName}</h2>
				<h3>${catchPhrase}</h3>
				<p>${bs}</p>
			</div>
			<div class="user-btn">
				<a class='user_btn-album' onclick='saveId(${id})' href="album.html">Album</a>
				<a class='user_btn-photos' onclick='saveId(${id})' href="photos.html">Photos</a>
			</div>
		</div>
  `
}

function saveId(id) {
	localStorage.setItem('usersId', id)
}

async function getUser() {
	usersContainer.innerHTML = '...loading'
	let res = await fetch('https://jsonplaceholder.typicode.com/users')
	let users = await res.json()
	usersContainer.innerHTML = ''
	users.forEach(element => {
		usersContainer.innerHTML += getCardUsers(element)
	})
}

getUser()
