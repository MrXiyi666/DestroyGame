package fun.android.legendofthebrave.window;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.widget.AppCompatButton;
import java.util.Objects;
import fun.android.legendofthebrave.R;
import fun.android.legendofthebrave.data.able;

public class 菜单窗口 {
    public static void 启动(Activity activity){
        var dialog = new AlertDialog.Builder(activity).create();
        var view = View.inflate(activity, R.layout.window_menu_view, null);
        AppCompatButton button_bool_anjian = view.findViewById(R.id.button_bool_anjian);
        AppCompatButton button_exit = view.findViewById(R.id.button_exit);

        button_exit.setOnClickListener(V->{
            System.exit(0);
        });

        button_bool_anjian.setOnClickListener(V->{
            if(able.开关虚拟按键){
                able.开关虚拟按键 = false;
                able.button_cancel.setVisibility(View.GONE);
                able.button_ok.setVisibility(View.GONE);
                able.button_up.setVisibility(View.GONE);
                able.button_down.setVisibility(View.GONE);
                able.button_left.setVisibility(View.GONE);
                able.button_right.setVisibility(View.GONE);
            }else{
                able.开关虚拟按键 = true;
                able.button_cancel.setVisibility(View.VISIBLE);
                able.button_ok.setVisibility(View.VISIBLE);
                able.button_up.setVisibility(View.VISIBLE);
                able.button_down.setVisibility(View.VISIBLE);
                able.button_left.setVisibility(View.VISIBLE);
                able.button_right.setVisibility(View.VISIBLE);
            }
        });
        dialog.setView(view);
        dialog.setCancelable(true);
        Objects.requireNonNull(dialog.getWindow()).setGravity(Gravity.TOP);
        Objects.requireNonNull(dialog.getWindow()).setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setGravity(Gravity.CENTER);
        dialog.show();
    }
}