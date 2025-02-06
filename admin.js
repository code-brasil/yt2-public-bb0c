document.addEventListener('DOMContentLoaded', function() {
    // Fetch levels and populate select options
    fetch('http://localhost:8000/functions/yt2/get_levels', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const levelSelect = document.getElementById('level-id');
        data.levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.id;
            option.textContent = level.name;
            levelSelect.appendChild(option);
        });
    });

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
                courseDiv.className = "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-4 flex justify-between items-center";
                const infoDiv = document.createElement('div');
                const title = document.createElement('h2');
                title.className = "text-xl font-bold flex items-center";
                const icon = document.createElement('span');
                icon.className = "material-icons mr-2";
                icon.textContent = "menu_book";
                title.appendChild(icon);
                title.appendChild(document.createTextNode(course.title));
                const description = document.createElement('p');
                description.textContent = course.description;
                infoDiv.appendChild(title);
                infoDiv.appendChild(description);
                const buttonsDiv = document.createElement('div');
                const editButton = document.createElement('button');
                editButton.innerHTML = '<span class="material-icons">edit</span>';
                editButton.className = 'text-yellow-500 hover:text-yellow-600 mr-2';
                editButton.onclick = function() {
                    // Implement edit functionality here
                    alert('Edit functionality not implemented yet.');
                };
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<span class="material-icons">delete</span>';
                deleteButton.className = 'text-red-500 hover:text-red-600';
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
                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(deleteButton);
                courseDiv.appendChild(infoDiv);
                courseDiv.appendChild(buttonsDiv);
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
        const levelId = document.getElementById('level-id').value;

        fetch('http://localhost:8000/functions/yt2/add_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': title,
                'description': description,
                'video_urls': videoUrls,
                'level_id': levelId
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