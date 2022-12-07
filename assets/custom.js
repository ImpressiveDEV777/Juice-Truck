(function() {
  var perishableZones = document.getElementsByTagName('body')[0].dataset.localDeliveryZones.split(','),
      m1Container = document.querySelector('.method_1_p'),
      m2Container = document.querySelector('.method_2_p'),
      m3Container = document.querySelector('.method_3_p'),
      postalInput = document.getElementById('postalcode'),
      postalInputDrop = document.getElementById('postalcode_drop'),
      postalButton = document.querySelector('#methodModal .local .confirm'),
      modalContainer = document.querySelector('.methodModal_container'),
      infoBtn = document.querySelector('.nav__item-delivery'),
      infoBtnNav = document.querySelector('.nav__item-delivery .nav__link'),
      infoItem = document.querySelector('.header__nav .nav__item-delivery .nav__link'),
      pickupContainer = document.querySelector('#methodModal .pickup'),
      shippingContainer = document.querySelector('#methodModal .shipping'),
      inputDropdown = document.querySelector('.delivery_dropdown_p .method1_input_p'),
      methodDropdown = document.querySelector('.delivery_dropdown_p'),
      alertContainer = document.querySelector('.delivery_alert_container_p'),
      addButtonPDP = document.querySelector('.product-form__submit-button-wrapper .product-form__cart-submit'),
      postalAlert = document.querySelector('.post_alert'),
      postalSelector = document.querySelector('#methodModal .local'),
      infoMob2 = document.querySelector('.delivery_mob .drawer-menu__list .drawer-menu__item--heading > a > span'),
      infoMob1 = document.querySelector('.drawer-menu__item.delivery_mob > a > span'),
      shippingMob = document.querySelector('.delivery_mob .shipping_mob'),
      pickupMob = document.querySelector('.delivery_mob .pickup_mob'),
      postalMob = document.querySelector('.delivery_mob .postal_mob'),
      postalInputMob = document.querySelector('.postalinput_mob'),
      justBrowsingMessage = document.querySelector('.just_browsing_message_p'),
      postInputMob = document.getElementById('postalcode_mob');

//   Wait for Zapier postal code input tag
  var waitForInput = () => {
    var deliveryGeoSearchField = document.getElementById('deliveryGeoSearchField');
    if (!deliveryGeoSearchField) {
      setTimeout(waitForInput, 100);
      return;
    }
    deliveryGeoSearchField.value = localStorage.getItem('postalcode') || '';
    deliveryGeoSearchField.nextElementSibling.click();            
  }
  
//   Close the delivery method modal
  var closeModal = () => {
    modalContainer.classList.remove('active');
  }
  
//    function for the method selection modal
  var m1ContainerWork = () => {
    m2Container.classList.remove('active');
    m3Container.classList.remove('active');
    m1Container.classList.add('active');
  }
  
  var m2ContainerWork = () => {
    m1Container.classList.remove('active');
    m3Container.classList.remove('active');
    m2Container.classList.add('active');
  }
  
  var m3ContainerWork = () => {
    m1Container.classList.remove('active');
    m2Container.classList.remove('active');
    m3Container.classList.add('active');
  }
  
  var method2Work = () => {
    localStorage.setItem('method', '2');
    infoItem.innerHTML = "Shipping";
  }
  
  var method3Work = () => {
    localStorage.setItem('method', '3');
    infoItem.innerHTML = "Pickup";
  }
  
//   functions for the delivery methods in mobile menu
  var method1Mob = () => {
    infoMob2.innerHTML = `Delivery<span class="detail">` + localStorage.getItem('postalcode') + "</span>";
    infoMob1.innerHTML = `Delivery<span class="detail">` + localStorage.getItem('postalcode') + "</span>";
  }
  
  var method2Mob = () => {
    infoMob2.innerText = "Shipping";
    infoMob1.innerText = "Shipping";
    localStorage.setItem('method', '2'); 
  }
  
  var method3Mob = () => {
    infoMob2.innerText = "Pickup";
    infoMob1.innerText = "Pickup";
    localStorage.setItem('method', '3');
  }
  
//   Remove method selection dropdown on desktop
  var dropRemove = () => {
    methodDropdown.classList.remove('active');
    inputDropdown.style.display = 'none';
    inputDropdown.classList.remove('active');
  }
  
//   Function the shipping method on PDP
  var shippingShow = () => {
    if (document.querySelector('.template-product') && alertContainer) {
      alertContainer.style.display = 'block';
      addButtonPDP.disabled = true;
    }
  }
  
  var shippingHide = () => {
    if (document.querySelector('.template-product') && alertContainer) {
      alertContainer.style.display = 'none';
      addButtonPDP.disabled = false;
    }
  }
  
//   Quit browsing mode
  var quitBrowsing = () => {
    if (document.querySelector('.product-form__item--submit')) {
      document.querySelector('.product-form__item--submit').style.display = 'block';
    }
    if (document.querySelectorAll('.product-item__quick-shop-button')) {
      document.querySelectorAll('.product-item__quick-shop-button').forEach((el) => {
        el.style.display = 'block';
      });
    }
  }
  
//   Shipping method for the quick add buttons
  var shippingQuickAddHide = () => {
    if (document.querySelectorAll('.product-item__quick-shop-button')) {
      document.querySelectorAll('.product-item__quick-shop-button').forEach((el) => {
        if (el.dataset.shipping == 'no') {
          el.style.display = 'none';
        }
      });
    }
  }
  
  var shippingQuickAddShow = () => {
    if (document.querySelectorAll('.product-item__quick-shop-button')) {
      document.querySelectorAll('.product-item__quick-shop-button').forEach((el) => {
        el.style.display = 'block';
      });
    }
  }
  
//   Apply methods to Zaipet
  var zapierShippingWork = () => {
    var zapierContainer = document.querySelectorAll('#storePickupApp .checkoutMethod');

    if (zapierContainer[0]) {
      zapierContainer[0].click();
      document.querySelectorAll('.cart-template__details').forEach((el) => {
        if (el.dataset.shipping != '1') {
          document.querySelector('button[name="checkout"]').style.display = 'none';
          document.querySelector('.cart-template__footer-actions .cart_error_message_p').style.display = 'block';
        }
      });
    }
  }
  
  var zapierShippingNoWork = () => {
    var zapierContainer = document.querySelectorAll('#storePickupApp .checkoutMethod');

    if (zapierContainer[0]) {
      document.querySelector('button[name="checkout"]').style.display = 'block';
      document.querySelector('.cart-template__footer-actions .cart_error_message_p').style.display = 'none';
    }
  }
  
  var zapierDeliveryWork = () => {
    var zapierContainer = document.querySelectorAll('#storePickupApp .checkoutMethod');

    if (zapierContainer[1]) {
      zapierContainer[1].click();
      waitForInput();
    }
  }
  
  var zapierPickupWork = () => {
    var zapierContainer = document.querySelectorAll('#storePickupApp .checkoutMethod');

    if (zapierContainer[2]) {
      zapierContainer[2].click();
    }
  }
  
  if (document.getElementById('change_code_p')) {
    document.getElementById('change_code_p').addEventListener('click', (el) => {
      window.innerWidth > 1087 ? methodDropdown.classList.add('active') : document.querySelector('.mobile-nav__trigger').click();
    });
  }
  
  document.querySelector('.confirm_mob').addEventListener('click', (el) => {
    var value = postInputMob.value;
    if (value == '') {
      alert("Please input the postal code");
    }
    else {
      value = value.slice(0, 3);
      if (perishableZones.join(',').toLowerCase().split(',').indexOf(value.toLowerCase()) == -1){
        alert(postalAlert.innerText);
        return;
      }
      localStorage.setItem('postalcode', postInputMob.value);
      localStorage.setItem('method', '1');
      method1Mob();
      shippingHide();
      quitBrowsing();
      shippingQuickAddShow();
      zapierShippingNoWork();
      zapierDeliveryWork();
    }
  });
  
  postalMob.addEventListener('click', (el) => {
    postalInputMob.style.display = 'flex';
    postalMob.classList.add('active');
    pickupMob.classList.remove('active');
    shippingMob.classList.remove('active');
  });
  
  shippingMob.addEventListener('click', (el) => {
    method2Mob();
    shippingShow();
    postalMob.classList.remove('active');
    pickupMob.classList.remove('active');
    shippingMob.classList.add('active');
    quitBrowsing();
    shippingQuickAddHide();
    zapierShippingWork();
  });
  
  pickupMob.addEventListener('click', (el) => {
    method3Mob();
    shippingHide();
    postalMob.classList.remove('active');
    pickupMob.classList.add('active');
    shippingMob.classList.remove('active');
    quitBrowsing();
    shippingQuickAddShow();
    zapierShippingNoWork();
    zapierPickupWork();
  });
  
  infoBtnNav.addEventListener('click', (el) => {
    methodDropdown.classList.add('active');
  });  
  
  infoBtn.addEventListener('click', (el) => {
    if (el.target === el.currentTarget) {
      methodDropdown.classList.add('active');
    }
  });
    
  m1Container.addEventListener('click', (el) => {
    inputDropdown.style.display = 'flex';
    inputDropdown.classList.add('active');
  });
  
  m2Container.addEventListener('click', (el) => {
    if (justBrowsingMessage) {
      justBrowsingMessage.style.display = 'none';
    }
    m2ContainerWork();
    method2Work();
    shippingShow();
    dropRemove();
    quitBrowsing();
    shippingQuickAddHide();
    zapierShippingWork();
  });
  
  m3Container.addEventListener('click', (el) => {
    if (justBrowsingMessage) {
      justBrowsingMessage.style.display = 'none';
    }
    m3ContainerWork();
    method3Work();
    shippingHide();
    dropRemove();
    quitBrowsing();
    shippingQuickAddShow();
    zapierShippingNoWork();
    zapierPickupWork();
  });
  
  document.querySelector('.confirm_drop').addEventListener('click', (el) => {
    var code = postalInputDrop.value;
    if (code == '') {
      alert("Please input the postal code");
    }
    else {
      if (justBrowsingMessage) {
        justBrowsingMessage.style.display = 'none';
      }
      code = code.slice(0, 3);
      if (perishableZones.join(',').toLowerCase().split(',').indexOf(code.toLowerCase()) == -1){
        alert(postalAlert.innerText);
        return;
      }
      localStorage.setItem('postalcode', postalInputDrop.value);
      localStorage.setItem('method', '1');
      infoItem.innerHTML = `Delivery<span class="detail">` + postalInputDrop.value + "</span>";
      dropRemove();
      m1ContainerWork();
      shippingHide();
      quitBrowsing();
      shippingQuickAddShow();
      zapierShippingNoWork();
      zapierDeliveryWork();
    }
  });
  
  postalButton.addEventListener('click', (el) => {
    var code = postalInput.value;
    if (code == '') {
      alert("Please input the postal code");
    }
    else {
      code = code.slice(0, 3);
      if (perishableZones.join(',').toLowerCase().split(',').indexOf(code.toLowerCase()) == -1){
        postalAlert.style.display = 'block';
        return;
      }
      localStorage.setItem('postalcode', postalInput.value);
      localStorage.setItem('method', '1');
      postalAlert.style.display = 'none';
      closeModal();
      infoItem.innerHTML = `Delivery<span class="detail">` + postalInput.value + "</span>";
      infoMob2.innerHTML = `Delivery<span class="detail">` + postalInput.value + "</span>";
      infoMob1.innerHTML = `Delivery<span class="detail">` + postalInput.value + "</span>";
      postalMob.classList.add('active');
      m1ContainerWork();
      shippingHide();
      shippingQuickAddShow();
    }
  }); 
  
  shippingContainer.addEventListener('click', (el) => {
    closeModal();
    method2Work();
    m2ContainerWork();
    method2Mob();
    shippingMob.classList.add('active');
    shippingShow();
    shippingQuickAddHide();
  });
  
  pickupContainer.addEventListener('click', (el) => {
    closeModal();
    method3Work();
    method3Mob();
    pickupMob.classList.add('active');
    m3ContainerWork();
    shippingQuickAddShow();
  });
  
  postalSelector.addEventListener('mouseenter', (el) => {
    postalInput.style.display = 'block';
    postalButton.style.display = 'block';
  });
  
  postalSelector.addEventListener('mouseleave', (el) => {
    if (postalInput.value == '') {
      postalInput.style.display = 'none';
      postalButton.style.display = 'none';
      postalAlert.style.display = 'none';
    }
  });
  
  document.querySelector('#methodModal .browsing').addEventListener('click', (el) => {
    localStorage.setItem('method', '4');
    closeModal();
    infoItem.innerHTML = 'Browsing';
    infoMob1.innerText = 'Browsing';
    infoMob2.innerText = 'Browsing';
    if (document.querySelector('.product-form__item--submit')) {
      document.querySelector('.product-form__item--submit').style.display = 'none';
    }
    if (document.querySelectorAll('.product-item__quick-shop-button')) {
      document.querySelectorAll('.product-item__quick-shop-button').forEach((el) => {
        el.style.display = 'none';
      });
    }
  });
    
  document.querySelector('.close_method_modal').addEventListener('click', (el) => {
    closeModal();
  });
  
  window.onload = function() {
    var method = localStorage.getItem('method');
    var postcode = localStorage.getItem('postalcode');


    m1Container.classList.remove('active');
    m2Container.classList.remove('active');
    m3Container.classList.remove('active');
    switch(method) {
      case '1':
        m1Container.classList.add('active');
        infoItem.innerHTML = `Delivery<span class="detail">` + postcode + "</span>";
        postalMob.classList.add('active');
        method1Mob();
        zapierDeliveryWork();
        break;
      case '2':
        m2Container.classList.add('active');
        method2Work();
        method2Mob();
        shippingShow();
        shippingMob.classList.add('active');
        shippingQuickAddHide();
        zapierShippingWork();
        break;
      case '3':
        zapierPickupWork();
        m3Container.classList.add('active');
        method3Work();
        method3Mob();
        pickupMob.classList.add('active');
        zapierPickupWork();
        break;
      case '4':
        infoItem.innerHTML = 'Browsing';
        if (justBrowsingMessage) {
          justBrowsingMessage.style.display = 'block';
        }
        if (document.querySelector('.product-form__item--submit')) {
          document.querySelector('.product-form__item--submit').style.display = 'none';
        }
        if (document.querySelectorAll('.product-item__quick-shop-button')) {
          document.querySelectorAll('.product-item__quick-shop-button').forEach((el) => {
            el.style.display = 'none';
          });
        }
        break;
    }
    if (method == null) {
      if (document.querySelector('.template-product') || document.querySelector('.template-collection')) {
        modalContainer.classList.add('active');
      }
    }
  }
  
  //BUILD A CLEANSE PRODUCT
  var addMoreBtn = document.getElementById('add-more');
  var deleteBtn = document.getElementById('delete');
  var setOption = function(id, value) {
    var option = document.getElementById(id);
    console.log(option);
    if (option) {
      option.value = value;
      option.dispatchEvent(new Event('change'));
    }
  }
  if (addMoreBtn) {
    addMoreBtn.onclick = function() {
      var max = parseInt(addMoreBtn.dataset.max, 10);
      var min = parseInt(addMoreBtn.dataset.min, 10);
      var count = parseInt(addMoreBtn.dataset.count, 10);
      if (isNaN(min) || isNaN(max) || isNaN(count)) {
        return;
      }
      
      if (count == max) {
        return;
      }
      
      count = count + 1;
      setOption('Option1', count);
      addMoreBtn.dataset.count = count;
      var variant = document.getElementById('variant-' + count);
      if (variant) {
        variant.style.display = ''
        variant.getElementsByTagName('select')[0].disabled = false;
      }
      for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].disabled = count <= min ? true : false;
      }
      addMoreBtn.disabled = count < max ? false : true;
      
      console.log(min, max, count);
      
    } 
    
    var deleteBtns = document.getElementsByClassName("delete-button");
    for (var i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].onclick = function(e) {
        var max = parseInt(addMoreBtn.dataset.max, 10);
        var min = parseInt(addMoreBtn.dataset.min, 10);
        var count = parseInt(addMoreBtn.dataset.count, 10);
        if (isNaN(min) || isNaN(max) || isNaN(count)) {
          return;
        }

        if (count <= min) {
          return;
        }
        var variant = document.getElementById('variant-' + count);
        if (variant) {
          variant.style.display = 'none'
          variant.getElementsByTagName('select')[0].disabled = true;
        }

        count = count - 1;

        setOption('Option1', count);

        addMoreBtn.dataset.count = count;
        var current = parseInt(e.target.dataset.remove, 10);
        if (!isNaN(current)) {
          for (var i=current; i<=count; i++) {
            var variant1 = document.getElementById('variant-' + i);
            var variant2 = document.getElementById('variant-' + (i+1));
            if (variant1 && variant2) {
              variant1.getElementsByTagName('select')[0].value =  variant2.getElementsByTagName('select')[0].value;
            }
          }
        }
        
        for (var i = 0; i < deleteBtns.length; i++) {
          deleteBtns[i].disabled = count <= min ? true : false;
        }
        addMoreBtn.disabled = count < max ? false : true;

        console.log(min, max, count);
      }
    }
        
    var boxSelects = document.getElementsByClassName("box-select");
    for (var i = 0; i < boxSelects.length; i++) {
      boxSelects[i].onchange = function(e) {
        var option = e.target.querySelector('option:checked');
        if (option) {
          e.target.closest('tr').getElementsByTagName('img')[0].src = option.dataset.image;
        }
      }
    }
  } 
})();