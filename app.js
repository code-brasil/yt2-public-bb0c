document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/functions/yt2/get_courses', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const coursesDiv = document.getElementById('courses');
        data.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 transition transform hover:scale-105 hover:shadow-lg";
            const title = document.createElement('h2');
            title.className = "text-2xl font-bold mb-2 flex items-center";
            const icon = document.createElement('span');
            icon.className = "material-icons mr-2";
            icon.textContent = "menu_book";
            title.appendChild(icon);
            title.appendChild(document.createTextNode(course.title));
            const description = document.createElement('p');
            description.className = "mb-4";
            description.textContent = course.description;
            const link = document.createElement('a');
            link.className = "inline-flex items-center text-blue-500 hover:underline";
            link.href = `course.html?course_id=${course.id}`;
            const linkIcon = document.createElement('span');
            linkIcon.className = "material-icons mr-1";
            linkIcon.textContent = "play_circle_filled";
            link.appendChild(linkIcon);
            link.appendChild(document.createTextNode("View Course"));
            courseDiv.appendChild(title);
            courseDiv.appendChild(description);
            courseDiv.appendChild(link);
            coursesDiv.appendChild(courseDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});