const addCommentFunc = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment_content').value.trim();
    console.log(comment);    
  
    if (event.target.hasAttribute('data-id')) {
        const postid = event.target.getAttribute('data-id');
        console.log(postid);

      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, postid}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add comment');
      }
    }
  };

  document
  .querySelector('.addComment')
  .addEventListener('submit', addCommentFunc);