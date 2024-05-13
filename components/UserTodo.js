import React from 'react';
import { View , Text , Pressable } from 'react-native';
import CheckBox from 'react-native-check-box';

export default function UserTodo ({ id , title , completed , onToggle , onDelete , onEdit }) {
	return (
	    <View style = {{ width: '100%' , paddingVertical: 10 , backgroundColor: '#FFF' , marginBottom: 10 , flexDirection: 'row' , alignItems: 'center' , paddingHorizontal: 20 , borderRadius: 8 , elevation: 2 }}>
			<CheckBox isChecked = {completed} onClick = {() => onToggle(id , !completed)} checkBoxColor = "#5E8B7E" style = {{ marginRight: 20 }} />
			<Text style = {{ fontSize: 18 , flex: 1 , flexWrap: 'wrap' }}> {title} </Text>
			<Pressable onPress = {() => onEdit(id)} style = {{ marginRight: 7 , padding: 10 , borderRadius: 5 , borderWidth: 1 , borderColor: 'black' , backgroundColor: '#5E8B7E' }}>
				<Text style = {{ color: 'white' }}> EDIT </Text>
			</Pressable>
			<Pressable onPress = {() => onDelete(id)} style = {{ padding: 10 , borderRadius: 5 , borderWidth: 1 , borderColor: 'black' , backgroundColor: 'rgb(218 , 35 , 35)' }}>
				<Text style = {{ color: 'white' }}> DELETE </Text>
			</Pressable>
	    </View>
	);
};