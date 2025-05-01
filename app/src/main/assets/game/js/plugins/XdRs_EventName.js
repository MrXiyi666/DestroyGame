//=================================================================================================
// Event_Name.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 显示事件名字和队长昵称。
* @author 芯☆淡茹水
* @help
*
* 原作者：芯☆淡茹水
* 微改：暴走的露露
* 声明：本人经作者同意将显示角色名字的部分改为显示队长称号。谢谢大佬。
*
* 【功能一】在队长头顶显示昵称。(当角色称号用吧）
*
* 【功能二】在事件头顶显示名字。
* 用法：事件页的第一项，写 注释 ：<Name:名字>
* 支持对话框控制符。
* 可以用\FS[n]修改事件名字大小。n默认值为26.
*
* 【功能三】名字坐标微调：
* x 方向 => 事件备注 <NPX:n>   (n:微调的值，正右负左)
* y 方向 => 事件备注 <NPY:n>   (n:微调的值，正下负上)
*
*
* @param displayActorName
* @type boolean
* @text 是否显示队长昵称
* @desc 是否显示队长昵称。
* @default true
*/
//=================================================================================================
;var XdRsData = XdRsData || {};
XdRsData.eventName = {};
XdRsData.eventName.displayActorName = eval(PluginManager.parameters('XdRs_EventName')['displayActorName']);
//=================================================================================================
//下面是显示队长昵称的代码
//=================================================================================================

Game_Character.prototype.currentDisplayName = function() {
    return this._displayName || '';
};

Game_Character.prototype.nameCompensateObj = function() {
    return null;
};

Game_Character.prototype.compensateX = function() {
    const obj = this.nameCompensateObj();
    if (!obj) return 0;
    return +(obj.meta.NPX || 0);
};

Game_Character.prototype.compensateY = function() {
    const obj = this.nameCompensateObj();
    if (!obj) return 0;
    return +(obj.meta.NPY || 0);
};

//=================================================================================================
Game_Player.prototype.currentDisplayName = function() {
    if (!XdRsData.eventName.displayActorName) return '';
    return $gameParty.leader() ? $gameParty.leader().nickname() : '';
};

Game_Player.prototype.nameCompensateObj = function() {
    return $gameParty.leader() ? $gameParty.leader().actor() : null;
};

//=================================================================================================
Game_Follower.prototype.currentDisplayName = function() {
    if (!XdRsData.eventName.displayActorName) return '';
    return '';
};

Game_Follower.prototype.nameCompensateObj = function() {
    return null;
};
//=================================================================================================
//下面应该是显示事件名字的代码
//=================================================================================================

XdRsData.eventName._Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    XdRsData.eventName._Game_Event_setupPage.call(this);
    this.setupDisplayName();
};
Game_Event.prototype.setupDisplayName = function() {
    this._displayName = '';
    if (this.page() && this.list() && this.list()[0].code === 108) {
        if (this.list()[0].parameters[0].match(/<Name:([\S\s]*)>/)) {
            this._displayName = RegExp.$1;
        }
    }
};
Game_Event.prototype.nameCompensateObj = function() {
    return this.event();
};
//=================================================================================================
function Window_EventName() {
    this.initialize(...arguments);
}
Window_EventName.prototype = Object.create(Window_Base.prototype);
Window_EventName.prototype.constructor = Window_EventName;
Window_EventName.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, new Rectangle(0,0,32,32));
    this.opacity = 0;
    this.hide();
};
Window_EventName.prototype.updatePadding = function() {
    this.padding = 0;
};
Window_EventName.prototype.setup = function() {
    this._lastName = this.parent.displayName();
    var data = this.textSizeEx(this._lastName);
    this.width  = data.width + this._padding * 2;
    this.height = Math.max(data.height, this.contents.fontSize+8) + this._padding * 2;
    this.createContents();
    this.drawEventName();
};
Window_EventName.prototype.drawEventName = function() {
    if (!this._lastName) this.hide();
    else {
        this.drawTextEx(this._lastName, 0, 0, this.width);
        this.show();
    }
};
Window_EventName.prototype.processEscapeCharacter = function(code, textState) {
    if (code === 'S') this.contents.fontSize = this.obtainEscapeParam(textState);
    Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
};
Window_EventName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this._lastName !== this.parent.displayName() && this.setup();
    this.updatePosition();
};
Window_EventName.prototype.updatePosition = function() {
    if (!this.visible) return;
    const cx = this.parent._character.compensateX();
    const cy = this.parent._character.compensateY();
    this.x = -this.width / 2 + cx;
    this.y = -(this.parent.patternHeight() + this.height) + cy;
};
//=================================================================================================
XdRsData.eventName._Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
    XdRsData.eventName._Sprite_Character_setCharacter.call(this, character);
    this.updateBitmap();
    this.createEventName();
};
Sprite_Character.prototype.createEventName = function() {
    this._eventName = new Window_EventName();
    this.addChild(this._eventName);
};
Sprite_Character.prototype.displayName = function() {
    return this._character ? this._character.currentDisplayName() : '';
};
//=================================================================================================
// end
//=================================================================================================