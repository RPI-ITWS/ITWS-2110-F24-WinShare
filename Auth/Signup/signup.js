document
   .getElementById('signupForm')
   .addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      try {
         const response = await fetch('signup.php', {
            method: 'POST',
            body: formData,
         });
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         const result = await response.json();
         if (result.message) {
            window.location.href =
               '/ITWS-2110-F24-winshare/Auth/Login/login.php';
         } else if (result.error) {
            alert(result.error);
         }
      } catch (error) {
         console.error('There was a problem with the fetch operation:', error);
         alert('An error occurred. Please try again.');
      }
   });
