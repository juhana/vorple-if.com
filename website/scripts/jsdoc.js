"use strict";

const jsdoc2md = require( "jsdoc-to-markdown" );
const fs = require( "fs" );
const path = require( "path" );

const inputDir = path.resolve( __dirname, "../../../vorple/src/" );
const outputFile = path.resolve( __dirname, "../../docs/js-api.md" );

let output = "";

fs.readdir( inputDir, ( err, files ) => {
    Promise.all( files.map( file => {
        console.log( `Rendering ${file}...` );
        return jsdoc2md.render({
            files: path.resolve( inputDir, file ),
            "no-gfm": true
        });
    }) ).then( result => {
        console.log( `Writing output to ${outputFile}...` );

        fs.writeFile(
            outputFile,
            result.filter( api => api.length > 0 ).join( "\n<hr>\n" ),
            () => console.log( "Done." )
        );
    });
});