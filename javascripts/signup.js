window.onload = function() {
    signup = document.getElementById('register_btn')

    signup.addEventListener('click', check_infos)

    function check_infos() {
        let firstName = document.getElementById('f_name').value
        let age = document.getElementById('age').value
        let email = document.getElementById('e_mail').value
        let gender = document.getElementById("gender").value
        let password = document.getElementById('pass_code').value
        let country = document.getElementById('country').value

        const data = {
            email,
            password,
            age,
            firstName,
            gender,
            country,
        }

        axios.post("http://localhost/dating-app-be/Authentication/signup.php",data,{headers: { "Content-Type": "multipart/form-data" }})
        .then(response => {
            console.log(response.data)
        }).catch(error=>{

        })
    }
}