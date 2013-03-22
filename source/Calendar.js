enyo.kind({
    name: 'Calendar',
    kind: 'FittableColumns',
    hours: ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"],
    week: [],
    appointments: [],
    destCell: '',
    handlers: {
        'ondrag': 'dragging',
        'ondragfinish': 'dragFinished',
        'ondragover' : 'dragOver'        
    },
    create: function () {
        this.inherited(arguments); 
        var today = moment();
        var self = this;

        // generate the dates for today and the following 6 days 

        this.week = _.range(7).map(function (n) {
            var date = moment(today).add('days', n);
            self.$.week.createComponent({ content: moment(date).format('ddd Do MMM'), classes: 'day'});
            return date; 
        });        
        
        // 8 hours in a work day so for each 
        // hour generate a random boolean value to
        // represent whether or not there is an appointment
        // at that day and time 

        _.range(8).map(function (hour) {
            _.each(self.week, function (day) {
                self.appointments.push(_.random(1)); 
            });
        }); 
        
        // render the appointments based on the appointments data

        _.each(this.appointments, function (n, index) {
            self.$.grid.createComponent({kind: 'GridCell', index: index, content: n === 1 ? 'YES' : '' });
        });

        console.log(this.appointments);
    },
    components: [
        {kind: 'enyo.DragAvatar', components:[]},
        { kind: 'List', style: 'top: 19px;width: 10%;text-align:right', onSetupItem: 'setupList', count: 8, components:[
            { name: 'listItem', style: 'height: 24px' }
        ]},
        { kind: 'FittableRows', components: [
            { name: 'week', components: [

            ]},
            { name: 'grid', style: 'width:637px' }
        ]}
    ],

    setupList: function (sender, event) {
        // render hours in a day 
        var hour = this.hours[event.index];
        this.$.listItem.setContent(hour); 
    },

    updateGridAtIndices: function (indices) {
        var self = this;
        _.each(indices, function (index) {
            self.$.grid.children[index].setContent(self.appointments[index] === 1 ? 'YES' : ''); 
        });
    },

    dragging: function (sender, event) {
        this.$.dragAvatar.drag(event); 
    },
    
    dragFinished: function (sender, event) {
        this.$.dragAvatar.hide();
        this.appointments[this.destCell.index] = this.appointments[event.originator.index];
        this.appointments[event.originator.index] = 0;
        console.log('drag finished at ', this.destCell, this.destCell.index, this.appointments);
        this.updateGridAtIndices([this.destCell.index, event.originator.index]); 
    }, 

    dragOver: function(sender, event) {
        this.destCell = event.originator; 
    }


});