/*
*
* jQuery bTabs Plugin 1.0
*
* Copyright (c) 2014 Bojan Petkovski (object505)
*
* https://github.com/object505/bTabs
*
*/
;(function ( $, window, document, undefined ) {
    
    var pluginName = 'bTabs',
        defaults = {
            startTab: 1,
            activeClass: 'active',
            tabsLinkClass: 'stabs-link',
            tabsContentClass: 'stabs-content',
            fadeSpeed: 700,
            showHash: true
        };
    
    function Plugin( element, options ) {
        this.element = element;
        this.$el = $(element);        
        this.options = $.extend( {}, defaults, options) ;        
        this._defaults = defaults;
        this._name = pluginName;        
        this.init();
    }

    Plugin.prototype.init = function () {        
                    
        var $options    = this.options,
            elem        = this.element,
            $elem       = $(elem),
            hash        = document.location.hash,
            $hash       = hash.replace( /^#/, '' );
            

        if($options.showHash){
            if(hash){
                var elemPosition = $elem.find('#' + $hash).index();                
                if(elemPosition != -1){
                    $options.startTab = elemPosition;
                }
            }
        }

        $elem.children().not('ul').addClass($options.tabsContentClass);
        $elem.find('ul').children().addClass($options.tabsLinkClass);
        $elem.find('.' + $options.tabsContentClass).eq($options.startTab - 1).addClass($options.activeClass);
        $elem.find('.' + $options.tabsContentClass).not('.' + $options.activeClass).hide();
        $elem.find('.' + $options.tabsLinkClass).eq($options.startTab - 1).addClass($options.activeClass);        
        $elem.find('.' + $options.tabsLinkClass).eq($options.startTab - 1).find('a').addClass($options.activeClass);
        
        jQuery('.' + this.options.tabsLinkClass + ' a').on('click', function(event){ 
            //console.log($hash);           
            if( !$(this).hasClass($options.activeClass) ){

                if($options.showHash){
                    document.location.hash = this.hash;
                }
                var target = this.hash.slice(1);
                $elem.find('.' + $options.tabsLinkClass + ' a').removeClass($options.activeClass);
                $elem.find('.' + $options.tabsLinkClass).removeClass($options.activeClass);
                $(this).addClass($options.activeClass);
                $(this).parent().addClass($options.activeClass);
                $elem.find('.' + $options.tabsContentClass).removeClass($options.activeClass).hide();
                $elem.find('#' + target).addClass($options.activeClass).stop().fadeIn($options.fadeSpeed);

            }
            event.preventDefault();
        });     
    };
    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {

            if (!$.data(this, 'plugin_' + pluginName)) {                
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );