const form = document.getElementById('userForm');
        
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    const userData = {
        name: name,
        email: email,
        password: password,
        phone: phone
    };

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(userData)  
        });

        const result = await response.json();
        if (response.ok) {
            alert('Sign Up Successful!');
            window.location.href ='http://127.0.0.1:5500/index.html';
        } else {
            alert('Sign Up Failed!');
        }
    } catch (error) {
            alert('Error occured');
    }
});