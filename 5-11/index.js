window.onload = function() {
    // 获取所有地鼠洞和地鼠元素
    var holes = document.querySelectorAll('.hole');
    var moles = document.querySelectorAll('.mole');
    var score = 0; // 初始化得分
  
    // 隐藏所有地鼠
    function hideMoles() {
      moles.forEach(function(mole) {
        mole.style.display = 'none';
      });
    }
  
    // 在随机的地鼠洞中显示地鼠
    function showMole() {
      hideMoles();
      var randomHole = Math.floor(Math.random() * holes.length);
      var mole = moles[randomHole];
      mole.style.display = 'block';
  
      // 一段时间后隐藏地鼠
      setTimeout(function() {
        mole.style.display = 'none';
      }, 1000);
    }
  
    // 点击地鼠得分
    moles.forEach(function(mole) {
      mole.addEventListener('click', function() {
        if (mole.style.display !== 'none') {
          score++;
          document.querySelector('#score').textContent = score;
          mole.style.display = 'none';
        }
      });
    });
  
    // 每隔一段时间显示地鼠
    setInterval(showMole, 1000);
  };
  