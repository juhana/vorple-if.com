jQuery( function( $ ) {
    var chosenTab;

        // the containers must be cached because of hash change scroll disabling later
    var $inform6Id = $( '#inform6' ),
        $inform7Id = $( '#inform7' );

    var saveChosenTab = function() {
        if( window.localStorage ) {
            localStorage.setItem( 'tab', chosenTab );
        }
    };

    var chooseTab = function( animate ) {
        if( !animate ) {
            $.fx.off = true;
        }

        var $i6Content = $( '.i6Content' ).add( $inform6Id ),
            $i7Content = $( '.i7Content' ).add( $inform7Id ),
            $informContent = $( '.informContent' ),     // content common for I6 & I7
            $i6Tab = $( '#inform6Tab' ),
            $i7Tab = $( '#inform7Tab' );

        $( '.tab' ).removeClass( 'active' );

        switch( chosenTab ) {
            case 'inform6':
                $i7Content.slideUp();
                $i6Content.slideDown();
                $informContent.slideDown();
                $i6Tab.addClass( 'active' );
                break;

            case 'inform7':
                $i6Content.slideUp();
                $i7Content.slideDown();
                $informContent.slideDown();
                $i7Tab.addClass( 'active' );
                break;
        }

        $.fx.off = false;

        saveChosenTab();
    };

    if( window.location.hash ) {
        if( window.location.hash.toLowerCase() === '#inform6' || window.location.hash.toLowerCase() === '#inform7' ) {
            chosenTab = window.location.hash.toLowerCase().substr( 1 );
        }
        else {
            // switch to correct tab if the anchor is inside
            // their content
            var $parent = $( window.location.hash ).closest( '#inform6, #inform7' );

            if( $parent.length > 0 ) {
                chosenTab = $parent.attr( 'id' );
            }
        }
    }

    if( !chosenTab && window.localStorage ) {
        chosenTab = localStorage.getItem( 'tab' );
    }

    // default to I7
    if( !chosenTab || chosenTab.indexOf( 'inform' ) === -1  ) {
        chosenTab = 'inform7';
    }

    // "click" on the tab
    chooseTab( false );

    $( '.tab a' ).on( 'click', function( e ) {
        var hash = $( this ).attr( 'href' );

        e.preventDefault();

        // disabling the browser's scroll-to-hash functionality
        $( hash ).attr( 'id', '' );
        window.location.hash = hash;
        $( hash ).attr( 'id', hash.substr( 1 ) );
    });

    // set page status on hash change
    $( window ).on( 'hashchange', function() {
        switch( window.location.hash.toLowerCase() ) {
            case '#inform6':
                chosenTab = 'inform6';
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