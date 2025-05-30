//=================================================================================================
// Fun_Event_Title_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 地图上任意事件头顶显示名字。
* @author 希夷先生
* @help
 *
 * @command 打开名字
 * @text 打开名字
 * @desc 打开名字文本
 * 
 * @command 关闭名字
 * @text 关闭名字
 * @desc 关闭名字文本
 *
 * @command 关闭指定编号名字
 * @text 关闭指定编号名字
 * @desc 关闭指定编号名字
 *
 * @arg id
 * @text 编号
 * @desc 要关闭的编号
 * @type number
 *
 * @command 修改指定编号名字
 * @text 修改指定编号名字
 * @desc 修改指定编号名字
 *
 * @arg re_id
 * @text 要需改的编号
 * @desc 要需改的编号
 * @type number
 *
 * @arg re_data
 * @text 修改的值
 * @desc 修改的值
 * @type string
 *
*/
/*
$gameMap.event(eventId).screenX();   事件的X坐标
$gameMap.event(eventId).screenY()    事件的Y坐标
$gameMap.event(eventId).isMoving()   是否在移动
$gameMap.events().length             一共有多少个事件 用于遍历
$gameMap.event(eventId).event().name 某个事件的名字
$gameMap.event(eventId).isErased()   某事件是否被消除
$gameMap.mapId();                    当前地图的编号    
*/
(() => {
    // 创建一个临时 Bitmap 用于测量文本宽度
    function getTextWidth(text) {
        const bitmap = new Bitmap(1, 1);
		bitmap.fontSize = $gameSystem.mainFontSize();
		bitmap.fontFace = $gameSystem.mainFontFace();
        return bitmap.measureTextWidth(text);
    }
    class Event_Title{
		constructor(event) {
			this.event = event;
			this.text = event.event().name;
			this.id = event.eventId();
			this.width = getTextWidth(this.text);
			this.height = 48;
			this.bitmap = new Bitmap(this.width, this.height);
			this.bitmap.fontFace = $gameSystem.mainFontFace();
            this.bitmap.fontSize = $gameSystem.mainFontSize();
			this.bitmap.outlineColor = ColorManager.outlineColor();
			this.bitmap.textColor = ColorManager.normalColor();
			this.bitmap.smooth = true;
			this.bitmap.outlineWidth = 3;
			this.bitmap.paintOpacity = 255;
			this.sprite = new Sprite(this.bitmap); 
			
		}
		Refresh(x, y){
			this.bitmap.clear();
			this.bitmap.drawText(this.text, 0, 0, this.width, this.height, "center");
			this.sprite.width = this.width;
			this.sprite.height = this.height;
			this.sprite.move(x,y);
		}
	}
	
	function 更新内容(){
		for (let arr of array ) {
			//去掉不存在的ID
			if(arr.event.isErased()){
				arr.bitmap.clear();
				continue;
			}
			var 是否去掉 = false;
			//去掉要消除的ID
			for(let arr_id of clear_id_array){
				if(arr.id == arr_id){
					arr.bitmap.clear();
					是否去掉=true;
					break;
				}
			}
			if(是否去掉){
				continue;
			}
			arr.bitmap.clear();
			if($gameSystem._event_title.for_show==true){
				arr.Refresh(arr.event.screenX() - arr.width / 2, arr.event.screenY() - 80);
			}			
		}
	}
	function 删除指定编号(){
		for (let arr of array ) {
			//去掉要消除的ID
			for(let arr_id of clear_id_array){
				if(arr.id == arr_id){
					arr.bitmap.clear();
					break;
				}
			}
		}
	}
	function 修改指定编号文本(id, data){
		for(let aa of array){
			if(id != aa.id){
				continue;
			}
			aa.text = data;
			aa.width = getTextWidth(aa.text);
			aa.bitmap.resize(aa.width, aa.height);
			aa.Refresh(aa.event.screenX() - aa.width / 2, aa.event.screenY() - 80);
		}
	}
	PluginManager.registerCommand('Fun_Event_Title_Show', '打开名字', () => {
        $gameSystem._event_title.for_show = true;
		更新内容();
    });

    PluginManager.registerCommand('Fun_Event_Title_Show', '关闭名字', () => {
	    $gameSystem._event_title.for_show = false;
		更新内容();
    });
	
	PluginManager.registerCommand('Fun_Event_Title_Show', '关闭指定编号名字', args => {
		clear_id_array.push(args.id);
		删除指定编号();
    });
	PluginManager.registerCommand('Fun_Event_Title_Show', '修改指定编号名字', args => {
		修改指定编号文本(args.re_id, args.re_data);
    });
	
    // 添加公共方法检查事件是否被擦除
    Game_Event.prototype.isErased = function() {
       return this._erased === true;
    };
	//=================== 保存原始的 Game_Interpreter.prototype.command214 方法==========================
	const _Game_Interpreter_prototype_command214 = Game_Interpreter.prototype.command214;
    Game_Interpreter.prototype.command214 = function() {
		_Game_Interpreter_prototype_command214.call(this);
		更新内容();
		return true;
    };
	//=================== 保存原始的 Spriteset_Map.prototype.createCharacters 方法==========================
    const _Spriteset_Map_prototype_createCharacters = Spriteset_Map.prototype.createCharacters;
    //=================== 重写 Spriteset_Map.prototype.createCharacters 方法===============================
    Spriteset_Map.prototype.createCharacters = function() {
        // 调用原始的 createCharacters 方法
        _Spriteset_Map_prototype_createCharacters.call(this);
		clear_one = true;
		array =  [];
		clear_id_array = [];
		for (let event of $gameMap.events()) {
			if(event.event().name == ""){
				continue;
			}
			this.event_title = new Event_Title(event);
			array.push(this.event_title);
			this.addChild(this.event_title.sprite);
        }
		更新内容();
		
    };
	
	//=================== 重写 Scene_Map 类的 update 方法==============================
	const _Spriteset_Map_prototype_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_prototype_update.call(this);
		//主角移动时刷新文本
		if($gamePlayer.isMoving()){
			更新内容();
		}
	};
	//=============================存档功能======================================
    const _Game_System_initialize = Game_System.prototype.initialize;
	// 2. 重写初始化方法，声明自定义属性
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._event_title = { for_show: true };
		
    };
})();