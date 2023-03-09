window.onload = function() {
    signin = document.getElementById('signin_btn')

    signin.addEventListener('click', check_infos)

    function check_infos() {
        console.log('Checking')
        let email = document.getElementById('e_mail').value
         let password = document.getElementById('pass_code').value
    }

}