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
        // Mediante el método find, busco en el array el producto con el id que coincide con el proporcionado
        let product = products.find(item => item.id === id);

        if (product) { // se encontró el producto
            // Verificar si el producto ya está en el carrito
            let existingProduct = cart.find(item => item.id === id);
    
            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                existingProduct.quantity += 1;                

            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                product.quantity = 1;
                cart.push(product);
            }            
    
            total += product.price; // actualizo el total
            console.log("Producto agregado al carrito:", product);
    
            printCart(); // actualizo el contenido del carrito
            applyPromotionsCart(); // aplico las promociones
            actualizarContador(); // actualizo el contador de compras
            

        } else { // no se encontró
            console.error("Producto no encontrado con ID:", id);
        }
    }
       
    function actualizarContador() {
        contadorCart = cart.length;
        document.getElementById("count_product").innerHTML = contadorCart;
    }
   



// Exercise 2
function cleanCart() {
    
    // Limpio el carrito y pongo el total a 0
    cart = [];
    total = 0;

    // Actualizo el carrito después de limpiarlo 
    printCart();

}

// Exercise 3
function calculateTotal() {
    // Calcule el precio total del carrito usando la matriz "cartList"
   
    //Con el método reduce voy sumando los importes acumulados
    total = cart.reduce((acc, product) => acc + product.price, 0);

    // Actualizo el carrito
    printCart();
}

// Exercise 4
function applyPromotionsCart() {
    // Iterar sobre el carrito y aplicar descuentos según las promociones

    // Busco en el carrito los productos con promoción (propiedad "offer" que especifica el número de artículos "number" para aplicar la promoción y el descuento aplicado "percent")

    cart.forEach(product => {
        if (product.offer) {

            // Cantidad requerida para la oferta
            const offerCount = product.offer.number; 

            // Calcula la cantidad total del producto actual en el carrito
            const productCountInCart = cart.reduce((count, item) => (item.id === product.id ? count + item.quantity : count), 0);
            /*
            cart.reduce:
            reduce el array a un solo valor acumulado.

            (count, item) => ...:
            función de reducción que se aplica a cada elemento del array cart. ("count" es el valor acumulado hasta ahora e "item" es cada elemento del array).

            item.id === product.id ? count + item.quantity : count):
            Condición: si el id del producto actual (item.id) coincide con el id del producto para el cual estamos aplicando promociones (product.id)
            Si coinciden, se suma la cantidad de ese producto al "count".
            Si no coinciden, se devuelve el "count" sin cambios.

            , 0):
            Valor inicial de count antes de comenzar a iterar sobre el array      
            */
  

            if (productCountInCart >= offerCount) {
                // Si la cantidad en el carrito cumple con la oferta, aplicar descuento
                const discountAmount = product.price * product.quantity * (product.offer.percent / 100);
                product.subtotal = product.price * product.quantity - discountAmount;
            } else {
                // Si la cantidad en el carrito no cumple con la oferta, eliminar el descuento
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

    modalContent.innerHTML = ""; // Limpio el contenido existente en el modal

    // Itero sobre cada producto en el carrito
    cart.forEach(function (product) { 

        // Creo una nueva fila en la tabla del modal
        var row = modalContent.insertRow();

        // Creo las celdas para cada propiedad del producto
        var cell1 = row.insertCell(0); // Nombre
        var cell2 = row.insertCell(1); // Precio
        var cell3 = row.insertCell(2); // Cantidad producto (input)
        var cell4 = row.insertCell(3); // Subtotal del producto
        var cell5 = row.insertCell(4); // Botón para eliminar el producto

        cell1.innerHTML = product.name;
        cell2.innerHTML = '$' + product.price.toFixed(2);
        cell3.innerHTML = product.quantity;

         // Calculo el subtotal, teniendo en cuenta las promociones si las tiene
         let subtotal = product.subtotal || (product.price * product.quantity);
         cell4.innerHTML = '$' + subtotal.toFixed(2);

        cell5.innerHTML = '<button onclick="removeFromCart(' + product.id + ')"><i class="fa-solid fa-trash"></i></button>';
    });



    // Actualizar el total después de imprimir el carrito
    total = cart.reduce((acc, product) => acc + (product.subtotal || (product.price * product.quantity)), 0);
    var totalElement = document.getElementById("total_price");
    totalElement.innerHTML = total.toFixed(2);
  
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    // Localizo el índice del producto con el ID proporcionado en el carrito
    const index = cart.findIndex(product => product.id === id);

    if (index !== -1) {
        // Verifico si la cantidad del producto es mayor a 1
        if (cart[index].quantity > 1) {
            // Resto una unidad
            cart[index].quantity -= 1;
        } else {
            // Si la cantidad es 1 o menor, elimino el producto del carrito
            cart.splice(index, 1);
        }

        // Aplico las promociones después de modificar el carrito
        applyPromotionsCart();

        // Recalculo el total
        calculateTotal();
    }
}






function open_modal() {
    printCart();
}