document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display existing courses
    function loadCourses() {
        fetch('http://localhost:8000/functions/yt2/get_courses', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            const coursesDiv = document.getElementById('admin-courses');
            coursesDiv.innerHTML = '';
            data.courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = "mb-4";
                const title = document.createElement('h2');
                title.className = "text-xl font-bold";
                title.textContent = course.title;
                const description = document.createElement('p');
                description.textContent = course.description;
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'bg-yellow-500 text-white px-2 py-1 mr-2';
                editButton.onclick = function() {
                    // Implement edit functionality here
                    alert('Edit functionality not implemented yet.');
                };
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'bg-red-500 text-white px-2 py-1';
                deleteButton.onclick = function() {
                    if (confirm('Are you sure you want to delete this course?')) {
                        fetch('http://localhost:8000/functions/yt2/delete_course', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 'course_id': course.id })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status) {
                                loadCourses();
                            } else {
                                alert(data.error);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    }
                };
                courseDiv.appendChild(title);
                courseDiv.appendChild(description);
                courseDiv.appendChild(editButton);
                courseDiv.appendChild(deleteButton);
                coursesDiv.appendChild(courseDiv);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    loadCourses();

    // Handle add course form submission
    const addCourseForm = document.getElementById('add-course-form');
    addCourseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const videoUrlsText = document.getElementById('video-urls').value;
        const videoUrls = videoUrlsText.split('\n').map(url => url.trim()).filter(url => url);

        fetch('http://localhost:8000/functions/yt2/add_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': title,
                'description': description,
                'video_urls': videoUrls
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                alert('Course added successfully');
                addCourseForm.reset();
                loadCourses();
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});