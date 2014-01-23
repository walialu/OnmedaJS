/**
 * This function create an instance of an autoSuggest box.<br/>
 * The box will send an ajax request after a brief delay to fetch <br/>
 * results based on the input,<br/>
 * then it'll render the fetched results in a list under the input field.<br/>
 * You can select the suggested results from the list by <br/>
 * navigating with the up and down keys and pressing enter.<br/>
 * The server needs to respond with a valid json like so:<br/>
 * <code>{success: true, items: [{displayText: "&ltstrong&gt;moo&lt;/strong&gt; 2", value: "moo 2"},{displayText: "&lt;strong&gt;moo&lt;/strong&gt; 3", value: "moo 3"}]}</code><br/>
 * or if no matching elements could be found:<br/>
 * <code>{success:false}</code><br/>
 * The autoSuggest textfield needs to be inside a form element,<br/>
 * because a keypress enter event without a selected element from<br/>
 * the autoSuggest list will bubble up until it finds a form and then<br/>
 * submit it.
 * @function
 * @param {Object} opts Configuration object.
 * @param {String} opts.id Id of the textfield where you want the autoSuggest box being bound to.
 * @param {Number} [opts.delay=500] Time in Milliseconds after last keypress before the request is sent to the server.
 * @param {Number} [opts.timeoutInMilliseconds=15000] Time in Milliseconds before
 * suggestbox will be auto-hidden.
 * @param {String} opts.method POST or GET.
 * @param {String} opts.url The URL to query. The [AUTOSUGGEST] part will be automatically replaced by the value of the textfield.
 * @param {String} opts.responseType json or xml.
 * @param {Object} opts.styleConfig Style Configuration object.
 * @param {String} opts.styleConfig.ulClassName The CSS classname that should be appended to the generated ul tag.
 * @constructor
 * @example
 * new onmeda.textfields.autoSuggest({
 *     id: 'SCHNELLSUCHE_WERT',
 *     method: 'GET',
 *     url: '/suche/search_service.php?action='
 *         + 'suggest&resultType=json&q=[AUTOSUGGEST]',
 *     delay: 500,
 *     responseType: 'json',
 *     styleConfig: {
 *         ulClassName: 'autosuggest'
 *     }
 * });
 */
window.onmeda.textfields.autoSuggest = function( opts ) {
	var that = this,
		configuration = opts,
		textfield = opts.textfield,
		activeItem = null,
		timer = null,
		timeout = null,
		list_is_visible = false,
		ac_list = null;

	this.get_ac_list = function () {
		return ac_list;
	};

	this.set_ac_list = function ( l ) {
		ac_list = l;
	};

	this.get_timer = function () {
		return timer;
	};

	this.set_timer = function ( t ) {
		timer = t;
	};

	this.get_textfield = function () {
		return textfield;
	};

	this.set_textfield = function ( node ) {
		textfield = node;
	};

	this.get_configuration = function () {
		return configuration;
	};

	this.set_configuration = function ( cfg ) {
		configuration = cfg;
	};

	this.is_list_visible = function () {
		return list_is_visible;
	};

	this.set_list_is_visible = function ( bool ) {
		list_is_visible = bool;
	};

	this.get_activeItem = function () {
		return activeItem;
	};

	this.set_activeItem = function ( item ) {
		activeItem = item;
	};

	this.get_timeout = function () {
		return timeout;
	};

	this.clear_timeout = function () {
		clearTimeout(timeout);
		timeout = null;
	};

	this.set_timeout = function (t) {
		timeout = t;
	};

	this.modify_timeout = function () {
		var config = this.get_configuration(),
			tms = config.timeoutInMilliseconds,
			that = this;

		//check if timeout is user-defined
		if( !tms ) tms = 15000;

		this.clear_timeout();
		// set timeout
		this.set_timeout(setTimeout(function(){that.clearList();}, tms));
	};

	this.get_selectedItemText = function ( textfield ) {
		var activeItem =  this.get_activeItem();
		if ( !this.is_list_visible() || activeItem === null ) {
			return false;
		}
		return activeItem['data-value'];
	};



	if (opts.timeout) configuration.timeoutInMilliseconds = opts.timeout;



	// disable autocomplete
	textfield.autocomplete = 'off';



	textfield.onblur = function() {
		// maybe we need to hide the box here
		// this.clear(this);
	};



	textfield.onkeypress = this.stopRKey;



	textfield.onkeydown = function ( evt ) {
		if ( !evt ) {
			evt = window.event;
		}
		// if not navigating with key arrow up or down
		if ( !that.keyNavigation( evt, this ) ) {
			// setting default delay
			var delay = 500;
			// getting custom delay
			if ( typeof opts.delay !== 'undefined' ) delay = opts.delay;
			clearTimeout(that.get_timer());
			that.set_timer(false);
			that.set_timer(setTimeout(function(){that.createList(opts);},delay));
		}
	};



	this.createList = function( opts ) {
		// reference node
		var rNode = opts.textfield,
			value =  rNode.value,
			positionInfo = null,
			nNode = null,
			pNode = null,
			qurl = null,
			that = this;

		if (value === '') {

			// clear results
			this.clearList(rNode);

			return;

		}


		// position info
		positionInfo = $( opts.textfield ).offset();


		// new node
		nNode = document.createElement('ul');

		if (opts.styleConfig &&
			opts.styleConfig.ulClassName) {

			nNode.className = opts.styleConfig.ulClassName;

		}


		nNode.style.position = 'absolute';
		nNode.style.zIndex = '99999';
		nNode.style.top = Math.round(positionInfo.top+onmeda.utils.get_height(rNode))+'px';
		nNode.style.left = Math.round(positionInfo.left)+'px';
		nNode.style.width = $( opts.textfield ).width()+'px';


		// parent node
		pNode = opts.textfield.parentNode;

		// replace placeholder
		qurl = opts.url.replace("[AUTOSUGGEST]", onmeda.utils.encode.utf8(value));

		new onmeda.ajax.request({
			method: opts.method,
			url: qurl,
			params: opts.param,
			success: function(r) {
				var json = onmeda.utils.decode.json(r);
				that.timer = false;

				for (var i=0;i<json.items.length;i++) {
					// append new node items
					var lNode = document.createElement('li');
					lNode['data-value'] = json.items[i].value;
					lNode.innerHTML = json.items[i].displayText;

					lNode.onclick = function () {
						rNode.value = this['data-value'];
						that.clearList();
						that.timer = false;
						rNode.focus();
					};

					nNode.appendChild(lNode);
					/**
					 * TODO: fix this timeout issue
					 */
					that.modify_timeout();
				}
				// clear results
				that.clearList();
				// add new results
				that.set_ac_list(nNode);
				that.set_list_is_visible(true);
				document.body.appendChild(nNode);

			},
			failure: function(r) {
				var json = onmeda.utils.decode.json(r),
				timer = that.get_timer();
				timer = false;
				if (json.message &&
					json.message == 'No matching items found!') {
					// clear results
					that.clearList();
				}
			}
		});
	};



	this.clearList = function ( opts ) {
		var acList = this.get_ac_list();
		if (!acList) return;
		acList.parentNode.removeChild(acList);
		this.set_ac_list(null);
		this.set_activeItem(null);
		this.set_list_is_visible(false);
	};


	this.keyNavigation = function ( evt, textfield ) {

		var that = this,
			keyCode = evt.keyCode;

		that.modify_timeout();

		// Escape key pressed - hide/destroy the suggest-box
		if (keyCode === 27) {
			this.clearList();
			return true;
		}

		// enter pressed
		if (keyCode === 13) {

			var value = this.get_selectedItemText( textfield );

			if (value) {

				textfield.value = value;

				this.clearList( textfield );
				clearTimeout(this.get_timer());
				this.set_timer(null);
				return true;
			// submit form
			} else {

				var pNode = textfield.parentNode;

				while (pNode.nodeName.toLowerCase() != 'form') {
					pNode = pNode.parentNode;
				}

				this.clearList(textfield);

				clearTimeout(this.get_timer());

				this.set_timer(null);

				var config = this.get_configuration(),
					onsubmit = config.onsubmit;

				if (typeof onsubmit === 'function') {
					onsubmit(); return true;
				} else {
					// we are submitting the form now
					pNode.submit(); return true;
				}
			}

		}

		//up or down arrows used and list is visible
		if ( ( keyCode === 38 || keyCode === 40 ) && this.is_list_visible() ) {
			if ( keyCode === 38 ) {
				this.moveSelection('up');
			} else {
				this.moveSelection('down');
			}
			return true;
		} else {
			return false;
		}
	};



	this.moveSelection = function ( dir ) {
		if ( !this.is_list_visible() ) return;
		var list = this.get_ac_list(),
			items = list.children,
			length = items.length,
			activeNode = null,
			nextActiveNode = null,
			i = 0;

		for ( ; i < length; i++ ) {
			if ( items[i].className=='is--active' ) {
				activeNode = items[i];
				if ( dir === 'up' ) {
					if ( activeNode.previousSibling !== null ) {
						nextActiveNode = items[i].previousSibling;
					} else {
						nextActiveNode = items[length-1];
					}
				}
				else {
					if (activeNode.nextSibling !== null) {
						nextActiveNode = items[i].nextSibling;
					}
					else {
						nextActiveNode = items[0];
					}
				}
			}
		}

		if ( activeNode !== null && nextActiveNode !== null ) {
			activeNode.className='';
			nextActiveNode.className='is--active';
			this.set_activeItem(nextActiveNode);
		// fallback if nothing is selected
		}
		else {
			this.resetActiveItems();
			items[0].className = 'is--active';
			this.set_activeItem( items[0] );
		}
		var timeout = this.get_timeout();
		clearTimeout(timeout);
		timeout = null;

		this.modify_timeout();
	};



	this.resetActiveItems = function () {
		if ( !this.is_list_visible() ) return;
		var list = this.get_ac_list(),
			items = list.children,
			length = items.length,
			i = 0;

		for ( ; i < length; i++ ) {
			items[i].className='';
		}
		this.set_activeItem(null);
	};



	this.stopRKey = function ( evt ) {
		evt = (evt) ? evt : ((event) ? event : null);
		var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
		if ((evt.keyCode == 13) && (node.type=="text"))  {
			return false;
		}
	};
};
