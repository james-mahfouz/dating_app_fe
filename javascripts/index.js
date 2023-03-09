window.onload = function(id) {
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