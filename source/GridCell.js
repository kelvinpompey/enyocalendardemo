enyo.kind({
    name: 'GridCell',
    classes: 'grid-cell',
    handlers: {
    	"ondragover": "dragOver", 
    	"onleave": "leave"
    }, 
    published: {
        'index': 0
    }, 

    dragOver: function (sender, event) {
        this.addClass('selected');
        //return true; 
    }, 

    leave: function(sender, event) {
        this.removeClass('selected'); 
        return true; 
    }

});