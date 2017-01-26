
var request = require( 'request' );
var cheerio = require( 'cheerio' );

request( 'http://geolite.com/blue_sapphire.htm', function ( error, response, html ) {
    if ( !error && response.statusCode == 200 ) {
        var dataArray = [ ];
        var $ = cheerio.load( html );
        $( 'td[width="74"]' ).each( function ( i, element ) {
            // a is the actual code - useless
            var data = $( this );
            // gemSizeShape is the item
            var item_id = data.text().replace(/\r\n\s+/gi, "");
            var item = data.next( ).text().replace(/\r\n\s+/gi, " ");
            var description = data.next().next().text().replace(/\r\n\s+/gi, " ");
            var newStatus = data.next().next().next().text().replace(/\r\n\s+/, "");
            var price = data.next().next().next().next().text().replace(/\r\n\s+/gi, "");
            // fatherText is the description, item# new status and the price
            var metadata = {
                item_id: item_id,
                item: item,
                description: description,
                newStatus: newStatus,
                price: price
            };
          
            dataArray.push(metadata);
        });
        console.log(dataArray);

    }
});

