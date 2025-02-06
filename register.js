document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    fetch('http://localhost:8000/functions/yt2/register_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'username': username, 'password': password, 'email': email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            // Automatically login the user
            return fetch('http://localhost:8000/functions/yt2/login_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'username': username, 'password': password })
            });
        } else {
            throw new Error(data.error);
        }
    })
    .then(response => response.json())
    .then(loginData => {
        if (loginData.status) {
            localStorage.setItem('auth_token', loginData.auth_token);
            window.location.href = 'payment.html';
        } else {
            alert(loginData.error);
        }
    })
    .catch(error => console.error('Error:', error));
});