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
         const result = await response.json();
         if (result.message) {
            window.location.href =
               '/ITWS-2110-F24-winshare/Auth/Login/login.php';
         } else if (result.error) {
            alert(result.error);
         }
      } catch (error) {
         alert('An error occurred. Please try again.');
      }
   });
