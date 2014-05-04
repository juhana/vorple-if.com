jQuery( function( $ ) {
    var chosenTab;

    var saveChosenTab = function() {
        if( window.localStorage ) {
            localStorage.setItem( 'tab', chosenTab );
        }
    };

    var chooseTab = function( animate ) {
        if( !animate ) {
            $.fx.off = true;
        }

        var $undumContent = $( '#undum, .undumContent' ),
            $informContent = $( '#inform7, .informContent' ),
            $undumTab = $( '#undumTab' ),
            $informTab = $( '#inform7Tab' );

        if( chosenTab == 'inform7' ) {
            $undumContent.slideUp();
            $informContent.slideDown();
            $undumTab.removeClass( 'active' );
            $informTab.addClass( 'active' );
        }
        else {
            $undumContent.slideDown();
            $informContent.slideUp();
            $undumTab.addClass( 'active' );
            $informTab.removeClass( 'active' );
        }

        $.fx.off = false;

        saveChosenTab();
    };

    if( window.location.hash ) {
        if( window.location.hash.toLowerCase() === '#undum' || window.location.hash.toLowerCase() === '#inform7' ) {
            chosenTab = window.location.hash.toLowerCase().substr( 1 );
        }
        else {
            // switch to correct tab if the anchor is inside
            // their content
            var $parent = $( window.location.hash ).closest( '#undum, #inform7' );

            if( $parent.length > 0 ) {
                chosenTab = $parent.attr( 'id' );
            }
        }
    }

    if( !chosenTab && window.localStorage ) {
        chosenTab = localStorage.getItem( 'tab' );
    }

    // default to I7
    if( chosenTab !== 'inform7' && chosenTab !== 'undum' ) {
        chosenTab = 'inform7';
    }

    // "click" on the tab
    chooseTab( false );

    $( '.tab a' ).on( 'click', function( e ) {
        e.preventDefault();
        window.location.hash = $( this ).attr( 'href' );
    });

    // set page status on hash change
    $( window ).on( 'hashchange', function() {
        switch( window.location.hash.toLowerCase() ) {
            case '#undum':
                chosenTab = 'undum';
                break;
            case '#inform7':
                chosenTab = 'inform7';
                break;
            default:
                return;
        }

        chooseTab( true );
    });
});