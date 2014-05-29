/**
 * Created by uzich on 28.05.14.
 */
(function( $ ){
    var methods = {
        imageProcessing : function(img) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for(var y = 0; y < imgPixels.height; y++){
                for(var x = 0; x < imgPixels.width; x++){
                    var i = (y * 4) * imgPixels.width + x * 4;
                    var avg = (imgPixels.data[i]*2 + imgPixels.data[i + 1]*2 + imgPixels.data[i + 2]*1.5) / 3;
                    imgPixels.data[i] = avg;
                    imgPixels.data[i + 1] = avg;
                    imgPixels.data[i + 2] = avg;
                }
            }
            ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
            console.log(canvas.toDataURL());

           // $('.profile #social_buttons i').css('backgroundImage','url('+canvas.toDataURL()+')');

            return canvas.toDataURL();
        },
        getImg : function(src) {
            var img = new Image();
            img.src = src;
            img.onload = img.onerror = function() {
                if (!this.executed) {
                    this.executed = true;
                    methods.imageProcessing(img);
                }
            };
        },
        init : function() {
            var src = '/res/images/login/social.png';
            methods.getImg(src);
        }
    };

    $.fn.imageProcessing = function(method) {
        // логика вызова метода
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод ' +  methods + ' не существует для jQuery.grey' );
        }
    };

})( jQuery );

$('.profile #social_buttons li').imageProcessing();