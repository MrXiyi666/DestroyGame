package fun.android.legendofthebrave.window;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import androidx.appcompat.app.AlertDialog;
import java.util.Objects;
import fun.android.legendofthebrave.R;

public class 菜单窗口 {
    public static void 启动(Activity activity){
        var dialog = new AlertDialog.Builder(activity).create();
        var view = View.inflate(activity, R.layout.window_menu_view, null);
        dialog.setView(view);
        dialog.setCancelable(true);
        Objects.requireNonNull(dialog.getWindow()).setGravity(Gravity.TOP);
        Objects.requireNonNull(dialog.getWindow()).setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setGravity(Gravity.CENTER);
        dialog.show();
    }
}
