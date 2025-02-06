document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/functions/yt2/get_courses', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const coursesDiv = document.getElementById('courses');
        data.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = "mb-4";
            const title = document.createElement('h2');
            title.className = "text-xl font-bold";
            title.textContent = course.title;
            const description = document.createElement('p');
            description.textContent = course.description;
            const link = document.createElement('a');
            link.className = "text-blue-500 hover:underline";
            link.href = `course.html?course_id=${course.id}`;
            link.textContent = "View Course";
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