const username = localStorage.getItem('username');

            // Display the username in the .id element
            const idElement = document.querySelector('.id');
            if (idElement) {
              idElement.textContent = username || 'ADMIN';
            } else {
              console.error("Element with class 'id' not found");
            }