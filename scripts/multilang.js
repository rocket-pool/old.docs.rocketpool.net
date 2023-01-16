// Get CLI flag
const [ nodepath, scriptpath, flag ] = process.argv

// If this is a multilang path update, run it
const { create_file_paths_if_needed } = require( './modules/multilang_paths' )
if( flag == '--missing' ) return create_file_paths_if_needed()
