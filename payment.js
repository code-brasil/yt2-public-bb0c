document.addEventListener('DOMContentLoaded', function() {
    const auth_token = localStorage.getItem('auth_token');
    if (!auth_token) {
        window.location.href = 'login.html';
        return;
    }
    // Fetch levels from backend
    fetch('http://localhost:8000/functions/yt2/get_levels', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const levelsDiv = document.getElementById('levels');
        data.levels.forEach(level => {
            const levelDiv = document.createElement('div');
            levelDiv.className = "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex justify-between items-center";
            const levelInfo = document.createElement('div');
            const levelName = document.createElement('h2');
            levelName.className = "text-xl font-bold";
            levelName.textContent = level.name;
            levelInfo.appendChild(levelName);
            levelDiv.appendChild(levelInfo);
            const button = document.createElement('button');
            button.textContent = 'Purchase';
            button.className = 'bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out';
            button.onclick = function() {
                fetch('http://localhost:8000/functions/yt2/upgrade_level', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth_token
                    },
                    body: JSON.stringify({ 'level_id': level.id })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        window.location.href = data.payment_url;
                    } else {
                        alert(data.error);
                    }
                });
            };
            levelDiv.appendChild(button);
            levelsDiv.appendChild(levelDiv);
        });
    });
});