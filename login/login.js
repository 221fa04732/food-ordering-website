// const fs = require('fs');
const form = document.getElementById('userForm');
        
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(userData)  
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result)
            // fs.writeFile('./user.json', result, 'utf8', err => {});
            alert('Login Successful!');
            // window.location.href ='http://127.0.0.1:5500/index.html';
        } else {
            alert('Sign Up Failed!');
        }
    } catch (error) {
        alert('Error occured');
    }
});



