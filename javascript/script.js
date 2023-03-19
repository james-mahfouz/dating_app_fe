const workshop_pages = {};

workshop_pages.base_url = "http://localhost:8000/api/v0.0.1/users/";

workshop_pages.getAPI = async (api_url, api_token=null) => {
    try{
        return await axios(
            api_url,
            {
                headers:{
                    'Authorization' : `Bearer ${api_token}`
                }
            }
        );

    }catch(error){
        console.log("Error from GET API");
    }
}

workshop_pages.postAPI = async (api_url, api_data, api_token = null) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            {
                headers:{
                    'Authorization' : `Bearer ${api_token}`
                }
            }
        );
    }catch(error){
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_login = async () => {
    
    signin = document.getElementById('signin_btn')

    signin.addEventListener('click', check_infos)

    async function check_infos() {
        const email = document.getElementById('e_mail').value
        const password = document.getElementById('pass_code').value
        const get_users_url = workshop_pages.base_url + `login?email=${email}&password=${password}`;
        const response = await workshop_pages.getAPI(get_users_url);
        console.log(response.data);
        if (response.data.status=="success"){
            localStorage.setItem('token',response.data.authorisation.token)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = 'index.html'
        }
    }
}

workshop_pages.load_register = async () => {
    const country_list  = document.getElementById('country_list')
    const response = await workshop_pages.getAPI('https://restcountries.com/v2/all')
    const country_names = response.data.map(country => country.name);
    country_names.forEach(name => {
        const option = document.createElement('option');
        option.value = name
        option.text = name
        country_list.appendChild(option);
    });

    signup = document.getElementById('register_btn')
    signup.addEventListener('click', check_infos)
    async function check_infos() {
        const register_users_url = workshop_pages.base_url + "register";
        let firstName = document.getElementById('f_name').value
        let age = document.getElementById('age').value
        let email = document.getElementById('e_mail').value
        let gender = document.getElementById("gender").value
        let password = document.getElementById('pass_code').value
        let country = document.getElementById('country').value

        age = parseInt(age)
        const data = new FormData()
        data.append('name',firstName)
        data.append('email',email)
        data.append('gender',gender)
        data.append('password',password)
        data.append('country',country)
        data.append('age',age)
    

        const response = await workshop_pages.postAPI(register_users_url, data);
        if (response.data.status=="success"){
            localStorage.setItem('token',response.data.authorisation.token)
            window.location.href = 'index.html'
        }
    }
}

workshop_pages.load_index = async () => {
    const token = localStorage.getItem('token')
    if(token == null){
        window.location.href = 'login.html' 
    }

    const country_list  = document.getElementById('country_list')
    const countries = await workshop_pages.getAPI('https://restcountries.com/v2/all')
    const country_names = countries.data.map(country => country.name);
    country_names.forEach(name => {
        const option = document.createElement('option');
        option.value = name
        option.text = name
        country_list.appendChild(option);
    });

    let user = JSON.parse(localStorage.getItem('user'));
    let username = document.getElementById('username')
    username.innerHTML += user.name

    const data = new FormData()
    data.append('gender', user.genders_id)
    const response = await workshop_pages.postAPI(workshop_pages.base_url + 'getusers', data, token)
    const users = response.data
    let index = 0
    let user_sugg = users[index]
    change_suggestions(user_sugg.name, user_sugg.country, user_sugg.genders_id)

    dislike= document.querySelector(".dislike-icon")
    like= document.querySelector(".like-icon")

    dislike.addEventListener("click", () => {
        change_index()
        change_suggestions(user_sugg.name, user_sugg.country, user_sugg.genders_id)
    })
    like.addEventListener("click", () => {
        change_index()
        change_suggestions(user_sugg.name, user_sugg.country, user_sugg.genders_id)
    })

    const logout = document.getElementById('logout_btn')
    logout.addEventListener('click', async () =>{
        const response = await workshop_pages.getAPI(workshop_pages.base_url + 'logout', token)
        console.log(response.data)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = 'login.html'
    })
    
    function change_suggestions(name, location, gender, bio, url = "images/user.jpg"){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')

        image.src = url
        sugg_name.textContent =  name
        sugg_location.innerHTML = location 
        if(gender == 1){
            sugg_gender.innerHTML = 'Male'
        }else{
            sugg_gender.innerHTML = 'Female'
        }
        if (bio != null){
            sugg_bio.textContent = bio
        }
    }
    function change_index(){
        if(index < users.length-1){
            index+=1
        }else{
            index = 0
        }
        user_sugg = users[index]
    }
}

workshop_pages.load_profile = async () =>{
    const token = localStorage.getItem('token')
    if(token == null){
        window.location.href = 'login.html' 
    }
    let user = JSON.parse(localStorage.getItem('user'));
    const gender = user.genders_id == 1 ? "Male" : "Female";
    user_profile(user.name,user.country, gender, user.description)

    let user_name = document.getElementById("sugg_name")
    let user_location = document.getElementById("sugg_location")
    let user_bio = document.getElementById("sugg_bio")

    user_bio.addEventListener("blur", function() {
        const newText = user_bio.textContent;
        user_bio.textContent = newText;
    });

    user_name.addEventListener("blur", function() {
        const newText = user_name.textContent;
        user_name.textContent = newText;
    });

    user_location.addEventListener("blur", function() {
        const newText = user_location.textContent;
        user_location.textContent = newText;
    });

    const edit = document.getElementById("edit")
    edit.addEventListener("click",edit_profile)

    async function edit_profile(){
        const edit_name = document.getElementById('sugg_name').innerHTML
        const edit_description = document.getElementById('sugg_bio').innerHTML
        const edit_country = document.getElementById('sugg_location').innerHTML

        const data = new FormData()
        data.append('name',edit_name)
        data.append('description',edit_description)
        data.append('country', edit_country)

        const response = await workshop_pages.postAPI(workshop_pages.base_url+"change", data, token)
        if(response.data.status == "success"){
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
    }
    function user_profile(name, location, gender, bio,url = "images/user.jpg"){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')

        image.src = url
        sugg_name.textContent +=  name
        sugg_location.innerHTML += location 
        sugg_gender.innerHTML += gender
        if (bio != null){
            sugg_bio.textContent = bio
        }
    }
}

