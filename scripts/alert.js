function notifyBuses() {
  let notifiedElement = document.querySelector('.notified');

  notifiedElement.style.display = 'block';

  setTimeout(function() {
    notifiedElement.style.display = 'none';
  }, 2000); 

  setTimeout(function() {
    window.location.href = 'index.html';
  }, 2000);
}

