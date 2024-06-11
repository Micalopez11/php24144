document.addEventListener('DOMContentLoaded', () => {
    
    const btnMenuOpen = document.querySelector("#btnMenuOpen"); 
    const btnMenuClose = document.querySelector("#btnMenuClose"); 
    const headerListLinks = document.querySelector("#headerListLinks"); 
    const navLinks = document.querySelectorAll(".header_items"); 
    const btnTop = document.querySelector("#btnTop"); 
  
    const showHideBtnTop = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnTop.style.display = "block";
      } else {
        btnTop.style.display = "none";
      };
    };
  
    window.onscroll = () => showHideBtnTop();
  
    const goToTop = () => {
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0; 
    };
  
    btnTop.addEventListener('click', goToTop);
  
    btnMenuOpen.addEventListener('click', () => {
      headerListLinks.classList.remove('hide_links-animation');
      headerListLinks.classList.add('show_links');
      headerListLinks.classList.add('show_links-animation');
      btnMenuOpen.classList.remove('btn_menu-active');
      btnMenuClose.classList.add('btn_menu-active');
    });
  
    btnMenuClose.addEventListener('click', () => {
      headerListLinks.classList.add('hide_links-animation');
      setTimeout(() => {
        headerListLinks.classList.remove('show_links');
      }, 500);
      btnMenuOpen.classList.add('btn_menu-active');
      btnMenuClose.classList.remove('btn_menu-active');
    });
  
    for (let link of navLinks) {
      link.addEventListener('click', () => {
        headerListLinks.classList.add('hide_links-animation');
        setTimeout(() => {
          headerListLinks.classList.remove('show_links');
        }, 500);
        btnMenuOpen.classList.add('btn_menu-active');
        btnMenuClose.classList.remove('btn_menu-active');
      });
    }
  
    const btnTrendPrev = document.querySelector("#btnTrendPrev");
    const btnTrendNext = document.querySelector("#btnTrendNext");
  
    window.addEventListener('resize', () => {
      const widthWindow = window.innerWidth; 
      if (widthWindow < 576) {
        if (btnTrendPrev && btnTrendNext) { 
  
          btnTrendPrev.innerHTML = "<i class=\"fa-solid fa-angle-left\"></i>";
          btnTrendNext.innerHTML = "<i class=\"fa-solid fa-angle-right\"></i>";
        }
      } else { 
        if (btnTrendPrev && btnTrendNext) { 
  
          btnTrendPrev.innerText = "Anterior";
          btnTrendNext.innerText = "Siguiente";
        };
      }
    });
  
    window.dispatchEvent(new Event('resize'));
  
    const acclaimedsContainer = document.querySelector("#acclaimedsContainer");
    
    const acclaimedBtnNext = document.querySelector("#acclaimedBtnNext");
   
    const acclaimedBtnPrev = document.querySelector("#acclaimedBtnPrev");
    
    if (acclaimedBtnNext && acclaimedBtnPrev) { 
      acclaimedBtnNext.addEventListener('click', () => {
        acclaimedsContainer.scrollLeft += 400;
      });
      
      acclaimedBtnPrev.addEventListener('click', () => {
        acclaimedsContainer.scrollLeft -= 400;
      });
    };
  
    
    if (acclaimedsContainer) { 
      function verifyScrollAcclaimed() {
        
        if (acclaimedsContainer.scrollWidth - acclaimedsContainer.scrollLeft === acclaimedsContainer.clientWidth) {
          acclaimedBtnNext.disabled = true;
          acclaimedBtnNext.classList.add('acclaimed_btn-hide');
        } else {
          acclaimedBtnNext.disabled = false;
          acclaimedBtnNext.classList.remove('acclaimed_btn-hide');
        }
        
        if (acclaimedsContainer.scrollLeft === 0) {
          acclaimedBtnPrev.disabled = true;
          acclaimedBtnPrev.classList.add('acclaimed_btn-hide');
        } else {
          acclaimedBtnPrev.disabled = false;
          acclaimedBtnPrev.classList.remove('acclaimed_btn-hide');
        }
      };
      
      verifyScrollAcclaimed();
      acclaimedsContainer.addEventListener('scroll', verifyScrollAcclaimed);
    };
    
    const searchContainer = document.querySelector("#searchContainer"); 
    const trendsContainer = document.querySelector('#trends'); 
    const acclaimedContainer = document.querySelector('#acclaimeds') 
    
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || window.scrollTop;
      const windowHeight = window.innerHeight;
  
     
      if (searchContainer) { 
        const rectSearch = searchContainer.getBoundingClientRect(); 
        
        if (rectSearch.top - scrollPos < windowHeight) {
          searchContainer.classList.add('anim_slice_up');
        } else {
          searchContainer.classList.remove('anim_slice_up');
        }
      };
      
      if (trendsContainer) { 
        const rectTrends = trendsContainer.getBoundingClientRect();

        if (rectTrends.top - scrollPos < windowHeight) {
          trendsContainer.classList.add('anim_slice_up');
        } else {
          trendsContainer.classList.remove('anim_slice_up');
        }
      };

      if (acclaimedsContainer) { 
        const rectAcclaimeds = acclaimedContainer.getBoundingClientRect();

        if (rectAcclaimeds.top - scrollPos < windowHeight / 4) {
          acclaimedContainer.classList.add('anim_slice_up');
        } else {
          acclaimedContainer.classList.remove('anim_slice_up');
        }
      };
    });
  });