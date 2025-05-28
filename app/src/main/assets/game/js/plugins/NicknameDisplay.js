
// 可以添加一个辅助方法来判断某个具体角色是否移动
function isCharacterMoving(character) {
    if (character instanceof Game_Character) {
        return character.isMoving();
    }
    return false;
}

// 重写 Game_Player 类的方法
Game_Player.prototype.logPosition = function() {
	if($gameParty && $gameParty.leader()){
		const gridX = this.x;
        const gridY = this.y;
        const screenX = this.screenX();
        const screenY = this.screenY();
        console.log(`玩家的网格坐标：(${gridX}, ${gridY})，屏幕坐标：(${screenX}, ${screenY})`);
	}
};



// 重写 Scene_Map 类的 update 方法
const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	_Scene_Map_update.call(this);
   		// 调用自定义方法
    if (isCharacterMoving($gamePlayer)) {
    // 玩家角色正在移动，执行相应逻辑
	$gamePlayer.logPosition();
    console.log('玩家角色正在移动');
	// 输出队长的昵称到控制台
    console.log($gameParty.leader().nickname());
} else {
    // 玩家角色静止，执行其他逻辑
    //console.log('玩家角色静止');
}
};