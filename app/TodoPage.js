import React , { useState , useEffect } from 'react';
import UserTodo from '../components/UserTodo';
import { updateTodos } from "../firebase/auth";
import { doc , getDoc } from "firebase/firestore";
import { db , auth } from "../firebase/Config";
import { View , TextInput , Button , ScrollView , StatusBar } from 'react-native';

const TodoPage = () => {

	const [todoName , setTodoName] = useState('');
	const [todos , setTodos] = useState([]);

	const addTodo = async () => {
		if (todoName.trim() !== '') {
			let curId;
			if (todos.length === 0) {
				curId = 0;
			} else {
				curId = todos[todos.length - 1].id + 1;
			}
			const newTodoList = [...todos , { title: todoName , completed: false , id: curId }];
			setTodos(newTodoList);
			await updateTodos(newTodoList);
			setTodoName('');
	    }
	};

	async function getTodos () {
		if (auth.currentUser) {
			const docRef = doc(db , 'users' , auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setTodos(docSnap.data().Todos);
			} else {
				console.log("Document not found.");
			}
		}
	}

	useEffect(() => {
		getTodos();
	} , []);

	const toggleTodo = async (id , completed) => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return { ...todo , completed: completed }; // is used to change the state of the 'completed' key in the current todo.
			} else {
				return todo;
			}
		});
		setTodos(updatedTodos);
		await updateTodos(updatedTodos);
	};

	const deleteTodo = async (id) => {
		const updatedTodos = todos.filter(todo => todo.id !== id); // True: take element | False: leave element.
		setTodos(updatedTodos);
		await updateTodos(updatedTodos);
	};

	const editTodo = async (id) => {
		const newTodo = prompt("Enter the new todo title: ");
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				return { ...todo , title: newTodo };
			} else {
				return todo;
			}
		});
		setTodos(updatedTodos);
		await updateTodos(updatedTodos);
	};

	return (
		<View style={{ flex: 1 , justifyContent: 'flex-start' , alignItems: 'center' ,  padding: 20 , paddingTop: 40 , backgroundColor: '#F5F5F5' }}>
			<TextInput style = {{ width: '100%' , borderWidth: 1 , borderColor: '#5E8B7E' , padding: 10 , marginBottom: 20 , backgroundColor: '#FFF' }} placeholder = 'Enter Todo Name' value = {todoName} onChangeText={(text) => setTodoName(text)} />
			<Button title = 'Add' onPress = {addTodo} color = '#5E8B7E' />
			<ScrollView style = {{ width: "100%" , backgroundColor: '#F5F5F5' , marginTop: 15 , flexWrap: 'wrap' }}>
				{todos.map((todo) => ( <UserTodo key = {todo.id} title = {todo.title} completed = {todo.completed} id = {todo.id} onToggle = {toggleTodo} onDelete = {deleteTodo} onEdit = {editTodo} /> ))}
				<StatusBar style = 'auto'></StatusBar>
			</ScrollView>
		</View>
	);
};

export default TodoPage;