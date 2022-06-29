let images=[
  {src:'assets/slider-image-1.jpg',height:200,width:260},
  {src:'assets/slider-image-2.jpg',height:200,width:120},
  {src:'assets/slider-image-3.jpg',height:200,width:180},
  {src:'assets/slider-image-4.jpg',height:200,width:220},
  {src:'assets/slider-image-5.jpg',height:200,width:260},
  {src:'assets/slider-image-6.jpg',height:200,width:120},
  {src:'assets/slider-image-7.jpg',height:200,width:180},
  {src:'assets/slider-image-8.jpg',height:200,width:180},
  {src:'assets/slider-image-9.jpg',height:200,width:220}
];


const imageContainer = $(".img_row_images");
const imageContainer2 = $(".img_btn_row_images");
$.each([imageContainer,imageContainer2], (index, element) => {
  const imageContainerClinetRect = element.get(0).getBoundingClientRect();
  let imgTop = imageContainerClinetRect.top;
  let imgLeft = imageContainerClinetRect.right;
  $.each(images, (index, value) => {
    const img = $(`<img src="${value.src}" height="${value.height}" width="${value.width}" alt="">`)
    img.css({
      'position' : 'absolute',
      'top' : imgTop,
      'left' : imgLeft - value.width
    });
    element.append(img);
    imgLeft -= value.width + 10 ;
  });
});

imageContainer.find('img:last').is(':animated')

$('#left').on( "click", ()=>{
  if(imageContainer.children().first().is(':animated'))return
  const popImage = images.pop()
  images.unshift(popImage);
  images = [...images];
  const moveBy = images[0].width + 10;
  $.each([imageContainer,imageContainer2], (index, element) => {
    element.find('img:last').remove();
    $.each(element.children(), function (index, value){
      $(this).animate({
        left: Math.round($(this).position().left - moveBy),
      }, "ease");
    });
  });
  $.each([imageContainer,imageContainer2], (index, element) => {
    const lastImage = images.at(0);
    const firstImage = element.children().first();
    const lastElementPositionRight = firstImage.position().left + 10 + firstImage[0].width - moveBy;
    const lastElementPositionTop = element.children().first().position().top;
    const img = $(`<img src="${lastImage.src}" height="${lastImage.height}" width="${lastImage.width}" alt="">`)
    .hide()
    .css({
      'position' : 'absolute',
      'top' : lastElementPositionTop,
      'left' : lastElementPositionRight
    })
    .fadeIn("slow");
    element.prepend(img);
  });
})
.on('mouseenter', function() {
  $(this).css({ 'border': '1px solid #dddddd'});
  $('#left img').attr('src', 'assets/arrow-gray-left.png');
})
.on('mouseleave', function() {
  $(this).css({ 'border': '1px solid #134880'});
  $('#left img').attr('src', 'assets/arrow-blue-left.png');
});


$('#right').on( "click", ()=>{
  if(imageContainer.children().first().is(':animated'))return
  const shiftImage = images.shift();
  images.push(shiftImage);
  images = [...images];
  const moveBy = images[images.length-1].width;
  $.each([imageContainer,imageContainer2], function(index, element) {
    const removeElement = element.find('img:first');
    $.each(element.children(), function (index, value){
        $(this).animate({
          left: Math.round($(this).position().left + moveBy + 10),
        }, "ease", function(){
          removeElement.fadeOut(500,function() {$(this).remove()});
        });
      });
      const lastImage = images[images.length - 1];
      const firstImage = element.children().last();
      const lastElementPositionRight = firstImage.position().left - lastImage.width + moveBy - 10;
      const lastElementPositionTop = element.children().last().position().top;
      const img = $(`<img src="${lastImage.src}" height="${lastImage.height}" width="${lastImage.width}" alt="">`);
      img.css({
        'position' : 'absolute',
        'top' : lastElementPositionTop,
        'left' : lastElementPositionRight
      });
      element.append(img).fadeIn("slow");
  })
})
.on('mouseenter', function() {
  $(this).css({ 'border': '1px solid #dddddd'});
  $('#right img').attr('src', 'assets/arrow-gray-right.png');
})
.on('mouseleave', function() {
  $(this).css({ 'border': '1px solid #134880'});
  $('#right img').attr('src', 'assets/arrow-blue-right.png');
});