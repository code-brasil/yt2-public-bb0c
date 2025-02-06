document.addEventListener('DOMContentLoaded', function() {
    const auth_token = localStorage.getItem('auth_token');
    if (!auth_token) {
        window.location.href = 'login.html';
        return;
    }
    fetch('http://localhost:8000/functions/yt2/get_courses', {
        method: 'POST',
        headers: {
            'Authorization': auth_token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            window.location.href = 'login.html';
            return;
        }
        // Existing code to display courses
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = 'login.html';
    });
});