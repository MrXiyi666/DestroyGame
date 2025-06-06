//=============================================================================
// Fun_Enemy_Battler_Information.js
//=============================================================================
/*:
* @target MZ
* @plugindesc 战斗场景显示敌人详细信息
* @author 希夷先生
*/
(() => {
	class Enemy_Information_Window{
		constructor(width, height) {
			this.width = width;
			this.height=height;
			this.frome_height=48;
			this.bitmap = new Bitmap(this.width, this.height);
			this.bitmap.fontFace = $gameSystem.mainFontFace();
            this.bitmap.fontSize = 18;//$gameSystem.mainFontSize();
			this.bitmap.outlineColor = ColorManager.outlineColor();
			this.bitmap.textColor = ColorManager.normalColor();
			this.bitmap.smooth = true;
			this.bitmap.outlineWidth = 3;
			this.bitmap.paintOpacity = 255;
			this.sprite = new Sprite(this.bitmap); 
			this._enemy=null;
		}
		Refresh(){
			if(!this._enemy){
				return;
			}
			this.bitmap.clear();
			this.bitmap.fillAll(ColorManager.outlineColor());
			this.bitmap.drawText(this._enemy.name(), 0, 0, this.width, this.frome_height, "center");
			this.bitmap.drawText("生命值：" + this._enemy.hp + "/" + this._enemy.mhp, 10, this.bitmap.fontSize*2, this.width, this.frome_height, "left");
			this.bitmap.drawText("灵力值：" + this._enemy.mp + "/" + this._enemy.mmp, 10, this.bitmap.fontSize*3, this.width, this.frome_height, "left");
			this.datas = this._enemy.enemy().note.split("，");;
			this.bitmap.drawText("属性：" + this.datas[0], 10, this.bitmap.fontSize*4, this.width, this.frome_height, "left");
			this.bitmap.drawText("弱点：" + this.datas[1], 10, this.bitmap.fontSize*5, this.width, this.frome_height, "left");
			this.bitmap.drawText("抗性：" + this.datas[2], 10, this.bitmap.fontSize*6, this.width, this.frome_height, "left");
			this.bitmap.drawText("技能：" + this.datas[3], 10, this.bitmap.fontSize*7, this.width, this.frome_height, "left");
			this.sprite.width = this.width;
			this.sprite.height = this.height;
			this.sprite.move(0-this.width/2, 0-this.height);
		}
		
		Clear(){
			this.bitmap.clear();
		}
		setSize(width, height){
			this.width = width;
			this.height = height/2;
			this.bitmap.resize(this.width, this.height);
		}
		setEnemy(_enemy){
			this._enemy = _enemy;
		}
	}
	let _Scene_Battler=null;
	const _Scene_Map_prototype_create = Scene_Map.prototype.create;
	Scene_Map.prototype.create = function() {
	    _Scene_Map_prototype_create.call(this);
		_Scene_Battler=null;
	}
	const _Scene_Battle_prototype_create = Scene_Battle.prototype.create;
	Scene_Battle.prototype.create = function() {
	    _Scene_Battle_prototype_create.call(this);
		if(_Scene_Battler==null){
		}
		_Scene_Battler=this;
	}
	//=============================Sprite_Enemy.prototype.initMembers======================================
	const _Sprite_Enemy_prototype_initMembers = Sprite_Enemy.prototype.initMembers;
	Sprite_Enemy.prototype.initMembers = function() {
		_Sprite_Enemy_prototype_initMembers.call(this);
		this._Enemy_Information_Window = new Enemy_Information_Window(0, 0);
		this.addChild(this._Enemy_Information_Window.sprite);
	};
	//=============================添加敌人======================================
	const _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
	Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_prototype_setBattler.call(this, battler);
		this._Enemy_Information_Window.setEnemy(this._battler);
    };
	//=============================更新可见区域 实时更新======================================
	const _Sprite_Enemy_prototype_updateFrame = Sprite_Enemy.prototype.updateFrame;
	Sprite_Enemy.prototype.updateFrame = function() {
        _Sprite_Enemy_prototype_updateFrame.call(this);
		if(_Scene_Battler._enemyWindow.active){
			this._Enemy_Information_Window.setSize(this.bitmap.width, this.bitmap.height);
		    this._Enemy_Information_Window.Refresh();
		}else{
			this._Enemy_Information_Window.Clear();
		}
    };
})();