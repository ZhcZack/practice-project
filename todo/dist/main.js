!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e,i){"use strict";var n;!function(t){var e=function(){function t(){this.defaultListName="无命名清单",this.index=-1,this.setup(),this.bindEvents()}return t.prototype.setup=function(){var t=document.createElement("div");t.textContent="新建清单",t.id="add-new-list",this.element=t},t.prototype.bindEvents=function(){var t=this;this.element.addEventListener("click",function(e){e.stopPropagation(),t.delegate&&t.delegate.newListClicked(t)})},Object.defineProperty(t.prototype,"elem",{get:function(){return this.element},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"listName",{get:function(){return this.index++,this.index>0?this.defaultListName+this.index:this.defaultListName},enumerable:!0,configurable:!0}),t}();t.CustomNewList=e;var i=function(){function t(){this.setup(),this.bindEvents()}return Object.defineProperty(t.prototype,"elem",{get:function(){return this.element},enumerable:!0,configurable:!0}),t.prototype.setup=function(){this.element=document.createElement("div"),this.closeButton=document.createElement("span"),this.addButton=document.createElement("span"),this.inputArea=document.createElement("input"),this.element.id="add-new-item",this.closeButton.id="close-button",this.addButton.id="add-button",this.inputArea.id="input-area",this.closeButton.textContent="X",this.closeButton.classList.add("hide"),this.addButton.textContent="添加",this.addButton.classList.add("hide"),this.inputArea.placeholder="添加待办事项",this.element.appendChild(this.inputArea),this.element.appendChild(this.closeButton),this.element.appendChild(this.addButton)},t.prototype.inputMode=function(){this.inputArea.focus(),this.closeButton.classList.remove("hide"),this.addButton.classList.remove("hide")},t.prototype.normalMode=function(){this.inputArea.value="",this.inputArea.blur(),this.closeButton.classList.add("hide"),this.addButton.classList.add("hide")},t.prototype.bindEvents=function(){var t=this;this.inputArea.addEventListener("keyup",function(e){if("Control"!==e.key&&"Shift"!==e.key){""!==e.target.value?t.inputMode():t.normalMode()}}),this.closeButton.addEventListener("click",function(e){t.normalMode()}),this.addButton.addEventListener("click",function(e){var i=t.inputArea.value;t.normalMode(),t.delegate&&t.delegate.addButtonClicked(i)})},t}();t.CustomNewItem=i;var n=function(){function t(){this.isChecked=!1,this.delegate=null,this.setup()}return t.prototype.setup=function(){var t=document.createElement("div");t.classList.add("custom-checkbox"),t.textContent="√",this.element=t,this.bindEvents()},Object.defineProperty(t.prototype,"checked",{get:function(){return this.isChecked},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"elem",{get:function(){return this.element},enumerable:!0,configurable:!0}),t.prototype.switchChecked=function(){this.isChecked=!0,this.element.classList.add("checked")},t.prototype.toggleStatus=function(){this.isChecked?this.element.classList.add("checked"):this.element.classList.remove("checked")},t.prototype.bindEvents=function(){var t=this;this.element.addEventListener("click",function(e){t.isChecked=!t.isChecked,t.toggleStatus(),e.stopPropagation(),t.delegate&&t.delegate.checkboxClicked(t)})},t}();t.CustomCheckbox=n;var o=function(){function t(){this.setup()}return Object.defineProperty(t.prototype,"isHidden",{get:function(){return this.hidden},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"elem",{get:function(){return this.element},enumerable:!0,configurable:!0}),t.prototype.appear=function(){this.hidden=!1,this.element.classList.add("appear")},t.prototype.disappear=function(){this.hidden=!0,this.element.classList.remove("appear")},t.prototype.setPosition=function(t){this.element.style.top=t+"px"},t.prototype.setup=function(){this.hidden=!0;var t=document.createElement("div");t.id="rightmenu";var e=document.createElement("div");e.id="rightmenu-delete",e.textContent="删除列表",t.appendChild(e),this.element=t,this.deleteAction=e,this.bindEvents()},t.prototype.bindEvents=function(){var t=this;this.deleteAction.addEventListener("click",function(e){e.stopPropagation(),t.delegate&&t.delegate.deleteList()})},t}();t.CustomListViewRightMenu=o}(n||(n={})),e.a=n},function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n=function(t){return document.querySelector(t)};console.log.bind(console)},function(t,e,i){i(3),t.exports=i(12)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(4);window.addEventListener("load",function(t){new n.a})},function(t,e,i){"use strict";var n=i(5),o=i(8),s=function(){return function(){this.dataServer=new o.a,this.listView=new n.a,this.listView.delegate=this,this.listView.dataServer=this.dataServer,this.listView.lists=this.dataServer.modelLists}}();e.a=s},function(t,e,i){"use strict";var n=i(6),o=i(0),s=i(1),r=function(){function t(){this.element=Object(s.a)("#listview"),this.listView=Object(s.a)("#listview ul"),this.customNewList=new o.a.CustomNewList,this.customNewList.delegate=this,this.rightMenu=new o.a.CustomListViewRightMenu,this.rightMenu.delegate=this,this.areaView=new n.a,this.areaView.delegate=this,this.setup()}return Object.defineProperty(t.prototype,"lists",{set:function(t){this.itemList=t,this.updateUI(),this.areaView.dataServer=this.dataServer,this.areaView.name=this.latestModelList},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cssProperties",{get:function(){return{width:this.listView.getBoundingClientRect().width,height:this.element.getBoundingClientRect().height}},enumerable:!0,configurable:!0}),t.prototype.setup=function(){this.addCustomViews(),this.bindEvents()},t.prototype.addCustomViews=function(){this.element.appendChild(this.customNewList.elem),this.element.appendChild(this.rightMenu.elem)},t.prototype.updateUI=function(){this.latestModelList=this.dataServer.latestModelList,this.itemList=this.dataServer.modelLists;for(var t=this.listView.firstElementChild;null!==t;)this.listView.removeChild(t),t=this.listView.firstElementChild;for(var e=0,i=this.itemList;e<i.length;e++){var n=i[e],o=document.createElement("li");o.classList.add("list-item");var s=document.createElement("span");s.classList.add("item-name"),s.textContent=n;var r=document.createElement("span");r.classList.add("number-of-items"),r.textContent="",n===this.latestModelList&&o.classList.add("active"),o.appendChild(s),o.appendChild(r),this.listView.appendChild(o)}},t.prototype.bindEvents=function(){var t=this;this.listView.addEventListener("click",function(e){var i=e.target,n="",o=null,s=null;if("LI"===i.nodeName?s=(o=i).querySelector(".item-name"):"SPAN"===i.nodeName&&null!==(s=i.closest("li"))&&(s=(o=s).querySelector(".item-name")),null!==o&&o.parentNode){for(var r=o.parentNode.querySelectorAll("li"),a=0;a<r.length;a++)r[a].classList.remove("active");o.classList.add("active")}null!==s&&(n=s.textContent?s.textContent:"",t.areaView.name=n,t.dataServer.setSnapchat(n)),e.stopPropagation()}),this.listView.addEventListener("contextmenu",function(e){e.stopPropagation(),e.preventDefault();var i=e.target;"LI"===i.nodeName?i.firstElementChild&&i.firstElementChild.textContent&&(t.toBeDelected=i.firstElementChild.textContent):"SPAN"===i.nodeName&&i.textContent&&(t.toBeDelected=i.textContent),"我的一天"!==t.toBeDelected?(t.rightMenu.isHidden&&t.rightMenu.appear(),t.rightMenu.setPosition(i.getBoundingClientRect().bottom)):t.rightMenu.disappear()}),this.element.addEventListener("click",function(e){e.stopPropagation(),t.rightMenu.disappear()},!1)},t.prototype.newListClicked=function(t){for(var e=this.customNewList.listName;-1!==this.itemList.indexOf(e);)e=this.customNewList.listName;this.dataServer.addNewList(e),this.updateUI()},t.prototype.deleteList=function(){""!==this.toBeDelected&&(this.dataServer.removeList(this.toBeDelected),this.dataServer.removeSnapchat(),this.rightMenu.disappear(),this.updateUI())},t}();e.a=r},function(t,e,i){"use strict";var n=i(7),o=i(0),s=i(1),r=function(){function t(){this.element=Object(s.a)("#areaview"),this.nameLabel=Object(s.a)("#areaview .name"),this.contentView=Object(s.a)("#areaview-content ul"),this.customNewItem=new o.a.CustomNewItem,this.customNewItem.delegate=this,this.checkboxList=[],this.detailView=new n.a,this.detailView.delegate=this,this.setup()}return Object.defineProperty(t.prototype,"name",{set:function(t){this.listName=t,this.detailView.closeView(),this.updateUI()},enumerable:!0,configurable:!0}),t.prototype.setup=function(){this.bindEvents(),this.element.appendChild(this.customNewItem.elem)},t.prototype.bindEvents=function(){var t=this;this.contentView.addEventListener("click",function(e){var i=e.target;if(i.classList.contains("todo-item")){var n=i.querySelector(".todo-item-content").textContent,o=t.dataServer.getItemInList(n,t.listName);o&&(t.detailView.item=o,t.shrinkView())}})},t.prototype.toggleItemStatus=function(t){this.dataServer.toggleItemInList(t,this.listName)},t.prototype.updateUI=function(){this.nameLabel.textContent=this.listName,this.contentView.innerHTML="",this.checkboxList=[];for(var t=0,e=this.dataServer.itemsInList(this.listName);t<e.length;t++){var i=e[t],n=document.createElement("li");n.classList.add("todo-item");var s=document.createElement("span");s.classList.add("todo-item-content"),s.textContent=i.name;var r=new o.a.CustomCheckbox;r.delegate=this,this.checkboxList.push(r),n.appendChild(r.elem),n.appendChild(s),i.done&&(r.switchChecked(),s.classList.add("done")),this.contentView.appendChild(n)}},t.prototype.checkboxClicked=function(t){var e=t.elem.nextElementSibling;if(e){var i=e.textContent;i&&(e.classList.toggle("done"),this.toggleItemStatus(i))}},t.prototype.addButtonClicked=function(t){this.addNewItem(t)},t.prototype.closeButtonClicked=function(t){this.stretchView()},t.prototype.deleteButtonClicked=function(t){var e=t.name;this.stretchView(),this.deleteItem(e)},t.prototype.toggleItem=function(t){this.toggleItemStatus(t.name),this.updateUI()},t.prototype.addNewItem=function(t){this.dataServer.addItemInList(t,this.listName),this.updateUI()},t.prototype.deleteItem=function(t){this.dataServer.removeItemInList(t,this.listName)&&this.updateUI()},t.prototype.shrinkView=function(){this.element.classList.add("shrink")},t.prototype.stretchView=function(){this.element.classList.remove("shrink")},t}();e.a=r},function(t,e,i){"use strict";i.d(e,"a",function(){return s});var n=i(0),o=i(1),s=function(){function t(){this.element=Object(o.a)("#detailview"),this.checkbox=new n.a.CustomCheckbox,this.checkbox.delegate=this,this.nameLabel=Object(o.a)("#detailview .title"),this.closeButton=Object(o.a)("#detailview .disappear"),this.deleteButton=Object(o.a)("#detailview .delete"),this.timeLabel=Object(o.a)("#detailview .create-time"),this.setup()}return t.prototype.closeView=function(){this.disappear()},t.prototype.setup=function(){this.bindEvents()},t.prototype.bindEvents=function(){var t=this;this.closeButton.addEventListener("click",function(e){t.closeView(),t.delegate&&t.delegate.closeButtonClicked(t.todoItem)}),this.deleteButton.addEventListener("click",function(e){t.todoItem.name;t.closeView(),t.delegate&&t.delegate.deleteButtonClicked(t.todoItem)})},Object.defineProperty(t.prototype,"item",{set:function(t){this.todoItem=t,this.appear(),this.updateUI()},enumerable:!0,configurable:!0}),t.prototype.updateUI=function(){this.nameLabel.textContent=this.todoItem.name,this.nameLabel.parentNode.insertBefore(this.checkbox.elem,this.nameLabel),this.timeLabel.textContent="创建于"+this.todoItem.date.split(" ")[0],this.todoItem.done&&this.checkbox.switchChecked()},t.prototype.disappear=function(){this.element.classList.add("disappear")},t.prototype.appear=function(){this.element.classList.remove("disappear")},t.prototype.checkboxClicked=function(t){this.delegate&&this.delegate.toggleItem(this.todoItem)},t}()},function(t,e,i){"use strict";var n=i(9),o=i(10),s=function(){function t(){this.listModel=new n.a,this.itemModelList={},this.setup()}return t.prototype.setup=function(){for(var t=0,e=this.listModel.lists;t<e.length;t++){var i=e[t];this.itemModelList[i]=new o.a(i)}},Object.defineProperty(t.prototype,"modelLists",{get:function(){return this.listModel.lists},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"latestModelList",{get:function(){var t=localStorage.getItem("list-name-before-closed");return null!==t&&""!==t||(localStorage.setItem("list-name-before-closed","我的一天"),t="我的一天"),t},enumerable:!0,configurable:!0}),t.prototype.getItemInList=function(t,e){return this.itemModelList[e].getItem(t)},t.prototype.itemNumbersInList=function(t){return this.itemModelList[t].numberOfItems},t.prototype.addNewList=function(t){this.listModel.add(t)},t.prototype.removeList=function(t){return localStorage.removeItem(t),this.listModel.remove(t)},t.prototype.itemsInList=function(t){return this.itemModelList[t].items},t.prototype.addItemInList=function(t,e){this.itemModelList[e].add(t)},t.prototype.removeItemInList=function(t,e){return this.itemModelList[e].remove(t)},t.prototype.toggleItemInList=function(t,e){this.itemModelList[e].toggle(t)},t.prototype.renameItemInList=function(t,e,i){this.itemModelList[i];return!1},t.prototype.setSnapchat=function(t){localStorage.setItem("list-name-before-closed",t)},t.prototype.removeSnapchat=function(){localStorage.removeItem("list-name-before-closed")},t}();e.a=s},function(t,e,i){"use strict";var n=function(){function t(){this.todoLists=[],this.name="todo-app-list",this.setup()}return t.prototype.setup=function(){this.load()},t.prototype.add=function(t){this.info(t).find||(this.todoLists.push(t),this.save())},t.prototype.info=function(t){for(var e=0;e<this.todoLists.length;e++)if(this.todoLists[e]===t)return{find:!0,index:e};return{find:!1}},t.prototype.remove=function(t){var e=this.info(t);return!!e.find&&(this.todoLists.splice(e.index,1),this.save(),!0)},t.prototype.clear=function(){this.todoLists=[],this.save()},t.prototype.save=function(){var t={lists:this.todoLists};localStorage.setItem(this.name,JSON.stringify(t))},t.prototype.load=function(){var t=localStorage.getItem(this.name);null===t||0===JSON.parse(t).lists.length?(this.todoLists.push("我的一天"),this.save()):this.todoLists=JSON.parse(t).lists},t.prototype.deleteModel=function(){localStorage.removeItem(this.name)},Object.defineProperty(t.prototype,"lists",{get:function(){return JSON.parse(JSON.stringify(this.todoLists))},enumerable:!0,configurable:!0}),t}();e.a=n},function(t,e,i){"use strict";var n=i(11),o=function(){function t(t){this.itemList=[],this.modelName=t,this.setup()}return t.prototype.setup=function(){this.load()},t.prototype.add=function(t){if(!this.info(t).find){var e=new n.a(t);this.itemList.push(e),this.save()}},t.prototype.info=function(t){for(var e=0;e<this.itemList.length;e++)if(this.itemList[e].title===t)return{find:!0,index:e};return{find:!1}},t.prototype.toggle=function(t){var e=this.info(t);if(e.find){this.itemList[e.index].toggleStatus(),this.save()}},t.prototype.remove=function(t){var e=this.info(t);return!!e.find&&(this.itemList.splice(e.index,1),this.save(),!0)},t.prototype.clear=function(){this.itemList=[],this.save()},t.prototype.save=function(){var t={todos:this.itemList};localStorage.setItem(this.modelName,JSON.stringify(t))},t.prototype.load=function(){var t=localStorage.getItem(this.modelName);if(null===t)this.itemList=[],this.save();else for(var e=0,i=JSON.parse(t).todos;e<i.length;e++){var o=i[e],s=JSON.parse(o),r=new n.a(s.name,s.done,s.date);this.itemList.push(r)}},t.prototype.deleteModel=function(){localStorage.removeItem(this.modelName)},Object.defineProperty(t.prototype,"items",{get:function(){for(var t=[],e=0,i=this.itemList;e<i.length;e++){var n=i[e],o={name:n.title,done:n.isFinished,date:n.createTime};t.push(o)}return t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"numberOfItems",{get:function(){return this.itemList.length},enumerable:!0,configurable:!0}),t.prototype.getItem=function(t){var e=this.info(t);if(e.find){var i=e.index;return{name:this.itemList[i].title,done:this.itemList[i].isFinished,date:this.itemList[i].createTime}}return null},t}();e.a=o},function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n=function(){function t(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=(new Date).toLocaleString()),this.itemName=t,this.isDone=e,this.date=(new Date).toLocaleString()}return Object.defineProperty(t.prototype,"title",{get:function(){return this.itemName},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isFinished",{get:function(){return this.isDone},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"createTime",{get:function(){return this.date},enumerable:!0,configurable:!0}),t.prototype.toggleStatus=function(){this.isDone=!this.isDone},t.prototype.equal=function(t){return this.itemName===t.itemName},t.prototype.toJSON=function(){var t={name:this.itemName,done:this.isDone,date:this.date};return JSON.stringify(t)},t}()},function(t,e){}]);
//# sourceMappingURL=main.js.map