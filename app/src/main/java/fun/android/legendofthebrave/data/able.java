package fun.android.legendofthebrave.data;

import android.webkit.WebView;
import android.widget.ImageView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.PickVisualMediaRequest;
import androidx.appcompat.widget.AppCompatButton;

public class able {
    public static ImageView back_image;
    public static AppCompatButton button_menu, button_up, button_down, button_left, button_right, button_cancel, button_ok;
    public static  WebView webView;
    public static boolean 开关虚拟按键 = true;
    public static ActivityResultLauncher<PickVisualMediaRequest> 导入图片;
}
