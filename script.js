const WHATSAPP_NUMBER = "917550192985";

const sizes = [
  { label: "4 × 6 inches", price: 350 },
  { label: "8 × 6 inches", price: 450 },
  { label: "12 × 8 inches", price: 600 },
  { label: "15 × 10 inches", price: 900 },
  { label: "18 × 12 inches", price: 1100 },
  { label: "20 × 16 inches", price: 1900 },
  { label: "24 × 18 inches", price: 2600 },
  { label: "20 × 30 inches", price: 3600 },
  { label: "36 × 24 inches", price: 4300 },
  { label: "24 × 48 inches", price: 5600 },
  { label: "36 × 49 inches", price: 7900 }
];

// Model numbers are initial catalogue IDs and can be edited here.
const products = [
  { id: "AR001", name: "Birthday Portrait Frame", category: "Birthday & celebration", image: "./assets/birthday-frame.jpg", description: "A birthday message, a favourite portrait and a memory to keep." },
  { id: "AR002", name: "Memory Collage Frame", category: "Photo collage", image: "./assets/memory-collage.jpg", description: "Bring your favourite photographs together in one frame." },
  { id: "AR003", name: "Newborn Collage Frame", category: "Newborn & baby", image: "./assets/newborn-collage.jpg", description: "Celebrate the tiny details of a brand-new beginning." },
  { id: "AR004", name: "Baby Birth Details Frame", category: "Newborn & baby", image: "./assets/baby-details.jpg", description: "Keep those first-day details close for years to come." },
  { id: "AR005", name: "Wedding Wishes Frame", category: "Wishes", image: "./assets/Wedding-Wishes.jpg", description: "A beautiful wedding collage, heartfelt wishes and memories to cherish forever." },
  { id: "AR006", name: "Special Moments Frame", category: "Photo collage", image: "./assets/Special-Moments.jpg", description: "A collection of favourite portraits, happy moments and memories captured forever." },
  { id: "AR007", name: "Couple Love Frame", category: "Couple", image: "./assets/Couple-Love.jpg", description: "A beautiful couple portrait, a heartfelt message and a love story to cherish forever." },
  { id: "AR008", name: "Sister’s Special Frame", category: "portrait", image: "./assets/Sister’s-Special.jpg", description: "A favourite portrait, endless love and a beautiful memory of your beloved sister." },
    { id: "AR001", name: "Birthday heart collage Frame", category: "Birthday & celebration", image: "./assets/birthday-frame2.jpg", description: "A birthday message, a favourite portrait and a memory to keep." }

];

const money = (amount) => `₹${amount.toLocaleString("en-IN")}`;
const grid = document.getElementById("product-grid");
const priceList = document.getElementById("price-list");
const modal = document.getElementById("order-modal");
const sizeSelect = document.getElementById("frame-size");
const priceOutput = document.getElementById("selected-price");
let activeProduct = null;

products.forEach((product) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name} wooden photo frame sample" loading="lazy" />
      <span class="product-number">${product.id}</span>
    </div>
    <div class="product-info">
      <div class="product-info-top">
        <div><h3>${product.name}</h3><p>${product.category}</p></div>
        <span class="from-price">From ${money(sizes[0].price)}</span>
      </div>
      <button class="product-order" type="button" data-product="${product.id}">Order this frame <span>↗</span></button>
    </div>`;
  grid.appendChild(card);
});

sizes.forEach((size) => {
  const row = document.createElement("div");
  row.className = "price-row";
  row.innerHTML = `<span>${size.label}</span><strong>${money(size.price)}</strong>`;
  priceList.appendChild(row);

  const option = document.createElement("option");
  option.value = String(size.price);
  option.textContent = `${size.label} — ${money(size.price)}`;
  sizeSelect.appendChild(option);
});

function updatePrice() {
  const selected = sizes.find((size) => String(size.price) === sizeSelect.value) || sizes[0];
  priceOutput.textContent = money(selected.price);
}

function openOrder(productId) {
  activeProduct = products.find((product) => product.id === productId);
  if (!activeProduct) return;
  document.getElementById("selected-image").src = activeProduct.image;
  document.getElementById("selected-image").alt = activeProduct.name;
  document.getElementById("selected-name").textContent = activeProduct.name;
  document.getElementById("selected-model").textContent = `Model number: ${activeProduct.id}`;
  sizeSelect.selectedIndex = 0;
  updatePrice();
  document.getElementById("form-error").textContent = "";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("customer-name").focus(), 50);
}

function closeOrder() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openOrder(button.dataset.product);
});
sizeSelect.addEventListener("change", updatePrice);
document.querySelector(".modal-close").addEventListener("click", closeOrder);
modal.addEventListener("click", (event) => { if (event.target === modal) closeOrder(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("open")) closeOrder(); });
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("customer-name").value.trim();
  const phoneRaw = document.getElementById("customer-phone").value.trim();
  const phone = phoneRaw.replace(/\D/g, "");
  const address = document.getElementById("customer-address").value.trim();
const pincode = document.getElementById("customer-pincode").value.trim();
  const selectedSize = sizes.find((size) => String(size.price) === sizeSelect.value) || sizes[0];
  const error = document.getElementById("form-error");

  if (!name) { error.textContent = "Please enter your name."; return; }
  if (phone.length < 10 || phone.length > 13) { error.textContent = "Please enter a valid mobile number, including country code if needed."; return; }
  if (!address) {
    error.textContent = "Please enter your delivery address.";
    return;
}

if (!/^[0-9]{6}$/.test(pincode)) {
    error.textContent = "Please enter a valid 6-digit pincode.";
    return;
}

  const message = [
    "Hello AR.PHOTOGRAPHY! I'd like to place a photo frame order.",
    "",
    "CUSTOMER DETAILS",
    `Customer name: ${name}`,
    `Customer mobile: ${phoneRaw}`,
    "",
    "DELIVERY DETAILS",
    `Delivery address: ${address}`,
    `Pincode: ${pincode}`,
    "",
    "ORDER DETAILS",
    `Frame: ${activeProduct.name}`,
    `Model number: ${activeProduct.id}`,
    "Frame type: Wooden frame",
    `Size: ${selectedSize.label}`,
    `Frame price: ${money(selectedSize.price)}`,
    "Shipping charges: To be calculated based on destination",
    "",
    "I'll share my photographs on WhatsApp. Please confirm the shipping charges and next steps."
].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});


// FRAME IMAGE PREVIEW
document.addEventListener("DOMContentLoaded", function () {

    const preview = document.getElementById("image-preview");
    const previewImage = document.getElementById("preview-image");
    const closeButton = document.getElementById("preview-close");
    const productGrid = document.getElementById("product-grid");

    // Open preview when a product image is clicked
    productGrid.addEventListener("click", function (event) {

        const clickedImage = event.target.closest("img");

        if (!clickedImage) return;

        previewImage.src = clickedImage.src;
        previewImage.alt = clickedImage.alt || "Frame preview";

        preview.hidden = false;
        document.body.style.overflow = "hidden";
    });

    // Close preview
    function closePreview() {
        preview.hidden = true;
        previewImage.src = "";
        document.body.style.overflow = "";
    }

    closeButton.addEventListener("click", closePreview);

    // Close when clicking outside the image
    preview.addEventListener("click", function (event) {
        if (event.target === preview) {
            closePreview();
        }
    });

    // Close using Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !preview.hidden) {
            closePreview();
        }
    });

});
