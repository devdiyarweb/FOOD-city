const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 20000,
        kcall: 250,
        amount: 0,
        get Summ(){
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 25000,
        kcall: 400,
        amount: 0,
        get Summ(){
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }

    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 30000,
        kcall: 700,
        amount: 0,
        get Summ(){
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }

    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1500,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 1000,
        kcall: 5
    },
    cheese: {
        name: 'Сыр',
        price: 2500,
        kcall: 30
    }
}

const btnPlusOrMinus     = document.querySelectorAll('.main__product-btn'),
      checkExtraProduct  = document.querySelectorAll('.main__product-checkbox'),
      addCart            = document.querySelector('.addCart'),  
      receipt            = document.querySelector('.receipt'),
      receiptOut         = document.querySelector('.receipt__window-out'),
      receiptWindow      = document.querySelector('.receipt__window');
      btnReceipt         = document.querySelector('.receipt__window-btn');

      for (let i = 0; i < btnPlusOrMinus.length; i++) {
          btnPlusOrMinus[i].addEventListener('click', function() {
              plusOrMinus(this);
          })
      }

      function plusOrMinus(element){
         //  closest() - метод объекта, подключает нас к родительскому элементу
         //  getAttribute() - берет инфу с атрибута          
         const parent    = element.closest('.main__product'),
               parentId  = parent.getAttribute('id'),
               out       = parent.querySelector('.main__product-num'),
               price     = parent.querySelector('.main__product-price span'),
               kcall     = parent.querySelector('.main__product-call span'),
               elemData  = element.getAttribute('data-symbol');
      console.log(elemData);

      if(elemData == '+' && product[parentId].amount < 10) {
          product[parentId].amount++
      } else if (elemData == '-' && product[parentId].amount > 0){
          product[parentId].amount--
        }
        
        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
       

    } 
    for (let i = 0; i < checkExtraProduct.length; i++) {
        checkExtraProduct[i].addEventListener('click', function(){
            addExtraProduct(this);  // this у нас равняентся checkExtraProduct[i]
        })
    }

function addExtraProduct(element) {
    const  parent    = element.closest('.main__product'),
        parentId  = parent.getAttribute('id'),
        price     = parent.querySelector('.main__product-price span'),
        kcall     = parent.querySelector('.main__product-call span'),
        elAtr     = element.getAttribute('data-extra');
        product[parentId][elAtr] = element.checked;
        console.log(product[parentId][elAtr]);

        if (product[parentId][elAtr] == true) {
            product[parentId].kcall += extraProduct[elAtr].kcall
            product[parentId].price += extraProduct[elAtr].price
        } else {
            product[parentId].kcall -= extraProduct[elAtr].kcall
            product[parentId].price -= extraProduct[elAtr].price
        }

        kcall.innerHTML = product[parentId].kcall;
        price.innerHTML = product[parentId].Summ;
    }

    let arrayProduct = [],
        totalName    = '',
        totalPrice   = 0,
        totalKcall   = 0

        addCart.addEventListener('click', function(){
            for (const key in product) {
                const po = product[key]
                if (po.amount > 0) {
                    arrayProduct.push(po)
                    for (const infokey in po) {
                        if (po[infokey] === true) {
                            po.name += '\n' + extraProduct[infokey].name;
                        }
                        
                    }
                }
                po.price = po.Summ;
                po.kcall = po.Kcall;
            }
        

        for (let i = 0; i < arrayProduct.length; i++) {
            const el = arrayProduct[i]
            totalPrice += el.price  
            totalKcall += el.kcall
            totalName  += '\n' + el.name + '\n'    
        }

        receiptOut.innerHTML = `Вы купили \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость покупки ${totalPrice} сумм`
        receipt.style.display = 'flex';
        setTimeout(function() {
          receipt.style.opacity = '1'

        }, 100);

        setTimeout(function() {
            receiptWindow.style.top = '0'
        }, 200)
    
    })

    btnReceipt.addEventListener('click', function() {
        location.reload()
    })

    const view       = document.querySelector('.view'),
          viewClose  = document.querySelector('.view__close'),
          viewImg    = document.querySelector('.view img'),
          productImg = document.querySelectorAll('.main__product-info');
          

          for (let i = 0; i < productImg.length; i++) {
              productImg[i].addEventListener('dblclick',  function() {
              img(this)
            })}

            function img(element) {
              
                view.classList.add('active')
                const img = element.querySelector('img').getAttribute('src')
                viewImg.setAttribute('src', img)
            
            }
            viewClose.addEventListener('click', function(){
                this.closest('.view').classList.remove('active')
                console.log(this);
            })
            const lvl = document.querySelector('.header__timer-extra');
                let speed = 20
                function LVL(i = 0){
                    lvl.innerHTML = i
                    i++
                    if (i > 50 && i < 75) {
                        speed = 50
                        lvl.style.color = 'red'
                    } else if (i > 74 && i < 85){
                        speed = 80
                        lvl.style.color = 'green'
                    } else if(i > 84 && i < 95) {
                        speed = 120
                        lvl.style.colo = 'blue'
                    } else if (i > 94){
                        speed = 170
                        lvl.style.color = 'gold'
                    }

                    if(i <= 100){
                        lvl.style.color = 'white'
                        setTimeout(() => LVL(i), speed)
                    }
                }
            LVL()