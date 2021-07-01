  const editPostFunc = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
    const post_content = document.querySelector('#postContent').value.trim();
    
    // console.log("EDIT EDIT ------------------------------------------------------------ ")
    
  
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // console.log(id);

      const response = await fetch(`/api/posts/editpost/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to  edit post');
      }
    }
  };

  document
  .querySelector('.editButton')
  .addEventListener('submit', editPostFunc);