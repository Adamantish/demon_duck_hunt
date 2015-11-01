
var MyModal = function(title, content, type){
  this.title = title
  this.content = content
  this.render()
}

MyModal.prototype.render = function() {

  // modal goes off bottom of screen with a long description. Would be good to make it scrollable
  var container = document.createElement("div");
  container.setAttribute("class", "modal-background");

  var _this = this
  var modal = document.createElement("div");
  modal.setAttribute("class", "my-modal");
  
 
  var heading = document.createElement('h3');
  heading.innerText = this.title
  var contentEl = document.createElement('div');
  contentEl.innerHTML = this.content

  img = $(contentEl).find('img')
  $(img).on("load",function() {
    $(this).animate({opacity:1})
  })
  modal.appendChild(heading)
  modal.appendChild(contentEl)
  container.appendChild(modal)
  this.el = container
  $("body").append(this.el)

   // $(modal).on("click",function() { 
   //    _this.remove(); 
   //  })

  
  return this.el;

}

MyModal.prototype.remove = function() {

  $(this.el).remove();
  delete this;

}
// MyModal.prototype.

