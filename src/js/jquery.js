$(function() {
  const imageContainer = $(".img_row_images");
  const imageContainer2 = $(".img_btn_row_images");

  $('#left').on( "click", ()=>{
    if(imageContainer.children().children().first().is(':animated'))return
    $.each([imageContainer,imageContainer2], (index, element) => {
      const lastElement = element.find('img:last')
      const moveBy = lastElement.width()
      let summ = 10
      $.each(element.children().children(), function (index, value){
        $(this)
        .css({
          position: 'absolute',
          left: Math.round(element.children().width())-$(this).width()-summ,
          top: 0
        })
        .animate({
          left: `-=${moveBy}`
        });
        summ+=$(this).width()+10
      }).promise().done(function(){
        lastElement
         .clone()
         .hide()
         .css({
          position: 'absolute',
          left: Math.round(element.children().width())-moveBy,
          top: 0
        })
         .insertBefore(element.find('img:first'))
         .fadeIn("slow");
         lastElement.remove()

      });
    });
  })


  $('#right').on( "click", ()=>{
    if(imageContainer.children().children().last().is(':animated'))return
    $.each([imageContainer,imageContainer2], (index, element) => {
      const firstElement = element.find('img:first')
      const moveBy = firstElement.width()
      let summ = -10
      $.each(element.children().children(), function (index, value){
        $(this)
        .css({
          position: 'absolute',
          left: Math.round(element.children().width())-$(this).width()-summ,
          top: 0
        })
        .animate({
          left: `+=${moveBy}`
        });
        summ+=$(this).width()+10
      }).promise().done(function(){
        firstElement
         .clone()
         .hide()
         .css({
          position: 'absolute',
          left: Math.round(element.children().width())+moveBy,
          top: 0
        })
         .insertAfter(element.find('img:last'))
         .fadeIn(400);
         firstElement.remove()
      });
    });
  });
});