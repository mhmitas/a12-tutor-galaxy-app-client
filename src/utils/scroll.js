function scrollRight() {
    const scrollContainer = document.getElementById('scrollContainer');
    scrollContainer.scrollBy({
        top: 0,
        left: 300, // Adjust the scroll length as needed
        behavior: 'smooth', // This will animate the scrolling
    });
}
function scrollLeft() {
    const scrollContainer = document.getElementById('scrollContainer');
    scrollContainer.scrollBy({
        top: 0,
        left: -300, // Adjust the scroll length as needed
        behavior: 'smooth', // This will animate the scrolling
    });
}

export { scrollLeft, scrollRight }

/*
// script.js

document.getElementById('scrollRightButton').addEventListener('click', function() {
  const scrollContainer = document.getElementById('scrollContainer');
  const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  
  if (scrollContainer.scrollLeft >= maxScrollLeft) {
    // If at the end, disable the right button
    document.getElementById('scrollRightButton').disabled = true;
  } else {
    // Otherwise, scroll right by a fixed amount
    scrollContainer.scrollBy({
      top: 0,
      left: 300, // Adjust the scroll length as needed
      behavior: 'smooth', // This will animate the scrolling
    });
    // Enable the left button
    document.getElementById('scrollLeftButton').disabled = false;
  }
});

document.getElementById('scrollLeftButton').addEventListener('click', function() {
  const scrollContainer = document.getElementById('scrollContainer');
  
  if (scrollContainer.scrollLeft <= 0) {
    // If at the start, disable the left button
    document.getElementById('scrollLeftButton').disabled = true;
  } else {
    // Otherwise, scroll left by a fixed amount
    scrollContainer.scrollBy({
      top: 0,
      left: -300, // Adjust the scroll length as needed
      behavior: 'smooth', // This will animate the scrolling
    });
    // Enable the right button
    document.getElementById('scrollRightButton').disabled = false;
  }
});

*/