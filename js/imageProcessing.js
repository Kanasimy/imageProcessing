/**
 * Created by uzich on 28.05.14.
 */
(function( $ ){
    var methods = {
        imageProcessing : function(img,self) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for(var y = 0; y < imgPixels.height; y++){
                for(var x = 0; x < imgPixels.width; x++){
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i]*1 + imgPixels.data[i + 1]*1 + imgPixels.data[i + 2]*1) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            console.log(self);
            $(self).parent().html('<img src="'+canvas.toDataURL()+'"/>');

            return canvas.toDataURL();
        },
        getImg : function(self) {
            var img = new Image();
            img.src = self.attr('src');
            img.onload = img.onerror = function() {
                if (!this.executed) {
                    this.executed = true;
                    methods.imageProcessing(img,self);
                }
            };
        },
        init : function() {
           return this.each(function(){
               self = $(this);
               methods.getImg(self);
            });

        }
    };

    $.fn.imageProcessing = function(method) {
        var self;
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод ' + method + ' не существует в плагине jQuery.imageProcessing' );
        }
    };
    $('img').imageProcessing();
})( jQuery );

