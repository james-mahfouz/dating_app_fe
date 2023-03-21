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
        if (response.data.status=="success"){
            console.log(response.data)
            localStorage.setItem('token',response.data.authorisation.token)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if(response.data.profile_picture_path){
                localStorage.setItem('pp_path', response.data.profile_picture_path.path)
            }
            window.location.href = 'index.html'
        }
    }
}

workshop_pages.load_register = async () => {
    const country_list  = document.getElementById('country_list')
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    countryList.forEach(name => {
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
        let country = document.getElementById('country_list').value

        age = parseInt(age)
        const data = new FormData()
        data.append('name',firstName)
        data.append('email',email)
        data.append('gender',gender)
        data.append('password',password)
        data.append('country',country)
        data.append('age',age)
    

        const response = await workshop_pages.postAPI(register_users_url, data);
        console.log(response)
        if (response.data.status=="success"){
            localStorage.setItem('token',response.data.authorisation.token)
            localStorage.setItem('user', JSON.stringify(response.data.user));
            if(response.data.profile_picture_path.path){
                localStorage.setItem('pp_path', response.data.profile_picture_path.path)
            }
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
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    countryList.forEach(name => {
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
    let filtered_users = users
    let index = 0
    let user_sugg = filtered_users[index]
    if(user_sugg.pictures[0]==null){
        change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description)
    }else{
        change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description, user_sugg.pictures[0].path)
    }

    const filter_button = document.getElementById('filter_btn')
    filter_button.addEventListener('click', () =>{
        filtered_users = []
        let smaller_age = document.getElementById('smaller_age').value
        let highest_age = document.getElementById('highest_age').value
        let country_list = document.getElementById('country_list').value
        if(smaller_age!=null && highest_age==null){
            for(let i = 0; i<users.length; i++){
                if(users[i].age>smaller_age){
                    filtered_users.push(users[i])
                }
            }
        }else if(smaller_age==null && highest_age!=null){
            for(let i = 0; i<users.length; i++){
                if(users[i].age<highest_age){
                    filtered_users.push(users[i])
                }
            }
        }else if(smaller_age!=null && highest_age!=null){
            for(let i = 0; i<users.length; i++){
                if(users[i].age>smaller_age && users[i].age<highest_age){
                    filtered_users.push(users[i])
                }
            }
        }
        if(country_list!=null){
            for(let i = 0; i<users.length; i++){
                if(users[i].country == country_list){
                    filtered_users.push(users[i])
                }
            }
        }
    })

    const fuse = new Fuse(users, {
        keys: ['name'],
        threshold: 0.3, 
    });
      
    const name_results = document.getElementById('name_results')
    const filter_name = document.getElementById('filter_name');
    let first_time = 1
    filter_name.addEventListener('input', (event) => {
        if(first_time==0){   
            const elements = document.getElementsByClassName("name_list");
            while (elements.length > 0) {
                elements[0].remove();
            }
        }
        first_time=0
        first_time=0
        const query = event.target.value;
        const results = fuse.search(query);
        results.forEach((result) => {
            const list_item = document.createElement("li")
            list_item.className = "name_list"
            list_item.id = result.id
            list_item.textContent = result.item.name; 
            name_results.appendChild(list_item);
        });
    });
      
    const skip = document.getElementById("skip");
    const dislike= document.querySelector(".dislike-icon")
    const like= document.querySelector(".like-icon")

    dislike.addEventListener("click", async () => {
        workshop_pages.postAPI(workshop_pages.base_url+`block/${user_sugg.id}`,{}, token)
        filtered_users.splice(index, 1)

        change_index()
        if(user_sugg.pictures[0]==null){
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description)
        }else{
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description, user_sugg.pictures[0].path)
        }
    })
    like.addEventListener("click", () => {
        workshop_pages.postAPI(workshop_pages.base_url+`favorite/${user_sugg.id}`,{}, token)

        change_index()
        if(user_sugg.pictures[0]==null){
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description)
        }else{
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description, user_sugg.pictures[0].path)
        }    
    })

    skip.addEventListener('click', () =>{
        change_index()
        if(user_sugg.pictures[0]==null){
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description)
        }else{
            change_suggestions(user_sugg.name,user_sugg.age, user_sugg.country, user_sugg.genders_id,user_sugg.description, user_sugg.pictures[0].path)
        }  
    })

    const chat = document.getElementById('chat')
    chat.addEventListener('click', ()=>{
        workshop_pages.postAPI(workshop_pages.base_url + `chat/${user_sugg.id}`, {}, token)
        create_chat(user_sugg.id, user_sugg.name, user_sugg.age)
        window.location.href = "chat.html"
    })

    const logout = document.getElementById('logout_btn')
    
    logout.addEventListener('click', async () =>{
        const response = await workshop_pages.getAPI(workshop_pages.base_url + 'logout', token)
        localStorage.removeItem('pp_path')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = 'login.html'
    })
    
    function change_suggestions(name,age, location, gender, bio, url = null){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')

        if(url != null){
            image.src = "http://localhost:8000/storage/" + url
        }else{
            image.src = "images/user.jpg"
        }
        sugg_name.textContent =  name+', '+age
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
        if(index < filtered_users.length-1){
            index+=1
        }else{
            index = 0
        }
        user_sugg = filtered_users[index]
    }

    function create_chat(id, name, age){
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

workshop_pages.load_profile = async () =>{
    const token = localStorage.getItem('token')
    if(token == null){
        window.location.href = 'login.html' 
    }
    let user = JSON.parse(localStorage.getItem('user'));
    const gender = user.genders_id == 1 ? "Male" : "Female";
    user_profile(user.name,user.country, gender, user.description, localStorage.getItem('pp_path'))

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
    let input_picture = document.getElementById("input_picture");
    let pp = document.getElementById("pp");
    input_picture.addEventListener("change", handleFiles, false);

    function handleFiles() {
        let selected_file = this.files[0];
        let imageURL = URL.createObjectURL(selected_file);
        pp.src = imageURL;
    }

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

        input_picture = document.getElementById("input_picture").files[0];
        const picture = new FormData()
        picture.append('profile_picture', input_picture)
        const new_path = await workshop_pages.postAPI(workshop_pages.base_url + "upload_picture",picture, token)
        localStorage.setItem('pp_path',new_path.data.path)
    }
    function user_profile(name, location, gender, bio,url = "images/user.jpg"){
        image=document.querySelector('.user_image img')
        sugg_name = document.querySelector('#sugg_name')
        sugg_location = document.querySelector('#sugg_location')
        sugg_gender = document.querySelector('#sugg_gender')
        sugg_bio = document.querySelector('#sugg_bio')
        if(url != null){
            image.src = "http://localhost:8000/storage/" + url
        }else{
            image.src = "images/user.jpg"
        }
        sugg_name.textContent +=  name
        sugg_location.innerHTML += location 
        sugg_gender.innerHTML += gender
        if (bio != null){
            sugg_bio.textContent = bio
        }
    }
}

