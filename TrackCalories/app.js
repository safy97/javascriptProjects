const StorageCtrl= (function () {
	return{
		storeItem: function (item) {
			let items = [];
			if(localStorage.getItem('items') !== null){
				items = JSON.parse(localStorage.getItem('items'));
			}
			items.push(item);
			localStorage.setItem('items',JSON.stringify(items));		
		},
		getItemFromStorage: function () {
			let items = [];
			if(localStorage.getItem('items') !== null){
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemStorage: function (item) {
			let items = [];
			if(localStorage.getItem('items') !== null){
				items = JSON.parse(localStorage.getItem('items'));
			}
			items.forEach(function (itemCurr,index) {
				if(item.id === itemCurr.id){
					items.splice(index,1,item);
				}
			})
			localStorage.setItem('items',JSON.stringify(items));			
		},
		deleteItemStorage: function (item) {
			let items = [];
			if(localStorage.getItem('items') !== null){
				items = JSON.parse(localStorage.getItem('items'));
			}
			items.forEach(function (itemCurr,index) {
				if(item.id === itemCurr.id){
					items.splice(index,1);
				}
			})
			localStorage.setItem('items',JSON.stringify(items));			
		},
		clearItemsStorage: function () {
			localStorage.removeItem('items');
		}
	}
})();


const ItemCtrl = (function () {
	const Item = function(id,name,calories){
		this.id = id;
		this.name = name;
		this.calories = calories;
	}

	const data = {
		items: StorageCtrl.getItemFromStorage(),
		currentItem: null,
		totalCalories: 0
	}

	return {
		logData: function () {
			return data;
		},
		getItems: function () {
			return data.items;
		},
		addItem: function(name, calories){
			let id = 0;
			if(data.items.length> 0){
				id = data.items[data.items.length -1].id + 1;
			}
			calories = parseInt(calories);
			const item = new Item(id,name,calories);
			data.items.push(item);
			return item; 
		},
		getTotalCalories: function () {
			let total = 0;
			data.items.forEach(function (item) {
				total+= item.calories;
			})
			data.totalCalories = total;
			return data.totalCalories;
		},
		getItemById: function (id) {
			let found = null;
			data.items.forEach(function (item) {
				if(item.id === id){
					found = item;
				}
			});

			return found;
		},
		updateItem: function (name,calories) {
			calories = parseInt(calories);
			let found = null;

			data.items.forEach(function (item) {
				if(item.id === data.currentItem.id){
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function (item) {
			ids = data.items.map(function (item) {
				return item.id;
			});
			const index = ids.indexOf(item.id);	
			data.items.splice(index,1);
		},
		setCurrentItem: function (itemToEdit) {
			data.currentItem = itemToEdit;
		},
		getCurrentItem: function () {
			return data.currentItem;
		},
		clearAllItems: function () {
			data.items = [];
		}
	}
})();

const UICtrl =(function () {
	const UIIds = {
		itemList: 'item-list',
		addBtn: 'add-btn',
		updateBtn: 'update-btn',
		deleteBtn: 'delete-btn',
		backBtn: 'back-btn',
		itemName: 'item-name',
		itemCalories: 'item-calories',
		totalCalories: 'total-calories',
		clearBtn: 'clear-btn'
	}
	return{
		populateItemList: function (items) {
			let html = '';
			items.forEach(function (item) {
				html += `<li class="list-group-item" id="item-${item.id}">
                <strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a class="float-right" href="#"><i class="edit-item fas fa-pencil-alt"></i></a>
            </li>`
			})
			document.getElementById(UIIds.itemList).innerHTML = html;
		},
		getIds: function () {
			return UIIds;
		},
		getItemInput: function () {
			return{
				name: document.getElementById(UIIds.itemName).value,
				calories: document.getElementById(UIIds.itemCalories).value
			}
		},
		addListItem: function (item) {
			document.getElementById(UIIds.itemList).innerHTML += `<li class="list-group-item" id="item-${item.id}">
	                <strong>${item.name}: </strong>
	                <em>${item.calories} Calories</em>
	                <a class="float-right" href="#"><i class="edit-item fas fa-pencil-alt"></i></a>
	            </li>`;
		},
		updateListItem: function (item) {
			let listItems = document.querySelectorAll('#item-list li');
			listItems = Array.from(listItems);
			listItems.forEach(function (listItem) {
				const itemId = listItem.getAttribute('id');
				if(itemId === `item-${item.id}`){
					listItem.innerHTML = `
	                <strong>${item.name}: </strong>
	                <em>${item.calories} Calories</em>
	                <a class="float-right" href="#"><i class="edit-item fas fa-pencil-alt"></i></a>
	            `
				}
			})
		},
		clearInput: function () {
			document.getElementById(UIIds.itemName).value = '';
			document.getElementById(UIIds.itemCalories).value= '';
		},
		showTotalCalories: function (total) {
			document.getElementById(UIIds.totalCalories).textContent = total;
		},
		clearEditState: function () {
			UICtrl.clearInput();
			document.getElementById(UIIds.deleteBtn).style.display = 'none';
			document.getElementById(UIIds.updateBtn).style.display = 'none';
			document.getElementById(UIIds.addBtn).style.display = 'inline-block';
			document.getElementById(UIIds.backBtn).style.display = 'none';
		},
		addItemToForm: function (item) {
			document.getElementById(UIIds.itemName).value = `${item.name}`;
			document.getElementById(UIIds.itemCalories).value= `${item.calories}`;			
		},
		deleteListItem: function (item) {
			const itemId = `item-${item.id}`;
			document.getElementById(itemId).remove();	
		},
		removeItems: function(){
			let listItems =  document.querySelectorAll('#item-list li');
			listItems = Array.from(listItems);
			listItems.forEach(function (listItem) {
				listItem.remove();
			})

		},
		showEditState: function () {
			document.getElementById(UIIds.deleteBtn).style.display = 'inline-block';
			document.getElementById(UIIds.updateBtn).style.display = 'inline-block';
			document.getElementById(UIIds.addBtn).style.display = 'none';
			document.getElementById(UIIds.backBtn).style.display = 'inline-block';
		}

	}
})();

const App = (function (ItemCtrl,UICtrl,StorageCtrl) {
	const loadEventListeners = function () {
		const UIIds = UICtrl.getIds();
		document.getElementById(UIIds.addBtn).addEventListener('click',itemAddSubmit);
		document.addEventListener('keypress',(e) => {
			if(e.keyCode === 13 || e.which === 13){
				e.preventDefault();
				return false;
			}
		})
		document.getElementById(UIIds.itemList).addEventListener('click',itemEditClick);
		document.getElementById(UIIds.updateBtn).addEventListener('click',itemUpdateClick);
		document.getElementById(UIIds.deleteBtn).addEventListener('click',itemDeleteClick);
		document.getElementById(UIIds.clearBtn).addEventListener('click',clearAllItemsClick);
		document.getElementById(UIIds.backBtn).addEventListener('click',UICtrl.clearEditState);
	}

	const itemAddSubmit = function (e) {
		const dataToAdd = UICtrl.getItemInput();
		if(dataToAdd.name !== '' && dataToAdd.calories !== ''){
			const newItem = ItemCtrl.addItem(dataToAdd.name , dataToAdd.calories);
			UICtrl.addListItem(newItem);
			StorageCtrl.storeItem(newItem);
			UICtrl.clearInput();
			let total = ItemCtrl.getTotalCalories();
			UICtrl.showTotalCalories(total);
		}
		e.preventDefault();
	}

	const itemEditClick = function (e) {
		if(e.target.classList.contains('edit-item')){
			const listItem = e.target.parentNode.parentNode.id;
			const itemId = parseInt(listItem.split('-')[1]);
			const itemToEdit = ItemCtrl.getItemById(itemId);
			ItemCtrl.setCurrentItem(itemToEdit);
			UICtrl.addItemToForm(itemToEdit);
			UICtrl.showEditState();
		}
	}
	const itemUpdateClick = function (e) {
		const input =  UICtrl.getItemInput();
		const updatedItem = ItemCtrl.updateItem(input.name,input.calories);
		UICtrl.updateListItem(updatedItem);
		let total = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(total);
		StorageCtrl.updateItemStorage(updatedItem);
		UICtrl.clearEditState();
		e.preventDefault();
	}

	const itemDeleteClick = function (e) {
		const currentItem = ItemCtrl.getCurrentItem();
		ItemCtrl.deleteItem(currentItem);
		UICtrl.deleteListItem(currentItem);
		let total = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(total);
		StorageCtrl.deleteItemStorage(currentItem);
		UICtrl.clearEditState();
		e.preventDefault();
	}

	const clearAllItemsClick = function (e) {
		ItemCtrl.clearAllItems();
		UICtrl.removeItems();
		let total = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(total);
		StorageCtrl.clearItemsStorage();
		UICtrl.clearEditState();
	}
	return{
		init: function () {
			UICtrl.clearEditState();
			const items = ItemCtrl.getItems();
			UICtrl.populateItemList(items);
			let total = ItemCtrl.getTotalCalories();
			UICtrl.showTotalCalories(total);
			loadEventListeners();
		}
	}
})(ItemCtrl,UICtrl,StorageCtrl);

App.init();