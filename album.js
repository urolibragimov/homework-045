const albumContainer = document.querySelector('.album-cards')

// function getCardAlbum({ title }) {
// 	return `
// 	<div class='album-card'>
// 		<h3>${title}</h3>
// 	</div>
//   `
// }

async function getUser() {
	let albumId = localStorage.getItem('usersId')
	albumContainer.innerHTML = '...loading'
	let res = await fetch(
		`https://jsonplaceholder.typicode.com/users/${albumId}/albums`
	)
	let album = await res.json()
	console.log(album)
	albumContainer.innerHTML = ''
	album.forEach(element => {
		albumContainer.innerHTML += getCardAlbum(element)
	})
	// let albumCheck = album.filter(el => el.completed === true)
	// let albumFalse = album.filter(el => el.completed === false)
}

getUser()
