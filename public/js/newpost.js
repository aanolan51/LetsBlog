const newPostFunc = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newTitle').value.trim();
    const post_content = document.querySelector('#newContent').value.trim(); 
    console.log("--------------INSIDE NEW POST-----------------");
    console.log(title);
    console.log(post_content);
  
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
    });
        
    console.log(response);
  
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create post');
    }
};

  document
  .querySelector('.newpostForm')
  .addEventListener('submit', newPostFunc);