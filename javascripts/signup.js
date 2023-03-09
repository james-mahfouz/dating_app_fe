window.onload = function() {
    signup = document.getElementById('register-btn')

    signup.addEventListener('click', check_infos)

    function check_infos() {
        let f_name = document.getElementById('f_name').value
        let age = document.getElementById('age').value
        let email = document.getElementById('e_mail').value
        let gender = document.getElementById("gender").value
        let password = document.getElementById('pass_code').value
        let conf_password = document.getElementById('re_pass_code').value

        const data = {}
    }
}