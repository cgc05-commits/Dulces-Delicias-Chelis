document.addEventListener('DOMContentLoaded', () => {
  // NAVIGATION
  const links = document.querySelectorAll('[data-screen]');
  const screens = document.querySelectorAll('.screen');

  function showScreen(id) {
    screens.forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('data-screen');
      showScreen(target);
    });
  });

  // CAROUSEL
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const track = document.querySelector('.carousel-track');

  if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -280, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // FORM ELEMENTS
  const form = document.getElementById('custom-form');
  const pvTam = document.getElementById('pv-tam');
  const pvHarina = document.getElementById('pv-harina');
  const pvRelleno = document.getElementById('pv-relleno');
  const pvPrecio = document.getElementById('pv-precio');
  const previewImg = document.getElementById('preview-img');
  const refInput = document.getElementById('ref-img');
  const refPreview = document.getElementById('ref-preview');
  const formMsg = document.getElementById('form-msg');

  // PREVIEW LIVE UPDATE
  form.addEventListener('input', () => {
    const tam = form.tam.value;
    const harina = form.harina.value;
    const relleno = form.relleno.value;

    pvTam.textContent = tam || '—';
    pvHarina.textContent = harina || '—';
    pvRelleno.textContent = relleno || '—';

    let precioBase = 0;

    if (harina === "Vainilla") {
      if (tam.includes("4")) precioBase = 250;
      else if (tam.includes("6")) precioBase = 300;
      else if (tam.includes("8")) precioBase = 350;
    } else if (harina === "Chocolate" || harina === "Zanahoria") {
      if (tam.includes("4")) precioBase = 350;
      else if (tam.includes("6")) precioBase = 420;
      else if (tam.includes("8")) precioBase = 500;
    }

    if (relleno === "Fresa con betún" || relleno === "Mango con betún") {
      precioBase += 50;
    }

    pvPrecio.textContent = precioBase > 0 ? `$${precioBase}` : '$0';
  });

  // PREVIEW IMAGE UPLOAD
  refInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        refPreview.innerHTML = `<img src="${reader.result}" alt="Referencia">`;
      };
      reader.readAsDataURL(file);
    } else {
      refPreview.textContent = 'No hay imagen seleccionada';
    }
  });

  // CARRITO
  let cart = [];
  const cartBody = document.getElementById('cart-body');
  const totalAmount = document.getElementById('total-amount');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const tam = form.tam.value;
    const harina = form.harina.value;
    const relleno = form.relleno.value;
    const especificaciones = form.especificaciones.value;
    const imagen = refPreview.querySelector('img')?.src || '';

    if (!tam || !harina || !relleno) {
      formMsg.textContent = 'Completa todos los campos.';
      return;
    }

    let precioBase = 0;

    if (harina === "Vainilla") {
      if (tam.includes("4")) precioBase = 250;
      else if (tam.includes("6")) precioBase = 300;
      else if (tam.includes("8")) precioBase = 350;
    } else if (harina === "Chocolate" || harina === "Zanahoria") {
      if (tam.includes("4")) precioBase = 350;
      else if (tam.includes("6")) precioBase = 420;
      else if (tam.includes("8")) precioBase = 500;
    }

    if (relleno === "Fresa con betún" || relleno === "Mango con betún") {
      precioBase += 50;
    }

    const item = {
      tam,
      harina,
      relleno,
      especificaciones,
      imagen,
      precio: precioBase
    };

    cart.push(item);
    updateCart();
    formMsg.textContent = 'Agregado al carrito 🎂';
    showScreen('carrito');
  });

  function updateCart() {
    cartBody.innerHTML = '';
    if (cart.length === 0) {
      cartBody.innerHTML = '<tr class="cart-empty"><td colspan="4">Tu carrito está vacío</td></tr>';
      totalAmount.textContent = '$0';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.precio;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          ${item.tam}, ${item.harina}, ${item.relleno}
          ${item.especificaciones ? `<br><small>${item.especificaciones}</small>` : ''}
          ${item.imagen ? `<br><img src="${item.imagen}" alt="Ref" style="width:60px;height:auto;border-radius:6px;margin-top:6px;">` : ''}
        </td>
        <td>1</td>
        <td>$${item.precio}</td>
        <td><button class="remove-btn" data-index="${index}">X</button></td>
      `;
      cartBody.appendChild(tr);
    });

    totalAmount.textContent = '$' + total;

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = e.target.dataset.index;
        cart.splice(idx, 1);
        updateCart();
      });
    });
  }
  updateCart();
  
  // BOTONES AÑADIR DE PASTELES PREDEFINIDOS
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const img = button.dataset.img;

    const item = {
      tam: '', // opcional para personalizados
      harina: '', // opcional para personalizados
      relleno: '', // opcional para personalizados
      especificaciones: name,
      imagen: img,
      precio: price
    };

    cart.push(item);
    updateCart();
    showScreen('carrito');
  });
});


  // FOOTER YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // PANEL DE PAGO
  const checkoutBtn = document.getElementById('checkout-btn');
  const paymentPanel = document.getElementById('payment-panel');
  const paymentForm = document.getElementById('payment-form');
  const paymentMsg = document.getElementById('payment-msg');

  checkoutBtn.addEventListener('click', () => {
    paymentPanel.classList.remove('hidden');
    paymentMsg.textContent = '';
  });

  paymentForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('card-name').value.trim();
    const number = document.getElementById('card-number').value.trim();
    const exp = document.getElementById('card-exp').value.trim();
    const cvc = document.getElementById('card-cvc').value.trim();

    if (!name || !number || !exp || !cvc) {
      paymentMsg.textContent = 'Completa todos los campos de la tarjeta.';
      return;
    }

    paymentMsg.textContent = 'Pago procesado correctamente 🎉';
    paymentPanel.classList.add('hidden');
  });

  // MODAL DE IMAGEN AMPLIADA
  const modal = document.getElementById('fullscreen-modal');
  const modalImg = document.getElementById('fullscreen-img');
  const closeBtn = document.querySelector('.fullscreen .close');

  document.querySelectorAll('.gallery-card img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.remove('hidden');
      modal.classList.add('visible');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 400);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('visible');
      setTimeout(() => modal.classList.add('hidden'), 400);
    }
  });
});
function showPaymentSuccess() {
  const msg = document.createElement('div');
  msg.textContent = '✓ Pago confirmado 🎉';
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.right = '20px';
  msg.style.background = '#7D4C3A';
  msg.style.color = 'white';
  msg.style.padding = '10px 16px';
  msg.style.borderRadius = '10px';
  msg.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  msg.style.zIndex = '100';
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}
const contactForm = document.getElementById('contact-form');
const contactMsg = document.getElementById('contact-msg');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const nombre = contactForm.nombre.value.trim();
  const email = contactForm.email.value.trim();
  const mensaje = contactForm.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    contactMsg.textContent = 'Por favor completa todos los campos.';
    contactMsg.style.color = '#B22222';
    return;
  }

  contactMsg.textContent = '¡Gracias por tu mensaje! Te responderemos pronto.';
  contactMsg.style.color = '#7D4C3A';

  contactForm.reset();
});
function showContactSuccess() {
  const msg = document.createElement('div');
  msg.textContent = '✓ Mensaje enviado correctamente';
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.right = '20px';
  msg.style.background = '#7D4C3A';
  msg.style.color = 'white';
  msg.style.padding = '10px 16px';
  msg.style.borderRadius = '10px';
  msg.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  msg.style.zIndex = '100';
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000);
}
