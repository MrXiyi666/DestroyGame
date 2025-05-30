//=================================================================================================
// Fun_Actor_Title_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 地图上主角头顶显示称号。
* @author 希夷先生
* @help
 *
 * @command 打开称号
 * @text 打开称号
 * @desc 打开称号文本
 * 
 * @command 关闭称号
 * @text 关闭称号
 * @desc 关闭称号文本
 *
 * @command 定义文本内容
 * @text 定义文本内容
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
	// 创建一个临时 Bitmap 用于测量文本宽度
    function getTextWidth(text) {
        const bitmap = new Bitmap(1, 1);
		bitmap.fontSize = $gameSystem.mainFontSize();
		bitmap.fontFace = $gameSystem.mainFontFace();
        return bitmap.measureTextWidth(text);
    }
	
	class Title_Name{
		constructor( width, height) {
			this.bitmap = new Bitmap(width, height);
			this.bitmap.fontFace = $gameSystem.mainFontFace();
            this.bitmap.fontSize = $gameSystem.mainFontSize();
			this.bitmap.outlineColor = ColorManager.outlineColor();
			this.bitmap.textColor = ColorManager.normalColor();
			this.bitmap.smooth = true;
			this.bitmap.outlineWidth = 3;
			this.bitmap.paintOpacity = 255;
			this.sprite = new Sprite(this.bitmap); 
		}
		
		Refresh(x, y, text){
			this.bitmap.clear();
			this.bitmap.drawText(text, 0, 0, this.bitmap.width, this.bitmap.height, "center");
			this.sprite.width = this.bitmap.width;
			this.sprite.height = this.bitmap.height;
			this.sprite.move(x,y);
		}
		
	}
	var actor_xiaoshi = true;
	var width = 816;
	var height = 48;
	var one_show = true;
	var scene_title=null;
	//================================== 注册插件指令===========================
    PluginManager.registerCommand('Fun_Actor_Title_Show', '打开称号', () => {
		one_show = true;
		$gameSystem._actor_title.bool = true;
    });

    PluginManager.registerCommand('Fun_Actor_Title_Show', '关闭称号', () => {
		$gameSystem._actor_title.bool = false;
    });
	PluginManager.registerCommand('Fun_Actor_Title_Show', '定义文本内容', args => {
        $gameSystem._actor_title.data = args.message;
		if($gameSystem._actor_title.data==""){
			$gameSystem._actor_title.data = $gameParty.leader().nickname();
		}
		scene_title.bitmap.resize(getTextWidth($gameSystem._actor_title.data), height);
		scene_title.Refresh($gamePlayer.GetScreenX() - scene_title.bitmap.width / 2, $gamePlayer.GetScreenY() - scene_title.bitmap.height*2 + 10, $gameSystem._actor_title.data);
    });
	
	function Create_Title(scene){
		one_show = true;
		actor_xiaoshi = true;
	    if($gameSystem._actor_title.data==""){
			$gameSystem._actor_title.data = $gameParty.leader().nickname();
		}
		width = getTextWidth($gameSystem._actor_title.data);
		scene_title = new Title_Name(width, height);
        scene.addChild(scene_title.sprite);
	}
	function Refresh_Title(){
		if($gamePlayer._transparent){
			if(actor_xiaoshi){
			    scene_title.bitmap.clear();
				actor_xiaoshi = false;
			}
			if(one_show==false){
				one_show = true;
			}
			return;
		}
        if($gameSystem._actor_title.bool){
			actor_xiaoshi = true;
			//主角移动 刷新文本
			if($gamePlayer.isMoving()){
			    scene_title.Refresh($gamePlayer.GetScreenX() - scene_title.bitmap.width / 2, $gamePlayer.GetScreenY() - scene_title.bitmap.height*2 + 10, $gameSystem._actor_title.data);
				return;
			}
            //主角第一次出现 刷新一次文本
			if(one_show){
				scene_title.Refresh($gamePlayer.GetScreenX() - scene_title.bitmap.width / 2, $gamePlayer.GetScreenY() - scene_title.bitmap.height*2 + 10, $gameSystem._actor_title.data);
				one_show = false;
			}
		}else{
			if(actor_xiaoshi){
			    scene_title.bitmap.clear();
				actor_xiaoshi = false;
			}
		}
	}

	//=================== 保存原始的 Scene_Map.prototype.createCharacters 方法==========================
     const _Spriteset_Map_prototype_createCharacters = Spriteset_Map.prototype.createCharacters;
    //=================== 重写 Scene_Map.prototype.createCharacters 方法===============================
    Spriteset_Map.prototype.createCharacters = function() {
        // 调用原始的 createCharacters 方法
        _Spriteset_Map_prototype_createCharacters.call(this);
		Create_Title(this);
    };
	
	//=================== 重写 Spriteset_Map.prototype.update 方法==============================
	const _Spriteset_Map_prototype_update = Spriteset_Map.prototype.update;
	Spriteset_Map.prototype.update = function() {
		_Spriteset_Map_prototype_update.call(this);
		Refresh_Title();
	};
	// 保存原始方法
    const _SceneManager_goto = SceneManager.goto;
	// 重写场景切换方法
    SceneManager.goto = function(sceneClass) {
        // 检查是否切换到战斗场景
        if (sceneClass === Scene_Battle) {
            // --------------------- 战斗前逻辑 ---------------------
            scene_title.bitmap.clear(); // 自定义方法
            // -----------------------------------------------------
        }
        
        // 执行原始逻辑
        _SceneManager_goto.call(this, sceneClass);
    };
	
	//=============================存档功能======================================
    const _Game_System_initialize = Game_System.prototype.initialize;
	// 2. 重写初始化方法，声明自定义属性
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._actor_title = { data: "", bool: true }; // 初始化自定义属性（避免 undefined）
    };
})();