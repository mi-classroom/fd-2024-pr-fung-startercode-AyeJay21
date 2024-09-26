document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
    const metadataUrl = '/works/n-pola/04-results/images/metadata.json';
  
    fetch(metadataUrl)
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const imageItem = document.createElement('div');
          imageItem.classList.add('image-item');
  
          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.metadata.Description;

          imageItem.appendChild(img);
          imageGrid.appendChild(imageItem);
        });
      })
      .catch(error => console.error('Error fetching metadata:', error));
  });

  document.addEventListener('DOMContentLoaded', () => {
    const imageGrid = document.getElementById('image-grid');
  
    document.querySelectorAll('.image-item img').forEach(img => {
      img.addEventListener('click', () => {
        const largeImage = document.createElement('img');
        largeImage.src = img.src;
        largeImage.style.position = 'fixed';
        largeImage.style.top = '50%';
        largeImage.style.left = '50%';
        largeImage.style.transform = 'translate(-50%, -50%)';
        largeImage.style.maxWidth = '90%';
        largeImage.style.maxHeight = '90%';
        largeImage.style.zIndex = '1000';
        largeImage.style.border = '2px solid #fff';
        largeImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        largeImage.style.cursor = 'zoom-out';
  
        document.body.appendChild(largeImage);
  
        largeImage.addEventListener('click', () => {
          document.body.removeChild(largeImage);
        });
      });
    });
  });
  