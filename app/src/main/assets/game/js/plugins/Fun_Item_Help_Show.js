//=================================================================================================
// Fun_Item_Help_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 菜单物品栏显示详细信息。
* @author 希夷先生
* @help
*/
(()=>{
	// 自定义窗口
    function Window_Item_Help() {
        this.initialize(...arguments);
    };

    Window_Item_Help.prototype = Object.create(Window_Base.prototype);
    Window_Item_Help.prototype.constructor = Window_Item_Help;

    // 初始化窗口
    Window_Item_Help.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
		 this.contents.fontSize = 20;
		 this.frameVisible = false;
    };
	//画出内容
	Window_Item_Help.prototype.refresh = function(item_data){
		this.contents.clear();
		let _data_zero = item_data.name+"：";
		let _data_one = item_data.note.split("\n");
		this.drawText(_data_zero, 5, 0, this.contents.measureTextWidth(_data_zero));
		for(let i=0;i<_data_one.length;i++){
			this.drawText(_data_one[i], 5, 30 * i + 30, this.contents.measureTextWidth(_data_one[i]));
		}
		

	};
	//初始化
    const _Window_ItemList_prototype_initialize = Window_ItemList.prototype.initialize;
    Window_ItemList.prototype.initialize = function(rect) {
		_Window_ItemList_prototype_initialize.call(this, rect);
        this._Item_backup_y = -1100;
		this._Item_backup_x = -1100;
	};
	
	const _Window_ItemList_prototype_drawItem = Window_ItemList.prototype.drawItem;
	Window_ItemList.prototype.drawItem = function(index) {
		_Window_ItemList_prototype_drawItem.call(this, index);	
    };
	
	const _Window_Selectable_prototype_refreshCursor = Window_ItemList.prototype.refreshCursor;
	Window_ItemList.prototype.refreshCursor = function() {
		_Window_Selectable_prototype_refreshCursor.call(this);
	};
	
	const _Window_ItemList_prototype_processCancel = Window_ItemList.prototype.processCancel;
	Window_ItemList.prototype.processCancel = function() {
		for(let child of this.children){
			if (child instanceof Window_Item_Help) {
				 this.removeChild(child);
			}
		}
		this._Item_backup_y=-1100;
		this._Item_backup_x=-1100;
		_Window_ItemList_prototype_processCancel.call(this);
	};
	const _Window_ItemList_prototype_update = Window_ItemList.prototype.update;
	Window_ItemList.prototype.update = function() {
        _Window_ItemList_prototype_update.call(this);
        // 在 update 方法中获取坐标信息
        const rect = this.itemRect(this.index());
		if(!this.item()){
			for(let child of this.children){
			    if (child instanceof Window_Item_Help) {
			        this.removeChild(child);
			    }
		    }
			this._Item_backup_y=-1100;
			this._Item_backup_x=-1100;
			return;
		}
        if(this._Item_backup_y == rect.y && this._Item_backup_x == rect.x){
			return;
		}
		for(let child of this.children){
			if (child instanceof Window_Item_Help) {
			    this.removeChild(child);
			}
		}
		let _Window_Y = rect.y + this.itemHeight() + this.itemPadding();
		let _data_one = this.item().note.split("\n");
		let _Window_Height = (_data_one.length+1)*30;
		if(this.height - rect.y < _Window_Height+this.itemHeight()){
			_Window_Y = rect.y-_Window_Height - this.itemPadding();
		}
		this.addChild(new Window_Item_Help(new Rectangle(rect.x + this.itemPadding(), _Window_Y, rect.width + this.itemPadding(), _Window_Height)));
		for(let child of this.children){
			if (child instanceof Window_Item_Help) {
				child.refresh(this.item());
			}
		}
		console.log("rect.y", rect.y);
		console.log("Item_backup_y", this._Item_backup_y);
		this._Item_backup_y = rect.y;
		this._Item_backup_x = rect.x;
    };
})();