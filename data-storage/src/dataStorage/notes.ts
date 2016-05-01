/// <reference path='../../typings/main.d.ts' />

import Notes_View = require("dataStorage/notesView");

$(() => {    
	Notes_View.NotesView.enhance(Notes_View.NotesView, $("#vss-extension"), {		          		
	});
});