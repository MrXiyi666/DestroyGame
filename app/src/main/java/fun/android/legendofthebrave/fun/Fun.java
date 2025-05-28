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
        able.back_image = activity.findViewById(R.id.back_image);
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

    public static int PXToDP(Activity activity, int px) {
        DisplayMetrics metrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        float density = metrics.density;
        return Math.round(px / density);
    }

    public static int 屏幕宽度(Activity activity){
        // 获取屏幕尺寸
        DisplayMetrics displayMetrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        int screenWidth = displayMetrics.widthPixels;
        return screenWidth;
    }
    public static int 屏幕高度(Activity activity){
// 获取屏幕尺寸
        DisplayMetrics displayMetrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        int screenHeight = displayMetrics.heightPixels;
        return screenHeight;
    }
    /**
     * 调整 View 的大小，保持宽高比
     * @param view 要调整大小的 View
     * @param screenWidth 屏幕宽度（像素）
     * @param screenHeight 屏幕高度（像素）
     * @param originalWidth 原始宽度（像素）
     * @param originalHeight 原始高度（像素）
     */
    public static void resizeView(View view, int screenWidth, int screenHeight, int originalWidth, int originalHeight) {
        // 计算宽高比例
        float widthRatio = (float) screenWidth / originalWidth;
        float heightRatio = (float) screenHeight / originalHeight;

        // 选择较大的比例，以确保 View 的任意一边与屏幕大小相等
        float scaleRatio = Math.max(widthRatio, heightRatio);

        // 计算新的宽高
        int newWidth = (int) (originalWidth * scaleRatio);
        int newHeight = (int) (originalHeight * scaleRatio);

        // 获取当前的布局参数
        ViewGroup.LayoutParams layoutParams = view.getLayoutParams();

        // 设置新的宽高
        layoutParams.width = newWidth;
        layoutParams.height = newHeight;

        // 应用新的布局参数
        view.setLayoutParams(layoutParams);
        view.post(()->{
            Log.w("尺寸", "宽度" + view.getWidth() +"\n" + "高度" + view.getHeight());
        });
    }
    public static String 获取文件扩展名(String filename){
        if (filename == null || filename.isEmpty()) {
            return "";
        }
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex == -1 || dotIndex == filename.length() - 1) {
            return "";
        }

        return filename.substring(dotIndex + 1);
    }

    //获取uri文件名称
    public static String 获取Uri文件名(Activity context, Uri fileUri) {
        return FileUri.getFileName(context, fileUri);
    }

    public static int 获取Uri文件大小(Activity context, Uri fileUri){
        return FileUri.getUriFileSize(context,fileUri);
    }

    /**
     * 复制文件（优化版）
     *
     * @param context     上下文
     * @param fromUri     源文件Uri
     * @param toFilePath  目标文件路径
     */
    public static void copy_Uri_File(@NonNull Context context, @NonNull Uri fromUri, @NonNull String toFilePath) {
        final int BUFFER_SIZE = 8 * 1024; // 8KB缓冲区
        ContentResolver contentResolver = context.getContentResolver();

        File targetFile = new File(toFilePath);
        // 确保目标目录存在
        File parentDir = targetFile.getParentFile();
        if (parentDir != null && !parentDir.exists() && !parentDir.mkdirs()) {
            return;
        }

        try (InputStream input = contentResolver.openInputStream(fromUri);
             OutputStream output = new FileOutputStream(targetFile)) {
            if (input == null) {
                throw new FileNotFoundException("未找到源文件: " + fromUri);
            }

            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead;
            while ((bytesRead = input.read(buffer)) != -1) {
                output.write(buffer, 0, bytesRead);
            }
            output.flush();
        } catch (IOException e) {
            // 删除不完整的文件
            if (targetFile.exists() && !targetFile.delete()) {
                Log.w("文件复制", "无法删除未完成的文件: " + targetFile);
            }
        }
    }

    public static boolean 壁纸是否存在(Activity activity){
        return new File(activity.getExternalFilesDir("back") + "/image.png").exists();
    }

    public static Bitmap 读取壁纸(Activity activity) {
        File fileDir = new File(activity.getExternalFilesDir("back") + "/image.png");
        if (!fileDir.exists()) {
            return null;
        }
        return BitmapFactory.decodeFile(fileDir.getAbsolutePath());
    }

    public static boolean 删除壁纸(Activity activity){
        return new File(activity.getExternalFilesDir("back") + "/image.png").delete();
    }

}
