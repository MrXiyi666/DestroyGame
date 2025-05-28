// js/plugins/CharacterInfoWindow.js
/*:
 * @target MZ
 * @plugindesc 创建一个显示角色名称和等级信息的窗口，并提供打开和关闭窗口的插件指令，窗口高度随文本高度变化
 * @author YourName
 * 
 * @command openCharacterInfoWindow
 * @text 打开角色信息窗口
 * @desc 打开显示角色名称和等级信息的窗口
 * 
 * @command closeCharacterInfoWindow
 * @text 关闭角色信息窗口
 * @desc 关闭显示角色名称和等级信息的窗口
 */

(() => {
    // 创建一个新的窗口类，用于显示角色的名称和等级信息
    function Window_CharacterInfo() {
        this.initialize.apply(this, arguments);
    }

    Window_CharacterInfo.prototype = Object.create(Window_Base.prototype);
    Window_CharacterInfo.prototype.constructor = Window_CharacterInfo;

    Window_CharacterInfo.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
        // 监听角色等级变更事件
        this.setupLevelChangeListeners();
        this.hide(); // 初始时隐藏窗口
    };

    Window_CharacterInfo.prototype.setupLevelChangeListeners = function() {
        const actors = $gameParty.members();
        for (let i = 0; i < actors.length; i++) {
            const actor = actors[i];
            actor.addLevelChangeListener(() => {
                this.refresh();
            });
        }
    };

    Window_CharacterInfo.prototype.refresh = function() {
        const actors = $gameParty.members();
        const lineHeight = this.lineHeight();
        const padding = 16; // 手动指定内边距值
        const requiredHeight = actors.length * lineHeight + padding * 2; // 计算所需高度
        this.height = requiredHeight; // 更新窗口高度
        this.createContents(); // 重新创建内容区域

        this.contents.clear();
        for (let i = 0; i < actors.length; i++) {
            const actor = actors[i];
            const y = i * lineHeight;
            // 显示角色名称
            this.drawText(actor.name(), 0, y, this.contents.width / 2);
            // 显示角色等级
            this.drawText(`Lv: ${actor.level}`, this.contents.width / 2, y, this.contents.width / 2);
        }
    };

    // 修改 Scene_Map 类，添加角色信息窗口
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);

        // 定义窗口的位置和大小
        const wx = 10;
        const wy = 10;
        const ww = 200;
        const wh = 200; // 初始高度
        const rect = new Rectangle(wx, wy, ww, wh);

        // 创建并添加角色信息窗口
        this._characterInfoWindow = new Window_CharacterInfo(rect);
        this.addWindow(this._characterInfoWindow);
    };

    // 扩展 Game_Actor 类，添加等级变更监听功能
    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        this.notifyLevelChange();
    };

    Game_Actor.prototype.addLevelChangeListener = function(callback) {
        if (!this._levelChangeListeners) {
            this._levelChangeListeners = [];
        }
        this._levelChangeListeners.push(callback);
    };

    Game_Actor.prototype.notifyLevelChange = function() {
        if (this._levelChangeListeners) {
            for (let i = 0; i < this._levelChangeListeners.length; i++) {
                const callback = this._levelChangeListeners[i];
                callback();
            }
        }
    };

    // 注册插件指令
    PluginManager.registerCommand('CharacterInfoWindow', 'openCharacterInfoWindow', () => {
        if (SceneManager._scene._characterInfoWindow) {
            SceneManager._scene._characterInfoWindow.show();
            SceneManager._scene._characterInfoWindow.refresh();
        }
    });

    PluginManager.registerCommand('CharacterInfoWindow', 'closeCharacterInfoWindow', () => {
        if (SceneManager._scene._characterInfoWindow) {
            SceneManager._scene._characterInfoWindow.hide();
        }
    });
	PluginManager.registerCommand('CharacterInfoWindow', 'closeCharacterInfoWindow', () => {
        if (SceneManager._scene._characterInfoWindow) {
            SceneManager._scene._characterInfoWindow.hide();
        }
    });
})();