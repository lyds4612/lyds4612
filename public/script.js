var xhr = new XMLHttpRequest();
const element = document.querySelector('.recomendation-similar')
const id = element.getAttribute('product-id')
var json = JSON.stringify({
  id: "id"
});

xhr.open("POST", '/api/recomendation/similar', true)
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.onreadystatechange = function(){
    if (xhr.readyState ===4){
        const data = JSON.parse(xhr.response)
        console.log(data)
        let html = data.map(function(product){
            const image = `<img class='rec-image' src=${product.productImage}>`
            const title = `<h1 class='rec-title'>${product.productName}</h1>`
            const price = `<p class='rec-price'>${product.productPrice}</p>`
            return '<div class=rec-product>'+image + title + price+'</div>'
        }).join(" ")
        element.innerHTML= html
    }
};
xhr.send(json);