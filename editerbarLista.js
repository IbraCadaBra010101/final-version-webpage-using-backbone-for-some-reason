const notes = [];

const ListModel = Backbone.Model.extend({
    defaults: {
        editEnabled: false,
        note: null,
    },
    editNote: function () {
        console.log('testing edit note');
        this.set({
            editEnabled: true,
            note: this.get('note'),
        })
    },
    saveNote: function () {
        this.set({
            editEnabled: false,
            note: this.get('note'),
        });
    },
});
const ListModelCollection = Backbone.Collection.extend({
    model: ListModel
});

let notesCollection = new ListModelCollection(notes);

const TodoNotesAppView = Backbone.View.extend({
    tag: 'li',
    initialize() {
        this.listenTo(this.model, 'change', this.render)
    },
    render: function () {
        let note = this.model.get('note');

        let edit = `<button type="button" class="btn btn-primary edit-btn">Edit Note</button>`;
        let rm = `<button type="button" class="btn btn-danger rm-note">Remove Note</button>`; //HERE!
        let editClicked = this.model.get('editEnabled');
        let container;
        if (editClicked) {
            // <input class="editNote" value="${note}"/>
            let editNoteSpan = `<input type="text" class="form-control editNote" placeholder="Recipient's username"
                        aria-label="Recipient's username" aria-describedby="basic-addon2" value="${note}">`;

            let saveNoteSpan = `<button class="btn btn-success saveNote" type="button">Save Changes</button>`;
            container = `${editNoteSpan} ${saveNoteSpan}${rm}`;

        } else {
            let note = this.model.get('note');
            container = `${note} ${edit}${rm}`;

        }

        this.$el.html(container);
    },
    events: {
        "click .edit-btn": 'runEdit',
        "click .saveNote": 'runSave',
        "click .rm-note": 'rm',
        "change .editNote": 'editNote'
    },
    rm: function () {
        notesCollection.remove(this.model);
    },
    runEdit: function () {
        this.model.editNote();
    },
    runSave: function () {
        this.model.saveNote();
    },
    editNote: function (event) {
        this.model.set({note: event.target.value});

    }
});
const NoteView = Backbone.View.extend({
    model: this.model,
    initialize: function () {
        this.listenTo(this.collection, 'update', this.render);
        this.listenTo(this.collection, 'change', this.render);
    },
    render: function () {
        let ViewsRootDiv = this.$el;
        let ListHTML = $(`<ul class="list-group"></ul>`);

        this.collection.forEach(function (notes) {
            let eachNoteView = new TodoNotesAppView({model: notes});
            eachNoteView.render();
            ListHTML.append(eachNoteView.$el);

        });
        //  <input class="userinput" type="text" name="lname">
        ViewsRootDiv.html('');
        ViewsRootDiv.append(ListHTML);
        let InputForm = `<br><input type="text" class="form-control userinput" placeholder="Recipient's username" 
                                        aria-label="Recipient's username" aria-describedby="basic-addon2"> <br>
                                        <button class="btn btn-success add-item-btn" type="button">Add Item</button>`;
        ViewsRootDiv.append(InputForm);
    },
    events: {
        "click .add-item-btn": 'addOneNote',
        "change .userinput": 'targetInputChange'
    },
    addOneNote: function () {
        let model = new ListModel({
            note: this.form.note,
        });
        this.collection.add(model);
    },
    form: {note: ''},
    targetInputChange: function (event) {
        this.form.note = event.target.value;

    }
});

$(document).ready(function () {
    let noteListView = new NoteView({
        collection: notesCollection,
        el: '#random-div'
    });
    noteListView.render();
});






