const editButtonFunc = async (event) => {
    event.preventDefault();

     // Collect values from the edit post form:
     const title = document.querySelector('#postTitle').value.trim();
     const post_content = document.querySelector('#postContent').value.trim();
    //Data-id is a set attribute on the button:
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
  .querySelector('.editButton')
  .addEventListener('submit', editButtonFunc);