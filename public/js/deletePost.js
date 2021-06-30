const deleteButtonFunc = async (event) => {
    //Data-id is from the button, where the attribute is set as the id for the current post being clicked on:
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('.deleteButton')
  .addEventListener('click', deleteButtonFunc);