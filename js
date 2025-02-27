function showMenu(menuType) {
document.addEventListener('DOMContentLoaded', function() {
    let db = new DatabaseManager();
    let engine = new AlgorithmEngine();

    function addProduct(type) {
        let form = document.getElementById(`product-form-${type}`);
        let nameInput = form.elements['name'];
        let typeSelect = form.elements['type'];

        db.add_product(nameInput.value, typeSelect.value);
        updateProductList(type);
        nameInput.value = '';
        typeSelect.value = '';
    }

    function updateProductList(type) {
        let listElement = document.getElementById(`product-list-${type}`);
        listElement.innerHTML = '';

        switch(type) {
            case 'fruit':
                fruits.forEach(fruit => {
                    let li = document.createElement('li');
                    li.textContent = `${fruit.name} (${fruit.type}, ${fruit.expiration_date || 'Без срока'}>`;
                    listElement.appendChild(li);
                });
                break;
            case 'grain':
                grains.forEach(grain => {
                    let li = document.createElement('li');
                    li.textContent = `${grain.name} (${grain.type})`;
                    listElement.appendChild(li);
                });
                break;
            case 'kitchen-item':
                kitchenItems.forEach(item => {
                    let li = document.createElement('li');
                    li.textContent = `${item.name} (Количество: ${item.quantity})`;
                    listElement.appendChild(li);
                });
                break;
        }
    }

    function analyzeInput() {
        let input = document.getElementById('user-input').value;
        let analysis = engine.analyze_user_input(input);
        document.getElementById('analysis-result').textContent = JSON.stringify(analysis, null, 2);
    }

    function suggestProducts() {
        let products = engine.suggest_products(engine.analyze_user_input(document.getElementById('user-input').value));
        let listElement = document.getElementById('suggested-products');
        listElement.innerHTML = '';

        products.forEach(product => {
            let li = document.createElement('li');
            li.textContent = `${product.name} (${product.type}, ${product.expiration_date || 'Без срока'}`;
            listElement.appendChild(li);
        });
    }

    function checkKitchenItems() {
        let recipeText = document.getElementById('recipe-text').value;
        let missingItems = engine.check_kitchen_items(recipeText);
        document.getElementById('missing-items').textContent = JSON.stringify(missingItems, null, 2);
    }

    function processIo```
