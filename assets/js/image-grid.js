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
  
        initializeSlideshow();
      })
      .catch(error => console.error('Error fetching metadata:', error));
  });
  
  function initializeSlideshow() {
    const images = document.querySelectorAll('.image-item img');
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  
    const modalImg = document.createElement('img');
    modalImg.id = 'modal-image';
    modalImg.style.margin = 'auto';
    modalImg.style.display = 'block';
    modalImg.style.maxWidth = '90%';
    modalImg.style.maxHeight = '90%';
  
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '35px';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
  
    const prevBtn = document.createElement('a');
    prevBtn.className = 'prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.style.position = 'absolute';
    prevBtn.style.top = '50%';
    prevBtn.style.left = '0';
    prevBtn.style.color = '#fff';
    prevBtn.style.fontSize = '40px';
    prevBtn.style.fontWeight = 'bold';
    prevBtn.style.cursor = 'pointer';
    prevBtn.style.transform = 'translateY(-50%)';
  
    const nextBtn = document.createElement('a');
    nextBtn.className = 'next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.style.position = 'absolute';
    nextBtn.style.top = '50%';
    nextBtn.style.right = '0';
    nextBtn.style.color = '#fff';
    nextBtn.style.fontSize = '40px';
    nextBtn.style.fontWeight = 'bold';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.transform = 'translateY(-50%)';
  
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(prevBtn);
    modal.appendChild(nextBtn);
    document.body.appendChild(modal);
  
    let currentIndex = 0;
  
    function showImage(index) {
      if (index >= 0 && index < images.length) {
        modalImg.src = images[index].src;
        currentIndex = index;
        modal.style.display = 'block';
      }
    }
  
    images.forEach((img, index) => {
      img.addEventListener('click', () => {
        showImage(index);
      });
    });
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    prevBtn.addEventListener('click', () => {
      showImage(currentIndex - 1);
    });
  
    nextBtn.addEventListener('click', () => {
      showImage(currentIndex + 1);
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }