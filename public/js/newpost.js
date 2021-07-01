const newPostFunc = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#newTitle').value.trim();
    const post_content = document.querySelector('#newContent').value.trim(); 
  
       const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
        });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
  };

  document
  .querySelector('.newForm')
  .addEventListener('submit', newPostFunc);