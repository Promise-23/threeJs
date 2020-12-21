/**
 * @param string val 要转成图片的字符串
 */
export const textToImg = function textToImg(val) {
  var len = 16;/*文字长度*/
  var i = 0;
  var fontSize = 50;/*文字大小*/
  var fontWeight = 'normal';/*normal正常;bold粗*/
  var txt = val;
  var canvas = document.createElement("canvas");
  if (txt == '') {
      alert('请输入文字！');
      
  }
  if (len > txt.length) {
      len = txt.length;
  }
  canvas.width = 1024
  canvas.height = 768
  // canvas.width = fontSize * len;
  // canvas.height = fontSize * (3 / 2)
  //         * (Math.ceil(txt.length / len) + txt.split('\n').length - 1);

  var context = canvas.getContext('2d');
  context.fillStyle = '#83878c';/*颜色*/

    // var img= new Image();
    // img.src="img/border.jpg";
    // img.onload=function(){
    //     draw();
    // }
    // function draw(){        
    //     /* eslint-disable */
    //     // debugger
    //     var pattern = context.createPattern(img, "no-repeat") //不加；号
    //     context.fillStyle = pattern;
    //     context.fillRect(0, 0, 300, 300);
    // }

  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#fff';/*颜色*/
  context.font = fontWeight + ' ' + fontSize + 'px 微软雅黑';
  context.textBaseline = 'top';
  canvas.style.display = 'none';
  //console.log(txt.length);
  function fillTxt(text) {
      while (text.length > len) {
          var txtLine = text.substring(0, len);
          text = text.substring(len);
          context.fillText(txtLine, 100, 80+fontSize * (3 / 2) * i++,
                  canvas.width);
      }
      context.fillText(text, 100, 80+fontSize * (3 / 2) * i, canvas.width);
  }
  var txtArray = txt.split('\n');
  for (var j = 0; j < txtArray.length; j++) {
      fillTxt(txtArray[j]);
      context.fillText('\n', 100, 80+fontSize * (3 / 2) * i++, canvas.width);
  }
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData)
  console.log(canvas.toDataURL("image/png"))
  return canvas.toDataURL("image/png");
}