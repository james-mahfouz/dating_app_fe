const workshop_pages = {};

workshop_pages.base_url = "http://localhost:8000/api/v0.0.1/users/";

workshop_pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
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
                    'Authorization' : "token " + api_token
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
    const get_users_url = workshop_pages.base_url + "login";
    signin = document.getElementById('signin_btn')

    signin.addEventListener('click', check_infos)

    function check_infos() {
        console.log('Checking')
        let email = document.getElementById('e_mail').value
        let password = document.getElementById('pass_code').value
        const data = new FormData()
        data.append()
        const response = await workshop_pages.getAPI(get_users_url);

    }
}

workshop_pages.load_register = () => {
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
            console.log(response.data)
            localStorage.setItem('token',response.data.authorisation.token)
            window.location.href = 'index.html'
        }
    }
}
workshop_pages.load_index = () => {
    alert(x);
}

