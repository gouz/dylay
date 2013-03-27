/**
 * Copyright (c) 2012 Sylvain Gougouzian (sylvain@gougouzian.fr) MIT
 * (http://www.opensource.org/licenses/mit-license.php) licensed. GNU GPL
 * (http://www.gnu.org/licenses/gpl.html) licensed.
 */
jQuery(function($) {
    $.fn.dylay = function(selector, speed) {
        var el = new Array();
        this.each(function(i) {
            el[i] = new $dylay(this, selector, speed);
        });
        return (el.length == 1 ? el[0] : el);
    };
    $.dylay = function(e, s, v) {
        this.$e = $(e);
        this.v = v;
        this.s = s;
        this.eW = $(e).css('position', 'relative').data({
            'by': 'dylay',
            'way': 'asc'
        }).width();
        $(this.s, this.$e).each(function() {
            $(this).data('dylay', $(this).text());
        });
        var t = this;
        $(window).resize(function() {
            t.eW = t.$e.width();
            t.position();
        });
        this.position();
    };
    var $dylay = $.dylay;
    $dylay.fn = $dylay.prototype = {
        dylay: '1.1'
    };
    $dylay.fn.extend = $dylay.extend = $.extend;
    $dylay.fn.extend({
        position: function() {
            var $s = $(this.s, this.$e).not('.dylay'),
                len = $s.length, x = 0, i, Ws = [], mh = 0, z;
            for (i = 0; i < this.eW; i++)
				Ws[i] = 0;
            for (i = 0; i < len; i++) {
				var $this = $s.eq(i),
                    w = $this.outerWidth(true),
                    h = $this.outerHeight(true),
                    j, y = 0;
                if ($this.data('dylay') == undefined) $this.data('dylay', $this.text())
				_x = 0;
				_y = mh;
				for (_i = 0; _i < this.eW; _i++) {
					if (Ws[_i] < _y) {
						_y = Ws[_i];
						if (_i + w <= this.eW && Ws[_i] >= Ws[_i + w])
							_x = _i;
					}
				}
				x = _x;
				for (j = x; j < x + w; j++)
					if (Ws[j] > y) y = Ws[j];
                z = y + h;
                for (j = x; j < x + w; j++)
					Ws[j] = z;
                if (mh < z) mh = z;
                $this.css('position', 'absolute').stop().animate({
                    left: x,
                    top: y
                }, this.v);
            }
			this.$e.height(mh);
        },
        filter: function(s) {
            $(this.s, this.$e).show().removeClass('dylay').not(s).hide().addClass('dylay');
            this.position();
        },
        reverse: function() {
            this.sort(this.$e.data('by'), this.$e.data('way') == 'asc' ? 'desc' : 'asc');
        },
        sort: function(by, way) {
            if (by == undefined) by = 'dylay';
            if (way == undefined) way = 'asc';
            this.$e.data({
                'by': by,
                'way': way
            });
            $(this.s, this.$e).sort(function(a, b) {
                if (way == 'asc') if ($(a).data(by) > $(b).data(by)) return 1;
                else return -1;
                else if ($(a).data(by) < $(b).data(by)) return 1;
                else return -1;
            }).appendTo(this.$e);
            this.position();
        }
    });
}); 