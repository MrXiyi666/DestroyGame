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
 * @desc 打开v文本
 * 
 * @command 关闭名字
 * @text 关闭名字
 * @desc 关闭名字文本
 *
 * @arg ID
 * @text 事件的编号
 * @desc 要设置的事件的编号 数字
 * @type number
 * @default 
*/
/*
$gameMap.event(eventId).screenX();  事件的X坐标
$gameMap.event(eventId).screenY()    事件的Y坐标
$gameMap.event(eventId).isMoving()   是否在移动
$gameMap.events().length             一共有多少个事件 用于遍历
$gameMap.event(eventId).event().name 某个事件的名字
$gameMap.event(eventId).isErased()        某事件是否被消除
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
		constructor(text_data) {
			this.text = text_data;
			this.width = getTextWidth(text_data);
			this.bitmap = new Bitmap(this.width, 48);
			this.bitmap.fontFace = $gameSystem.mainFontFace();
            this.bitmap.fontSize = $gameSystem.mainFontSize();
			this.bitmap.outlineColor = ColorManager.outlineColor();
			this.bitmap.textColor = ColorManager.normalColor();
			this.bitmap.smooth = true;
			this.bitmap.outlineWidth = 3;
			this.bitmap.paintOpacity = 255;
			this.sprite = new Sprite(this.bitmap); 
			this.height = 48;
		}
		Refresh(x, y){
			this.bitmap.clear();
			this.bitmap.drawText(this.text, 0, 0, this.width, this.height, "center");
			this.sprite.move(x,y);
		}
	}
    // 添加公共方法检查事件是否被擦除
    Game_Event.prototype.isErased = function() {
       return this._erased === true;
    };
	//=================== 保存原始的 Scene_Map.prototype.createSpriteset 方法==========================
    const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    //=================== 重写 Scene_Map.prototype.createSpriteset 方法===============================
    Scene_Map.prototype.createSpriteset = function() {
        // 调用原始的 createSpriteset 方法
        _Scene_Map_createSpriteset.call(this);
		this.array =  new Array();
		this.array[0]="";
		console.log("总数" + $gameMap.events().length);
        for(let i=1; i <= $gameMap.events().length; i++){
			
			if($gameMap.event(i)!=null){
				this.array[i] = new Event_Title($gameMap.event(i).event().name);
			    this.addChild(this.array[i].sprite);
			}	
		}
    };
	
	//=================== 重写 Scene_Map 类的 update 方法==============================
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		for(let i=1; i <= $gameMap.events().length; i++){
		    this.array[i].Refresh($gameMap.event(i).screenX() - this.array[i].width / 2, $gameMap.event(i).screenY() - 80);
			
		}
			
	};
	
})();