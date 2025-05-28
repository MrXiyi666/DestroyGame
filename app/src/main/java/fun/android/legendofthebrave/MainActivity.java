package fun.android.legendofthebrave;

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import fun.android.legendofthebrave.data.able;
import fun.android.legendofthebrave.fun.Fun;
import fun.android.legendofthebrave.fun.Fun_WebView;
public class MainActivity extends AppCompatActivity {


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        View decorView = getWindow().getDecorView();
        WindowInsetsController controller = decorView.getWindowInsetsController();
        if (controller != null) {
            controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
            controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        }
        setContentView(R.layout.activity_main);
        Fun.初始化(this);
        Fun_WebView.启动(this);
        Fun.按钮事件(this);
        able.导入图片 = registerForActivityResult(new ActivityResultContracts.PickVisualMedia(), uri -> {
            if(uri == null){
                return;
            }
            String 文件名 = Fun.获取Uri文件名(this, uri);
            String 文件后缀 = Fun.获取文件扩展名(文件名);
            Log.w("文件名", 文件名 + "\n" + 文件后缀 + "\n" + getExternalFilesDir("back") + "\n" + this.getExternalFilesDir("back").getPath() + "/image.png" );
            Fun.copy_Uri_File(this, uri, getExternalFilesDir("back") + "/image.png" );
            Bitmap 壁纸 = Fun.读取壁纸(this);
            if(壁纸!=null){
                able.back_image.setImageBitmap(壁纸);
            }
        });
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            // 横屏
            Log.w("尺寸", "横屏" );
        } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
            // 竖屏
            Log.w("尺寸", "竖屏" );
        }
    }

}