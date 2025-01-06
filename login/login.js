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
        const response = await fetch('https://food-ordering-website-5qoc.onrender.com/login', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(userData)  
        });

        const result = await response.json();
        if (response.ok) {
            const userdata={
                name : result.userFound.name,
                email : result.userFound.email,
                password : result.userFound.password,
                phone : result.userFound.phone,
                token : result.token,
                verifytoken : result.verifytoken

            }
            const jsonString = JSON.stringify(userdata);
            localStorage.setItem('user', jsonString);
            const retrievedJsonString = localStorage.getItem('user');
            const retrievedUser = JSON.parse(retrievedJsonString);
            alert('Login Successful!');
            alert(`token : ${retrievedUser.token}`);
            window.location.href ='https://food-ordering-website-1-4zw3.onrender.com/personal_user_web/index.html';
        } else {
            alert('Login Failed!');
        }
    } catch (error) {
        alert('Error occured'); 
    }
});


