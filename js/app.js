var my_notes = [{
  "id": 1,
  "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#d59201"
},
{
  "id": 2,
  "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#594953"
},
{
  "id": 3,
  "text": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#320000"
},
{
  "id": 4,
  "text": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#641001"
},
{
  "id": 5,
  "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#d39310"
},{
  "id": 6,
  "text": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  "color": "#f38489"
}];

var Note = React.createClass({
  render: function() {
    var styles = {
      background: this.props.color
    };
    return <div className="note" style={styles}>
    {this.props.children}
    <span className="delete_note" onClick={this.props.onDelete}> x </span>
     </div>
  }
});

var NoteEditor = React.createClass({
  getInitialState: function(){
    return {
      text: ''
    }
  },
  handleTextChange: function(event){
    this.setState({
      text: event.target.value
    })
  },
  handleAddNote: function(){
    var newNote = {
      text: this.state.text,
      id: new Date(),
      color: 'yellow'
    };
    this.props.onNoteAdd(newNote);
    this.setState({text: ''})
  },
  render: function() {
    return (
      <div className="noteEditor">
        <textarea
        placeholder="Enter your note.."
        rows={5}
        className="textarea"
        onChange={this.handleTextChange}
        value={this.state.text}
        />
        <button className="add_btn" onClick={this.handleAddNote}>Add</button>
      </div>)
  }
});

var NotesGrid = React.createClass({
  componentDidMount: function(){
    var grid = this.refs.notes;
    this.msnry = new Masonry( grid, {
      // options
      itemSelector: '.note',
      columnWidth: 20,
      gutter: 10
});
  },

  componentDidUpdate: function(prevProps){
    if(this.props.notes.length !== prevProps.notes.length){
      this.msnry.reloadItems(),
      this.msnry.layout()
    }
  },
  render: function() {
    var onNoteDelete = this.props.onNoteDelete;
    return (
      <div className="notesGrid" ref="notes">
        {
          this.props.notes.map(function(note){
              return <Note key={note.id}
              color={note.color}
              onDelete={onNoteDelete.bind(null, note)}
              > {note.text} </Note>
          })
        }
      </div>);
  }
});

var NotesApp = React.createClass({
  getInitialState: function(){
    return {
      notes: my_notes
    }
  },
  componentDidMount: function(){
    var localDate = JSON.parse(localStorage.getItem('notes'));
    if(localDate){
      this.setState({notes: localDate})
    }
  },
  componentDidUpdate: function(){
    this._updateLocalStorage();
  },
  handleDeleteNote: function(note){
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function(note){
      return note.id !== noteId;
    });
    this.setState({notes: newNotes})
  },
  handleAddNote: function(newNote){
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({
      notes: newNotes
    })
  },
  _updateLocalStorage: function(){
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  },
  render: function () {
    return (
      <div className="notesApp">
      Note Application
        <NoteEditor onNoteAdd={this.handleAddNote}/>
        <NotesGrid notes={this.state.notes} onNoteDelete={this.handleDeleteNote}/>
      </div>
    )
  }
});

ReactDOM.render(<NotesApp />,
                document.getElementById('content'));
