window.onload = function(id) {
    

    change_suggestions("images/man.png", "John Smith", "Beirut", "male", "hello world")
    function change_suggestions(url, name, location, gender, bio){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')

        image.src = url
        sugg_name.textContent = name
        sugg_location.textContent = location
        sugg_gender.textContent = gender
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