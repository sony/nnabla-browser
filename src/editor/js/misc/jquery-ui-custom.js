export default () => {
    $.ui.plugin.add('resizable', 'alsoResizeReverse', {

        start: function() {
            const that = $(this).resizable( 'instance' );
            const o = that.options;

            $(o.alsoResizeReverse).each(function() {
                const el = $(this);
                el.data('ui-resizable-alsoresizeReverse', {
                    width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
                    left: parseInt(el.css('left'), 10), top: parseInt(el.css('top'), 10),
                });
            });
        },

        resize: function(event, ui) {
            const that = $(this).resizable( 'instance' );
            const o = that.options;
            const os = that.originalSize;
            const op = that.originalPosition;
            const delta = {
                    height: (that.size.height - os.height) || 0,
                    width: (that.size.width - os.width) || 0,
                    top: (that.position.top - op.top) || 0,
                    left: (that.position.left - op.left) || 0,
                };

            $(o.alsoResizeReverse).each(function() {
                const el = $(this);
                const start = $(this).data('ui-resizable-alsoresize-reverse');
                const style = {};
                const css = el.parents(ui.originalElement[0]).length ?
                        ['width', 'height'] :
                        ['width', 'height', 'top', 'left'];

                $.each(css, function(i, prop) {
                    const sum = (start[prop] || 0) - (delta[prop] || 0);
                    if (sum && sum >= 0) {
                        style[prop] = sum || null;
                    }
                });

                el.css(style);
            });
        },

        stop: function() {
            $(this).removeData('resizable-alsoresize-reverse');
        },
    });
};
