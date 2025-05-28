//=================================================================================================
// Fun_Actor_Title_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 地图上主角头顶显示称号。
* @author 希夷先生
* @help


 * @command open_title
 * @text 显示称号
 * @desc 显示称号文本
 * 
 * @command close_title
 * @text 关闭称号
 * @desc 关闭称号文本
 *
 * @command text_def
 * @text 定义文本
 * @desc 随机定义想要显示的文本内容 如果为空 那么就显示称号
 
 * @arg message
 * @text 定义文本
 * @desc 要定义的具体文本内容
 * @type string
 * @default 
*/
(() => {
	// 可以添加一个辅助方法来判断某个具体角色是否移动
    function isCharacterMoving(character) {
        if (character instanceof Game_Character) {
            return character.isMoving();
        }
        return false;
    }
	
	//Game_Player 类 添加新方法 获取屏幕坐标 X
    Game_Player.prototype.GetScreenX = function() {
	    if($gameParty && $gameParty.leader()){
		    return this.screenX();
	    }else{
			return 0;
		}
    };
	
	//Game_Player 类 添加新方法 获取屏幕坐标 X
    Game_Player.prototype.GetScreenY = function() {
	    if($gameParty && $gameParty.leader()){
		    return this.screenY();
	    }else{
			return 0;
		}
    };
	
	class Title_Name{
		
		constructor( width, height) {
			this.bitmap = new Bitmap(width, height);
			this.bitmap.fontFace = $gameSystem.mainFontFace();
            this.bitmap.fontSize = $gameSystem.mainFontSize();
			this.bitmap.outlineColor = "rgba(255, 255, 0, 1)";
			this.bitmap.textColor = "rgba(184, 134, 11, 1)";
			this.bitmap.outlineWidth = 4;
			this.bitmap.paintOpacity = 255;
			this.sprite = new Sprite(this.bitmap); 
			this.width = width;
			this.height=height;
			this.bian = 0;
			this.huan = 0;
			console.log("颜色值"+ColorManager.outlineColor());
		}
		GetSprite(){
			return this.sprite;
		}
		
		Refresh(x, y, text){
			this.bitmap.clear();
			//this.textWidth = this.bitmap.measureTextWidth($gameParty.leader().nickname());
			//this.bitmap.fillRect (this.width / 2 - this.textWidth /2 , 0, this.textWidth, this.height, "#ffffff");
		    //this.bitmap.fillRect (this.width / 2 - this.textWidth/2+2, 2, this.textWidth-4, this.height-4, "#808080");
			this.huan = this.huan + 1;
			if(this.huan > 4){
				this.huan = 0;
				if(this.bian==0){
				this.bitmap.outlineWidth = this.bitmap.outlineWidth+1;
				if(this.bitmap.outlineWidth >= 10){
					this.bian=1;
				}
			    }else if(this.bian == 1){
				    this.bitmap.outlineWidth = this.bitmap.outlineWidth-1;
				    if(this.bitmap.outlineWidth<=4){
					    this.bian = 0;
				    }
			    }
			}
			this.bitmap.drawText(text, 0, 0, this.width, this.height, "center");
			this.sprite.move(x,y);
		}
		Clear(){
			this.bitmap.clear();
		}
		
	}
	var bool_fun = true;
	var text_def="";
	var one_clear = false;
	// 注册插件指令
    PluginManager.registerCommand('Fun_Actor_Title_Show', 'open_title', () => {
        bool_fun = true;
    });

    PluginManager.registerCommand('Fun_Actor_Title_Show', 'close_title', () => {
        bool_fun = false;
		one_clear = true;
    });
	PluginManager.registerCommand('Fun_Actor_Title_Show', 'text_def', args => {
        text_def = args.message;
    });
	// 保存原始的 Scene_Map.prototype.create 方法
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;

    // 重写 Scene_Map.prototype.create 方法
    Scene_Map.prototype.createDisplayObjects = function() {
        // 调用原始的 create 方法
        _Scene_Map_createDisplayObjects.call(this);
		this.title = new Title_Name(816, 48);
        this.addChild(this.title.GetSprite());
		
    };
	// 重写 Scene_Map 类的 update 方法
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		_Scene_Map_update.call(this);
		if(bool_fun==true){
			if(text_def==""){
			    this.title.Refresh($gamePlayer.GetScreenX() - 816 / 2, $gamePlayer.GetScreenY() - 90 , $gameParty.leader().nickname());
		    }else{
			    this.title.Refresh($gamePlayer.GetScreenX() - 816 / 2, $gamePlayer.GetScreenY() - 90 , text_def);
		    }
		}else{
			if(one_clear){
			    this.title.Clear();
				one_clear = false;
			}
		    
		}
		
	};
})();