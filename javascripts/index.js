window.onload = function(id) {

    function change_suggestions(url, name, location, gender, bio){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')

        const location_icon = document.createElement("i")
        location_icon.classList.add("fa-solid", "fa-location-dot")
        const gender_icon = document.createElement("i")
        gender_icon.classList.add("fa-solid", "fa-mars-and-venus")

        image.src = url
        sugg_name.textContent =  name
        sugg_location.innerHTML = ""
        sugg_location.appendChild(location_icon) 
        sugg_location.innerHTML += location 
        sugg_gender.innerHTML = ""
        sugg_gender.appendChild(gender_icon)
        sugg_gender.innerHTML += gender
        sugg_bio.textContent = bio
    }
    
    function create_match(id, name, age){
        const left_bottom = document.querySelector('.left_bottom')

        const new_match = document.createElement('div')
        new_match.classList.add('match')
        new_match.setAttribute('id', id)
    
        const match_name = document.createElement('h3')
        match_name.textContent = name + ' ' + age

        new_match.appendChild(match_name)
        left_bottom.appendChild(new_match)
    }
}