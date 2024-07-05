function scrollStep(p) {
    var current = window.scrollY;

    var dirMod = 0;

    if (p.dir === 'up') {
        dirMod = -1;
    } else {
        dirMod = 1;
    }
    
    window.scrollTo({
        top: window.scrollY + dirMod * params.scrolling.step,
        left: 0,
        behavior: 'smooth'
      });
      
}