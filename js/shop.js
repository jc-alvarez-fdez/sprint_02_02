// Si tienes tiempo, puedes mover esta variable "productos" a un archivo json o js y cargar los datos en este js. Se verá más profesional.
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]






// => Recordatorio, es extremadamente importante que depures tu código.
// ** ¡Te ahorrará mucho tiempo y frustraciones!
// ** Comprenderás el código mejor que con console.log() y también encontrarás errores más rápido.
// ** No dudes en buscar ayuda de tus compañeros o de tu mentor si aún tienes dificultades con la depuración.

// Versión mejorada de cartList. El carrito es un array de productos (objetos), pero cada uno tiene un campo de cantidad para definir su cantidad, por lo que estos productos no se repiten.
var cart = [];
var total = 0;

// Exercise 1

   /*
    1. Vaya a la matriz de productos para obtener el artículo que desea agregar al carrito
    2. Agregar el producto encontrado al carrito
    ________________________________________________ 
    */

    function buy(id) {
        let product = products.find(item => item.id === id);

        if (product) { 
           
            let existingProduct = cart.find(item => item.id === id);
    
            if (existingProduct) {
                existingProduct.quantity += 1;                

            } else {
                product.quantity = 1;
                cart.push(product);
            }            
    
            total += product.price; 
            console.log("Producto agregado al carrito:", product);
    
            printCart(); 
            applyPromotionsCart(); 
            actualizarContador(); 
            

        } else {
            console.error("Producto no encontrado con ID:", id);
        }
    }
       
    function actualizarContador() {
        contadorCart = cart.length;
        document.getElementById("count_product").innerHTML = contadorCart;
    }
   



// Exercise 2
function cleanCart() {
    

    cart = [];
    total = 0;

    printCart();

}

// Exercise 3
function calculateTotal() {
    // Calcule el precio total del carrito usando la matriz "cartList"
   
    total = cart.reduce((acc, product) => acc + product.price, 0);
    printCart();
}

// Exercise 4
function applyPromotionsCart() {


    cart.forEach(product => {
        if (product.offer) {


            const offerCount = product.offer.number; 


            const productCountInCart = cart.reduce((count, item) => (item.id === product.id ? count + item.quantity : count), 0);


            if (productCountInCart >= offerCount) {

                const discountAmount = product.price * product.quantity * (product.offer.percent / 100);
                product.subtotal = product.price * product.quantity - discountAmount;
            } else {

                delete product.subtotal;
            }
        }
    });
}




// Exercise 5
function printCart() {
    // Llenar el modal del carrito de compras manipulando el dom del carrito de compras.

    var modalContent = document.getElementById("cart_list");
    console.log(modalContent);

    modalContent.innerHTML = "";

    cart.forEach(function (product) { 

        var row = modalContent.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = product.name;
        cell2.innerHTML = '$' + product.price.toFixed(2);
        cell3.innerHTML = product.quantity;

         let subtotal = product.subtotal || (product.price * product.quantity);
         cell4.innerHTML = '$' + subtotal.toFixed(2);

        cell5.innerHTML = '<button onclick="removeFromCart(' + product.id + ')"><i class="fa-solid fa-trash"></i></button>';
    });

    total = cart.reduce((acc, product) => acc + (product.subtotal || (product.price * product.quantity)), 0);
    var totalElement = document.getElementById("total_price");
    totalElement.innerHTML = total.toFixed(2);
  
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    const index = cart.findIndex(product => product.id === id);

    if (index !== -1) {

        if (cart[index].quantity > 1) {
  
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }


        applyPromotionsCart();
        calculateTotal();
    }
}






function open_modal() {
    printCart();
}