// Function to fetch and display all products
document.getElementById('load-products').addEventListener('click', () => {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('products-list');
            productsList.innerHTML = '';
            data.forEach(product => {
                productsList.innerHTML += `
                    <div class="product">
                        <h3>${product.carName} (${product.year})</h3>
                        <p>Manufacturer: ${product.manufacturer}</p>
                        <p>ID: ${product.id}</p>
                    </div>
                `;
            });
        });
});

// Handle the form submission to add a new product
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const carName = document.getElementById('carName').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const year = document.getElementById('year').value;
    
    fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            carName,
            manufacturer,
            year,
        }),
    })
    .then(response => response.json())
    .then(product => {
        alert(`Product added with ID: ${product.id}`);
        document.getElementById('product-form').reset(); // Clear form after submission
    });
});

// Handle the form submission to update a product
document.getElementById('update-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('update-id').value;
    const carName = document.getElementById('update-carName').value;
    const manufacturer = document.getElementById('update-manufacturer').value;
    const year = document.getElementById('update-year').value;
    
    fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            carName,
            manufacturer,
            year,
        }),
    })
    .then(response => response.json())
    .then(updatedProduct => {
        alert(`Product with ID: ${updatedProduct.id} updated`);
        document.getElementById('update-form').reset(); // Clear form after submission
    });
});
