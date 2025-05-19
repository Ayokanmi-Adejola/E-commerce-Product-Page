document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.querySelector('.cart-modal');
  const mainImage = document.querySelector('.product-gallery .main-image img');
  const thumbnails = document.querySelectorAll('.product-gallery .thumbnail');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-content .main-image img');
  const lightboxThumbnails = document.querySelectorAll('.lightbox-content .thumbnail');
  const closeLightbox = document.querySelector('.close-lightbox');
  const overlay = document.querySelector('.overlay');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const prevBtn = document.querySelectorAll('.prev-btn');
  const nextBtn = document.querySelectorAll('.next-btn');
  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  const quantityEl = document.querySelector('.quantity');
  const addToCartBtn = document.querySelector('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');
  const cartContent = document.querySelector('.cart-content');

  // Variables
  let quantity = 0;
  let currentImageIndex = 0;
  const productImages = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
  ];
  let cartItems = [];

  // Toggle cart modal
  cartIcon.addEventListener('click', function() {
    if (cartModal.style.display === 'block') {
      cartModal.classList.remove('active');
      setTimeout(() => {
        cartModal.style.display = 'none';
      }, 300);
    } else {
      cartModal.style.display = 'block';
      setTimeout(() => {
        cartModal.classList.add('active');
      }, 10);
    }
  });

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!cartIcon.contains(e.target) && !cartModal.contains(e.target) && cartModal.style.display === 'block') {
      cartModal.classList.remove('active');
      setTimeout(() => {
        cartModal.style.display = 'none';
      }, 300);
    }
  });

  // Thumbnail click handler
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      updateActiveImage(index);
    });
  });

  // Lightbox thumbnail click handler
  lightboxThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      updateActiveImage(index, true);
    });
  });

  // Open lightbox on main image click (desktop only)
  if (window.innerWidth > 900) {
    mainImage.addEventListener('click', function() {
      setTimeout(() => {
        lightbox.style.display = 'flex';
        lightbox.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('modal-open');
        updateActiveImage(currentImageIndex, true);
      }, 10);
    });
  }

  // Close lightbox
  closeLightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.style.display = 'block';
    setTimeout(() => {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('modal-open');
    }, 10);
  });

  // Close mobile menu
  closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      mobileMenu.style.display = 'none';
    }, 300);
  });

  // Previous and Next buttons
  prevBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      navigateImage(-1);
    });
  });

  nextBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      navigateImage(1);
    });
  });

  // Close modals when clicking on overlay
  overlay.addEventListener('click', function() {
    if (lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
    }

    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    }
  });

  // Quantity controls
  minusBtn.addEventListener('click', function() {
    if (quantity > 0) {
      quantity--;
      updateQuantity();
    }
  });

  plusBtn.addEventListener('click', function() {
    quantity++;
    updateQuantity();
  });

  // Add to cart
  addToCartBtn.addEventListener('click', function() {
    if (quantity > 0) {
      addToCart();
      updateCart();
    }
  });

  // Helper functions
  // Fix for image switching
  function updateActiveImage(index, isLightbox = false) {
    currentImageIndex = index;

    // Update main image - ensure we're using the correct path
    const imagePath = productImages[index];
    mainImage.src = imagePath;
    lightboxImage.src = imagePath;

    // Update thumbnails
    const thumbs = isLightbox ? lightboxThumbnails : thumbnails;
    thumbs.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    // If not in lightbox, also update lightbox thumbnails
    if (!isLightbox) {
      lightboxThumbnails.forEach((thumb, i) => {
        if (i === index) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
    }
  }

  function navigateImage(direction) {
    let newIndex = currentImageIndex + direction;

    if (newIndex < 0) {
      newIndex = productImages.length - 1;
    } else if (newIndex >= productImages.length) {
      newIndex = 0;
    }

    updateActiveImage(newIndex, lightbox.style.display === 'flex');
  }

  function updateQuantity() {
    quantityEl.textContent = quantity;
  }

  function addToCart() {
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.id === 1);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        id: 1,
        name: 'Fall Limited Edition Sneakers',
        price: 125.00,
        quantity: quantity,
        image: './images/image-product-1-thumbnail.jpg'
      });
    }

    // Reset quantity
    quantity = 0;
    updateQuantity();

    // Show cart count
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }

  function updateCart() {
    if (cartItems.length === 0) {
      cartContent.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      return;
    }

    let cartHTML = '';

    cartItems.forEach(item => {
      cartHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity} <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span></p>
          </div>
          <button class="delete-item" data-id="${item.id}">
            <img src="./images/icon-delete.svg" alt="Delete">
          </button>
        </div>
      `;
    });

    cartHTML += '<button class="checkout-btn">Checkout</button>';

    cartContent.innerHTML = cartHTML;

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        removeFromCart(itemId);
      });
    });
  }

  function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);

    // Update cart count
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';

    updateCart();
  }

  // Add CSS for cart items
  const style = document.createElement('style');
  style.textContent = `
    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }

    .cart-item-image {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-right: 16px;
    }

    .cart-item-details {
      flex-grow: 1;
    }

    .cart-item-name {
      color: var(--dark-grayish-blue);
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }

    .cart-item-total {
      color: var(--very-dark-blue);
      font-weight: 700;
    }

    .delete-item {
      background: none;
      border: none;
      cursor: pointer;
    }

    .checkout-btn {
      width: 100%;
      background-color: var(--orange);
      color: var(--white);
      font-weight: 700;
      border: none;
      border-radius: 10px;
      padding: 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
});
