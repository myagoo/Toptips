(function($, document, undefined) {
    $.fn.toptips = function(params) {

        var opt = $.extend({
            delay: 100,
            arrowWidth: 3,
            borderWidth: 3,
            width: 'auto',
            borderColor: 'grey',
            background: 'white'
        }, params);

        var position = function($tt, $el) {
            var offset = $el.offset();
            var $ar = $tt.find('.toptip-arrow');
            var $ct = $tt.find('.toptip-content');
            var position = {
                left: offset.left + $el.outerWidth() / 2 - $tt.outerWidth() / 2,
                top: offset.top - $tt.outerHeight() - opt.arrowWidth
            };
            if (position.top < $(document).scrollTop()) {
                position.top = offset.top + $el.outerHeight() + opt.arrowWidth;
                $ar.css({
                    top: '',
                    bottom: '100%',
                    borderTopWidth: 0,
                    borderBottomWidth: opt.arrowWidth + opt.borderWidth
                });
            } else {
                $ar.css({
                    top: '100%',
                    bottom: '',
                    borderTopWidth: opt.arrowWidth + opt.borderWidth,
                    borderBottomWidth: 0
                });
            }
            $ar.css('left', $ct.innerWidth() / 2 - $ar.outerWidth() / 2);
            return $tt.offset(position);
        }

        var create = function($element) {
            var $arrow = $('<div class="toptip-arrow"></div>').css({
                position: 'absolute',
                width: 0,
                height: 0,
                border: 'solid ' + opt.borderColor,
                borderLeft: (opt.borderWidth + opt.arrowWidth) + 'px solid transparent',
                borderRight: (opt.borderWidth + opt.arrowWidth) + 'px solid transparent'
            });

            var $content = $('<div class="toptip-content">' + $element.data('toptip') + '</div>').css({
                position: 'relative',
                background: opt.background,
                margin: opt.borderWidth,
                borderRadius: '4px',
                padding: '4px'
            });

            var $toptip = $('<div class="toptip-wrapper"></div>').css({
                position: 'absolute',
                zIndex: 9999,
                display: 'none',
                borderRadius: '5px',
                background: opt.borderColor,
                width: opt.width
            }).hover(function() {
                $(this).stop(true, true).fadeIn();
            }, function() {
                $(this).delay(opt.delay).fadeOut();
            });
        
            return $toptip.append($content.append($arrow));
        }

        return this.each(function() {
            var $toptip;
            $(this).hover(function() {
                if ($toptip == undefined) {
                    $toptip = create($(this));
                }
                position($toptip.appendTo('body').stop(true, true).fadeIn(), $(this));
            }, function() {
                $toptip.delay(opt.delay).fadeOut();
            });
        });
    }
})(jQuery, document);