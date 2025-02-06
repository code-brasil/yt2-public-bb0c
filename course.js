document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const course_id = getQueryParam('course_id');
    fetch('http://localhost:8000/functions/yt2/get_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'course_id': course_id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        const course = data.course;
        const courseContentDiv = document.getElementById('course-content');
        const title = document.createElement('h1');
        title.className = "text-4xl font-bold mb-6 flex items-center";
        const icon = document.createElement('span');
        icon.className = "material-icons mr-2";
        icon.textContent = "menu_book";
        title.appendChild(icon);
        title.appendChild(document.createTextNode(course.title));
        const description = document.createElement('p');
        description.className = "mb-6";
        description.textContent = course.description;
        courseContentDiv.appendChild(title);
        courseContentDiv.appendChild(description);

        course.videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.className = "my-8 flex justify-center";
            const iframe = document.createElement('iframe');
            iframe.width = "640";
            iframe.height = "360";
            iframe.src = video.url.replace("watch?v=", "embed/");
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.className = "rounded-lg shadow-lg transition transform hover:scale-105";
            videoDiv.appendChild(iframe);
            courseContentDiv.appendChild(videoDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});