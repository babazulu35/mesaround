/**
* Mesaround Oriental Div Moves :)
* @author Hakan Hüriyet hakan@brewww.com
* @company Brewww Interactive
* @library Jquery
*/

(function($) {
"use strict"

var Mesaround = function(element,options)
{
  this.element = element;
  this.$element = $(element);
  this.options = options;

}
var defaults = {
  parentToHoverEvent: null,
  translateYdivider: null,
  translateXdivider: null,
  translateDirection: 'follow',
  rotateDegdivider: null,

}

Mesaround.prototype.initialize = function() {
  this.config = $.extend({},this.defaults,this.options);
  this.eventMouseMove();
  this.resetMesaround();
  return this;
};

Mesaround.prototype.getCoordinateX = function(element) {
  return element.pageX;
};
Mesaround.prototype.getCoordinateY = function(element) {
  return element.pageY;
};
Mesaround.prototype.getCoordinateWhitinElement = function(mouseEventCoordinate,elementOffsetCoordinate) {
if(this.config.translateDirection =='opposite')
{

  return elementOffsetCoordinate - mouseEventCoordinate;
}else {
  return mouseEventCoordinate - elementOffsetCoordinate;
  }
};
Mesaround.prototype.calculationResult =function(elementEvent,offset) {
  return this.getCoordinateWhitinElement(this.getCoordinateX(elementEvent),this.getElementOffset(offset).left);
}
Mesaround.prototype.getElementOffset = function(element) {
  var offset = element.offset();
  return offset;
};
Mesaround.prototype.getElementInnerWidth = function() {
  return $(this.config.parentToHoverEvent).innerWidth();

};
Mesaround.prototype.getInlineStyleValue = function(element) {
  var elementInlineStyleValue  = $(element).attr('style');

  console.log(elementInlineStyleValue);

};
Mesaround.prototype.resetMesaround = function(element) {
 var self = this;
  $(this.config.parentToHoverEvent).mouseleave(function(){
    self.$element.removeAttr('style');
  });
};
// Mesaround.prototype.directionConverter = function(direction) {
//   if(direction == 'opposite')
//   {
//     return direction = '-';
//   }else {
//     return direction = '';
//   }
// };
Mesaround.prototype.eventMouseMove = function() {

  var self = this;
  $(this.config.parentToHoverEvent).mousemove(function(event) {
    if(self.config.translateYdivider == null || self.config.translateYdivider == 'undefined') {
      if (self.config.rotateDegdivider == null || self.config.rotateDegdivider == 'undefined') {
        self.$element.css('transform','translateX(' + self.calculationResult(event,self.$element) / self.config.translateXdivider +'px)');
      }
      else {
      self.$element.css('transform','translateX(' + self.calculationResult(event,self.$element) / self.config.translateXdivider +'px) rotate('+ self.calculationResult(event,self.$element) / self.config.rotateDegdivider +'deg)');
      }
    }
    else {
      self.$element.css('transform','translate(' + self.calculationResult(event,self.$element) / self.config.translateXdivider +'px,'+ self.calculationResult(event,self.$element) / self.config.translateYdivider + 'px) rotate('+ self.calculationResult(event,self.$element) / self.config.rotateDegdivider +'deg)');
    }
  })
};

$.fn.mesaround = function(options) {
  return this.each(function () {
    new Mesaround(this,options).initialize();
  });
}

})(jQuery)
