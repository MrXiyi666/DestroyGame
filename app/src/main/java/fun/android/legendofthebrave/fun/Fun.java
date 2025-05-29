package fun.android.legendofthebrave.fun;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.MotionEvent;
import android.net.Uri;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Objects;

import fun.android.legendofthebrave.R;
import fun.android.legendofthebrave.data.able;
import fun.android.legendofthebrave.window.菜单窗口;

public class Fun {
    public static void 初始化(Activity activity){
        able.button_menu = activity.findViewById(R.id.button_menu);
        able.button_up = activity.findViewById(R.id.button_up);
        able.button_down = activity.findViewById(R.id.button_down);
        able.button_left = activity.findViewById(R.id.button_left);
        able.button_right = activity.findViewById(R.id.button_right);
        able.button_cancel = activity.findViewById(R.id.button_cancel);
        able.button_ok = activity.findViewById(R.id.button_ok);
        able.webView = activity.findViewById(R.id.webView);


    }
    public static void 按钮事件(Activity activity){
        able. button_menu.setOnClickListener(V->{
            菜单窗口.启动(activity);
        });

        able.button_up.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
// 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 38;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 38;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });

        able.button_down.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                // 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 40;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 40;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });

        able.button_left.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                // 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 37;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 37;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });

        able.button_right.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                // 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 39;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 39;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });

        able.button_cancel.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                // 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 88;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 88;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });

        able.button_ok.setOnTouchListener((v, event) -> {
            if(event.getAction() == MotionEvent.ACTION_DOWN){
                // 模拟按键按下事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 90;" + // 上箭头的键码

                        // 模拟 keydown 事件
                        "var keyDownEvent = new KeyboardEvent('keydown', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyDownEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }else if(event.getAction() == MotionEvent.ACTION_UP){
                // 模拟按键弹起事件
                String jsCode = "javascript:(function() {" +
                        "var key = 'ArrowUp';" +
                        "var keyCode = 90;" + // 上箭头的键码

                        // 模拟 keyup 事件
                        "var keyUpEvent = new KeyboardEvent('keyup', {" +
                        "  key: key," +
                        "  keyCode: keyCode," +
                        "  which: keyCode," +
                        "  shiftKey: false," +
                        "  ctrlKey: false," +
                        "  metaKey: false" +
                        "});" +
                        "document.dispatchEvent(keyUpEvent);" +
                        "})()";

                able.webView.evaluateJavascript(jsCode, null);
            }
            return false;
        });
    }

}
