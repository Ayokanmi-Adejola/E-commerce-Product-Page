# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.



## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![E-commerce product page screenshot](./design/desktop-preview.jpg)


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript
- CSS Transitions and Animations

### What I learned

This project was a great opportunity to practice creating an interactive e-commerce product page with various features. Some key learnings include:

1. **Modal Implementation**: Creating smooth transitions for lightbox and mobile menu modals.

```css
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 200;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lightbox.active {
  visibility: visible;
  opacity: 1;
}
```

2. **Image Gallery Navigation**: Implementing thumbnail selection and image switching.

```javascript
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
}
```

3. **Cart Functionality**: Adding and removing items from the cart with dynamic updates.

```javascript
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
```

4. **Responsive Design**: Creating a layout that works well on both mobile and desktop.

```css
@media (max-width: 900px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0;
  }

  .desktop-nav, .desktop-only {
    display: none;
  }

  .mobile-menu-toggle, .mobile-only {
    display: block;
  }
}
```

### Continued development

In future projects, I plan to focus on:

- Implementing more advanced animations and transitions
- Improving accessibility features
- Adding more complex cart functionality (like saving cart items to local storage)
- Implementing a full checkout process
- Adding product filtering and search capabilities

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive documentation for HTML, CSS, and JavaScript.
- [CSS-Tricks](https://css-tricks.com) - Great resource for CSS techniques and flexbox/grid guides.
- [JavaScript.info](https://javascript.info) - Detailed explanations of JavaScript concepts.

## Author

- Frontend Mentor - [@Ayokanmi-Adejola](https://www.frontendmentor.io/profile/Ayokanmi-Adejola)
