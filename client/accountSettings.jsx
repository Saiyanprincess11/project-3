const React = require('react'); 
const ReactDOM = require('react-dom'); 
const helper = require('./helper.js'); 

//Signup Window
const ErrorPage = (props) => {
    return (
        <form 
            action="/changePassword"
            id="changePasswordForm"
            method="POST"
            onsubmit={handleChangePassForm}
        >
            <div class="box">
            <label htmlFor="newPass">Enter New Password: </label>
            <input type="text" id="newpass"/>
            <label htmlFor="newPass">Re-enter Password: </label>
            <input type="text" id="confirmpass"/>
            <input type="submit" value="Change Password" />
            </div>
      </form>
    );
};

//POST
const handleChangePassForm = (e) => {
    e.preventDefault(); 
    const newPass = e.target.querySelector('#newpass').value; 
    const confirmPass = e.target.querySelector('#newpass').value; 
    

    if(!newPass || !confirmPass){
        console.log('Enter all fields'); 
        false; 
    }

    helper.sendPost(e.target.action, {newPass, confirmPass}, loadUpdatedPassword); 
    return false; 
}; 

//GET 
const loadUpdatedPassword = async () => {
    const response = await fetch('/changePassword'); 
    const data = await response.json(); 

    console.log(JSON.stringify(data)); 
}; 

const init = () => {
    ReactDOM.render(<ErrorPage />,
    document.getElementById('content'));
}; 

window.onload = init; 