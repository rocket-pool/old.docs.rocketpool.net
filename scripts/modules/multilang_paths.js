const fs = require( 'fs' )
const Walk = require( '@root/walk' )
const path = require('path')

const source_directory = path.normalize( `${ __dirname }/../../src/` )

async function create_file_paths_if_needed() {

    

    // Get configured languages
    const { locales } = require( `${ __dirname }/../../src/.vuepress/config.js` )
    const language_slugs = Object.keys( locales ).filter( language_slug => language_slug != '/' )

    // Get full directory structure of english docs
    const english_files = []
    await Walk.walk( source_directory, async ( err, pathname, dirent ) => {

        // console.log( pathname )
        if( err ) console.warn( "fs stat error for %s: %s", pathname, err.message )

        // Skip config directories
        if( pathname.includes( '.vuepress' ) || pathname.includes( 'config' ) ) return

        // Skip developer docs
        if( pathname.includes( 'developers' ) ) return

        // Skip language directories
        if( pathname.includes( language_slugs ) ) return

        // Add path to list it it is a file
        if( !dirent.isDirectory() && pathname.includes( '.md' ) ) return english_files.push( pathname )

    } )

    // Check which languages have missing files
    language_slugs.map( slug => {

        const missing_files = []
        for( let index = 0; index < english_files.length; index++ ) {

            const file_path = english_files[ index ]
            const localized_path = path.normalize( file_path.replace( source_directory, `${ source_directory }${ slug }` ) )
            const path_exists = fs.existsSync( localized_path )

            // If path exists, stop
            if( path_exists ) return

            // If path does not exist, make a file marked as missing
            const directory_name = path.dirname( localized_path )
            const file_name = path.basename( localized_path )
            const english_file_content = fs.readFileSync( file_path )
            fs.mkdirSync( directory_name, { recursive: true } )
            fs.appendFileSync( `${ directory_name }/.TODO.${ file_name }`, english_file_content )
            
        }


    } )

}



module.exports = {
    create_file_paths_if_needed
}