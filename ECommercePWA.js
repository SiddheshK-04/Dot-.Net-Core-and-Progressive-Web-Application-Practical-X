/* =========================================================
   PRACTICAL 10(a)
   Create a PWA with Web App Manifest and Push Notifications
   ========================================================= */


/* =========================================================
   FILE: Program.cs
   ========================================================= */

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();


/* =========================================================
   FILE: wwwroot/manifest.json
   ========================================================= */

{
  "name": "My PWA Application (Siddhesh Kamble (T009)",
  "short_name": "MyPWA",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d6efd",
  "icons": [
    {
      "src": "icons/icon1.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon2.png",
      "sizes": "447x447",
      "type": "image/png"
    }
  ]
}


/* =========================================================
   FILE: wwwroot/index.html
   ========================================================= */

<!DOCTYPE html>
<html>

<head>

    <title>My PWA</title>

    <link rel="manifest" href="manifest.json">

    <meta name="theme-color" content="#0d6efd">

</head>

<body>

    <h1>My Progressive Web App (Siddhesh Kamble (T009)</h1>

    <button onclick="showNotification()">
        Show Notification
    </button>

    <script src="app.js"></script>

</body>

</html>


/* =========================================================
   FILE: wwwroot/app.js
   ========================================================= */

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'));

}

function showNotification() {

    Notification.requestPermission().then(permission => {

        if (permission === 'granted') {

            navigator.serviceWorker.ready.then(registration => {

                registration.showNotification('PWA Notification', {

                    body: 'Push Notification Working Successfully!',

                    icon: 'icons/icon1.png'

                });

            });

        }

    });

}


/* =========================================================
   FILE: wwwroot/service-worker.js
   ========================================================= */

self.addEventListener('install', event => {

    console.log('Service Worker Installed');

});

self.addEventListener('activate', event => {

    console.log('Service Worker Activated');

});


/* =========================================================
   FILE STRUCTURE
   =========================================================

   PushNotification
   │
   ├── Program.cs
   │
   └── wwwroot
       │
       ├── index.html
       ├── app.js
       ├── manifest.json
       ├── service-worker.js
       │
       └── icons
           ├── icon1.png
           └── icon2.png

   ========================================================= */

/* =========================================================
   PRACTICAL 10(b)
   E-Commerce PWA with Product Listing and Offline Cart
   ========================================================= */


/* =========================================================
   FILE: Program.cs
   ========================================================= */

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Run();


/* =========================================================
   FILE: wwwroot/manifest.json
   ========================================================= */

{
  "name": "E-Commerce PWA",
  "short_name": "ShopPWA",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d6efd",
  "icons": [
    {
      "src": "icons/icon1.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon2.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}


/* =========================================================
   FILE: wwwroot/index.html
   ========================================================= */

<!DOCTYPE html>
<html>

<head>

    <title>E-Commerce PWA</title>

    <link rel="manifest" href="manifest.json">

    <meta name="theme-color" content="#0d6efd">

    <style>

        body {
            font-family: Arial;
            margin: 20px;
        }

        .container {
            display: flex;
            gap: 30px;
        }

        .cart-section {
            width: 30%;
            border: 1px solid gray;
            padding: 15px;
            min-height: 300px;
        }

        .product-section {
            width: 70%;
        }

        .products {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .product {
            border: 1px solid gray;
            padding: 10px;
            width: 200px;
        }

        button {
            padding: 5px 10px;
            cursor: pointer;
        }

    </style>

</head>

<body>

    <h1>E-Commerce PWA</h1>

    <div class="container">

        <div class="cart-section">

            <h2>Cart Items</h2>

            <ul id="cartList"></ul>

        </div>


        <div class="product-section">

            <h2>Products</h2>

            <div class="products">

                <div class="product">

                    <h3>Laptop</h3>

                    <p>Price: ₹50000</p>

                    <button onclick="addToCart('Laptop')">
                        Add to Cart
                    </button>

                </div>


                <div class="product">

                    <h3>Mobile</h3>

                    <p>Price: ₹20000</p>

                    <button onclick="addToCart('Mobile')">
                        Add to Cart
                    </button>

                </div>


                <div class="product">

                    <h3>Headphones</h3>

                    <p>Price: ₹3000</p>

                    <button onclick="addToCart('Headphones')">
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    </div>

    <script src="app.js"></script>

</body>

</html>


/* =========================================================
   FILE: wwwroot/app.js
   ========================================================= */

if ('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'));
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

displayCart();

function addToCart(product)
{
    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function displayCart()
{
    let cartList = document.getElementById('cartList');

    cartList.innerHTML = '';

    cart.forEach(item =>
    {
        let li = document.createElement('li');

        li.textContent = item;

        cartList.appendChild(li);
    });
}


/* =========================================================
   FILE: wwwroot/service-worker.js
   ========================================================= */

const CACHE_NAME = 'ecommerce-cache-v1';

const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json'
];

self.addEventListener('install', event =>
{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>
            {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event =>
{
    event.respondWith(
        caches.match(event.request)
            .then(response =>
            {
                return response || fetch(event.request);
            })
    );
});


/* =========================================================
   FILE STRUCTURE
   =========================================================

   ECommercePWA
   │
   ├── Program.cs
   │
   └── wwwroot
       │
       ├── index.html
       ├── app.js
       ├── manifest.json
       ├── service-worker.js
       │
       └── icons
           ├── icon1.png
           └── icon2.png

   ========================================================= */
