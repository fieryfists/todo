import React, { Component } from 'react';
import './Todo.css';

var TodoBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","task":"Make a application","complete":"false"},
				{"id":"00002","task":"Send results","complete":"false"},
        {"id":"00003","task":"Have a success","complete":"false"}
			],
			text: 'New'
		};
	},
	generateId: function () {
		return Math.floor(Math.random()*90000) + 10000;
	},
	handleNodeEdit: function (nodeId,text) {
		var data = this.state.data;
		console.log(data);
		data = data.filter(function (el) {
			return el.id === nodeId;
		});
		console.log(data);
		document.getElementById('task').value = data[0].task;
		document.getElementById('task').nodeid = data[0].id;
		this.setState({text:'Edit'});
		//console.log(document.getElementById('task').nodeid);
		//this.handleSubmit(document.getElementById('task').value,data[0].id);
		//this.setState({data});
		return;
	},
	handleNodeRemoval: function (nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
	},
	handleSubmit: function (task,nodeId) {
	    console.log(nodeId);
		if ( nodeId != '0'){
			var data = this.state.data;
            data = data.filter(function (el) {
                if (el.id === nodeId){
                    el.task = task
                }
                return el
            });
            this.setState({data});
            document.getElementById('task').nodeid = "0";
			this.setState({text:'New'});
            return;
		} else {

			var data = this.state.data;
			var id = this.generateId().toString();
			var complete = 'false';
			data = data.concat([{id, task, complete}]);
			this.setState({data});
			this.setState({text:'New'});
		}
	},
	handleToggleComplete: function (nodeId) {
		var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({data});
		return;
	},
	render: function() {
	    var text = '1';
		return (
			<div className="well">
				<h1 className="vert-offset-top-0">To do:</h1>
				<TodoList data={this.state.data} editNode={this.handleNodeEdit} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
				<TodoForm onTaskSubmit={this.handleSubmit} filterText={this.state.text}/>
			</div>
		);
	}
});

var TodoList = React.createClass({
	editNode: function (nodeId) {
		this.props.editNode(nodeId);
		return;
	},
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	toggleComplete: function (nodeId) {
		this.props.toggleComplete(nodeId);
		return;
	},
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} editNode={this.editNode} />
			);
		},this);
		return (
			<ul className="list-group">
				{listNodes}
			</ul>
		);
	}
});

var TodoItem = React.createClass({
	editNode: function (e) {
		e.preventDefault();
		this.props.editNode(this.props.nodeId);
		return;
	},
	removeNode: function (e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	toggleComplete: function (e) {
		e.preventDefault();
		this.props.toggleComplete(this.props.nodeId);
		return;
	},
	render: function() {
		var classes = 'list-group-item clearfix';
		if (this.props.complete === 'true') {
			classes = classes + ' list-group-item-success';
		}
		return (
			<li className={classes}>
				{this.props.task}
				<div className="pull-right" role="group">

					<button type="button" className="btn btn-xs btn-success img-circle" onClick={this.toggleComplete}>&#x2713;</button> <button type="button" className="btn btn-xs btn-danger img-circle" onClick={this.removeNode}>&#xff38;</button> <button type="button" className="btn btn-xs btn-warning img-circle" onClick={this.editNode}>&#9998;</button>
				</div>
			</li>
		);
	}
});

var TodoForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var task = this.refs.task.value.trim();
        var nodeid = this.refs.task.nodeid;
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task,nodeid);
		this.refs.task.value = '';
		return;
	},

	render: function() {
		return (
			<div className="commentForm vert-offset-top-2">
				<hr />
				<div className="clearfix">
					<form className="todoForm form-horizontal" onSubmit={this.doSubmit}>
						<div className="form-group">
							<SearchBar
							filterText2={this.props.filterText}
							/>
							<div className="col-md-10">
								<input type="text" id="task" ref="task" nodeid="0" className="form-control" placeholder="What do you need to do?" />
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 col-md-offset-2 text-right">
								<input type="submit" value="Save Item" className="btn btn-primary" />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});


class SearchBar extends React.Component {

  render() {

    return (
    	<label id="commentlabel" htmlFor="task" className="col-md-2 control-label"> {this.props.filterText2} </label>

  	);
  }
}

export default TodoBox;