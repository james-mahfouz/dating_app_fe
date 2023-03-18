window.onload = function() {
    signup = document.getElementById('register_btn')

    signup.addEventListener('click', check_infos)

    function check_infos() {
        let firstName = document.getElementById('f_name').value
        let age = document.getElementById('age').value
        let email = document.getElementById('e_mail').value
        let gender = document.getElementById("gender").value
        console.log(gender)
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

        axios.post("http://localhost:8000/api/v0.0.1/users/register",data)
        .then(response => {
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }
}