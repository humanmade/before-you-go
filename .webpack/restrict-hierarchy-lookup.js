/**
 * This module is a hack to prevent Node from traversing up the directory tree
 * to load modules from parent folders' node_modules. This behavior can be nice
 * when expected, but in our case this plugin may be installed within a project
 * which uses similar-enough build tooling higher up in the tree that we really
 * do not want to let Node pick the wrong version of a build dependency. Using
 * this hack restricts Node to only load modules that have been installed within
 * the plugin-specific node_modules folder.
 *
 * Hat-tip https://stackoverflow.com/questions/32455431/
 */
const { Module } = require( 'module' );
const { resolve } = require( 'path' );
const nodeModulePaths = Module._nodeModulePaths;

const projectRootDir = resolve( __dirname, '..' );

Module._nodeModulePaths = function(from) {
    const paths = nodeModulePaths.call( this, from );

    //add your logic here to exclude parent dirs, I did a simple match with current dir
    return paths.filter( ( path ) => path.includes( projectRootDir ) );
};
