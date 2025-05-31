//=================================================================================================
// Fun_Item_Help_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 菜单物品栏显示详细信息。
* @author 希夷先生
* @help
*/
/*
item.description 物品描述
item.name        物品名字
item.params[0]   最大生命值
item.params[1]   最大灵力值
item.params[2]   攻击力
item.params[3]   防御力
item.params[4]   灵术攻击力
item.params[5]   灵术防御力
item.params[6]   敏捷
item.params[7]   幸运
*/
(() => {
	
	// 创建自定义窗口类
    class Window_Base_Attributes_Help extends Window_Base {
        constructor(rect) {
            super(rect);
            this.initialize(rect);
        }
        initialize(rect) {
            super.initialize(rect);
        }
        refresh(_text) {
            this.contents.clear();
			this.drawTextEx(_text, 0, 0, this.contents.width);
            
        }
    }
	
	// 修改物品列表窗口宽度
    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.call(this);
        this._itemWindow.width = 408;
    };
	
	let _Window_Base_Attributes_Help=null;
	// 在插件中添加以下代码
    Window_ItemList.prototype.maxCols = function() {
        return 1; // 默认是2列，改为6列以显示更多物品
    };
	
    // 覆盖技能窗口的列数为1
    //Window_SkillList.prototype.maxCols = function() {
     //   return 1;
    //};
	
	//=================== 保存原始的 Window_Help.prototype.setItem 方法==========================
    const _Window_Help_prototype_setItem = Window_Help.prototype.setItem;
	Window_Help.prototype.setItem = function(item) {
		_Window_Help_prototype_setItem.call(this, item);
		if(!item){
			return;
		}
		if(_Window_Base_Attributes_Help==null){
			return;
		}
		if(item.params==null){
			return;
		}
		let data = "                 基础属性\n"+
		    "攻击力             ：" + item.params[2] + 
			"\n防御力             ：" + item.params[3] + 
			"\n灵术攻击力      ：" + item.params[4] + 
			"\n灵术防御力      ：" + item.params[5] + 
			"\n敏捷                ：" + item.params[6] + 
			"\n幸运                ：" + item.params[7] +
			"\n最大生命值      ：" + item.params[0] +
			"\n最大灵力值      ：" + item.params[1];
		_Window_Base_Attributes_Help.refresh(data);
		
    };
	
	//=================== 保存原始的 Scene_Item.prototype.create 方法==========================
	const _Scene_Item_prototype_create = Scene_Item.prototype.create;
	Scene_Item.prototype.create = function(){
		_Scene_Item_prototype_create.call(this);
		//进入物品栏
		_Window_Base_Attributes_Help = new Window_Base_Attributes_Help(new Rectangle(408, 120, 400, 400));
		 this.addWindow(_Window_Base_Attributes_Help);
		 _Window_Base_Attributes_Help.show();
		 _Window_Base_Attributes_Help.refresh("");
	};
	//=================== 保存原始的 Scene_Item.prototype.onItemCancel 方法==========================
	const _Scene_Item_prototype_onItemCancel = Scene_Item.prototype.onItemCancel;
	Scene_Item.prototype.onItemCancel = function(){
		_Scene_Item_prototype_onItemCancel.call(this);
		_Window_Base_Attributes_Help.refresh("");
	
	};
	
})();