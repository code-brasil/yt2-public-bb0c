document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:8000/functions/yt2/login_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'username': username, 'password': password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            localStorage.setItem('auth_token', data.auth_token);
            window.location.href = 'index.html';
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});