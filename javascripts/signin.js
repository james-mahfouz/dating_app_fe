window.onload = function() {
    signin = document.getElementById('signin_btn')

    signin.addEventListener('click', check_signin)

    function check_infos() {
        console.log('Checking')
        email = document.getElementById('e_mail').value
        password = document.getElementById('pass_code').value
    }

}