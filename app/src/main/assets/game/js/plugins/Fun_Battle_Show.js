//=================================================================================================
// Fun_Battle_Show.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 战斗界面修改。
* @author 希夷先生
* @help
*/
(() => {
	
	// 重写背景创建方法
	//=================== 保存原始的 Spriteset_Battle.prototype.createBattleback 方法==========================
    const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function() {
        _Spriteset_Battle_createBattleback.call(this);
        // 设置远景背景透明度
        this._back1Sprite.opacity = 150;
        // 设置近景背景透明度
        this._back2Sprite.opacity = 150;
    };
	
	//如果是战斗界面 人物信息背景变成 0
	//=================== 保存原始的 indow_StatusBase.prototype.placeBasicGauges 方法==========================
	const _Window_StatusBase_prototype_placeBasicGauges = Window_StatusBase.prototype.placeBasicGauges;
    Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
        if (SceneManager._scene instanceof Scene_Battle) {
			this.backOpacity = 0;
            return;
        }
		_Window_StatusBase_prototype_placeBasicGauges.call(this, actor, x, y);
    };
	//如果是战斗界面 人物信息背景变成 战斗界面 名字坐标修改
	//=================== 保存原始的 Window_StatusBase.prototype.placeActorName 方法==========================
	const _Window_StatusBase_prototype_placeActorName = Window_StatusBase.prototype.placeActorName;
	Window_StatusBase.prototype.placeActorName = function(actor, x, y) {
	_Window_StatusBase_prototype_placeActorName.call(this, actor, x+40, y+30);
	};
	//敌人出现文本消息
	//=================== 保存原始的 BattleManager.displayStartMessages 方法==========================
	const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        // 移除敌人出现消息的循环
        // 保留先手/偷袭状态提示
		//战斗开始
        if (this._preemptive) {
            $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
        } else if (this._surprise) {
            $gameMessage.add(TextManager.surprise.format($gameParty.name()));
        }
		
    };
	//战斗结算文本消息
	//=================== 保存原始的 BattleManager.displayVictoryMessage 方法==========================
	const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
	BattleManager.displayVictoryMessage = function() {
        //$gameMessage.add(TextManager.victory.format($gameParty.name()));
		//console.log(TextManager.victory.format($gameParty.name()));
    };
	//战斗胜利 显示经验
	BattleManager.displayExp = function() {
        const exp = this._rewards.exp;
        if (exp > 0) {
            const text = TextManager.obtainExp.format(exp, TextManager.exp);
            //$gameMessage.add("\\." + text);
			
        }
    };
	//创建战斗准备窗口
	//=================== 保存原始的 Scene_Battle.prototype.createAllWindows 方法==========================
	const _Scene_Battle_prototype_createAllWindows= Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function(){
		_Scene_Battle_prototype_createAllWindows.call(this);
		//this._skillWindow.backOpacity = 0;
		//this._skillWindow.frameVisible = false;
		//this._itemWindow.backOpacity = 0;
		//this._itemWindow.frameVisible = false;
		this._actorCommandWindow.y = 120;
		this._skillWindow.y=100;
		this._itemWindow.y=100;
	}
	
	//战斗更新
	//=================== 保存原始的 Scene_Battle.prototype.update 方法==========================
	const _Scene_Battle_prototype_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function(){
		_Scene_Battle_prototype_update.call(this);
	};
	//角色命令窗口
	Scene_Battle.prototype.actorCommandWindowRect = function() {
        const ww = 308;//192;
        const wh = 245;//this.windowAreaHeight();
        const wx = 254;//this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = 0;//Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
	//敌人选择窗口
    Scene_Battle.prototype.enemyWindowRect = function() {
        const wx = this._statusWindow.x;
        const ww = 808;//this._statusWindow.width;
        const wh = this.windowAreaHeight();
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
	//队伍命令窗口
	Scene_Battle.prototype.partyCommandWindowRect = function() {
        const ww = 192;
        const wh = 115;//this.windowAreaHeight();
        const wx = 308;//this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = 220;//Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
	//技能选择窗口
	Scene_Battle.prototype.skillWindowRect = function() {
        const ww = Graphics.boxWidth;
        const wh = 312;//this.windowAreaHeight();
        const wx = 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
})();