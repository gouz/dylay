! function($) {
	var DyLay = function(content, opts) {
		this.opts = opts;
		this.$element = $(content).css('position', 'relative');
		this.items = $(opts.selector, this.$element).css({
			position : 'absolute',
			top : 0,
			left : 0
		}).data('dylay', 1);
		var t = this;
		$(window).on('resize', function () {
			t.position();
		}).trigger('resize');
	};
	DyLay.prototype = {
		_max: function (x, w, hs) {
			var i = w, j = hs[x];
			while (i--) if (j < hs[x + i]) j = hs[x + i];
			return j;
		},
		position: function () {
			var w = this.$element.width(), is = this.items.filter(function () { return $(this).data('dylay') }), l = is.length, i = w + 1, hs = [], j, _x = 0;
			while (i--) hs[i] = 0;
			for (i = 0; i < l; i++) {
				var $i = is.eq(i), $iw = parseInt($i.outerWidth(true)), $ih = parseInt($i.outerHeight(true)), x = 0, j = 0, k, h = 9e9, _h = h;
				while (j < w) {
					k = j;
					while (k++ <= (j + $iw))
						if (k + $iw < w) {
							_h = this._max(k, $iw, hs) + $ih;
							if (h > _h) {
								h = _h;
								x = k;
							}
						}
					j+= $iw;
				}
				$i.stop().animate({ left: x, top: h - $ih }, this.opts.speed, this.opts.easing);
				j = $iw;
				while (j--) hs[j + x] = h;
			}
			this.$element.height(Math.max.apply(Math, hs));
		},
		filter: function (selector) {
			this.items.data('dylay', 1).show().not(selector).data('dylay', 0).hide();
			this.position();
		},
		sort: function (by, way) {
			if (by == undefined) by = 'text';
      if (way == undefined) way = 'asc';
      this.items.sort(function(a, b) {
      		var $a, $b;
      		if (by != 'text') {
      			$a = $(a).data(by);
      			$b = $(b).data(by);
      		} else {
      			$a = $(a).text();
      			$b = $(b).text();
      		}
          if (way == 'asc') 
          	if ($a > $b) return 1;
          	else return -1;
          else 
          	if ($a < $b) return 1;
          	else return -1;
      }).appendTo(this.$element);
      this.position();
		}
	};
	$.fn.dylay = function(option, p1, p2) {
		return this.each(function() {
			var $this = $(this), 
				data = $this.data('dylay'), 
				opts = $.extend({}, $.fn.dylay.defaults, $this.data(), typeof option == 'object' && option);
			if (!data)
				$this.data('dylay', ( data = new DyLay(this, opts)));
			if ( typeof option == 'string')
				data[option](p1, p2);
		})
	};
	$.fn.dylay.defaults = {
		speed : 500,
		selector: '>li',
		easing: ''
	};
}(window.jQuery);