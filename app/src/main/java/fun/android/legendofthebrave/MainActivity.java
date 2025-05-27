package fun.android.legendofthebrave;

import android.annotation.SuppressLint;
import android.content.res.Configuration;
import android.graphics.Color;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler;
import androidx.webkit.WebViewAssetLoader.Builder;

import fun.android.legendofthebrave.window.菜单窗口;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    private AppCompatButton button_menu;
    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        View decorView = getWindow().getDecorView();
        WindowInsetsController controller = decorView.getWindowInsetsController();
        if (controller != null) {
            controller.hide(WindowInsets.Type.statusBars());
        }
        setContentView(R.layout.activity_main);
        button_menu = findViewById(R.id.button_menu);
        webView = findViewById(R.id.webView);
        GradientDrawable background = new GradientDrawable();
        background.setShape(GradientDrawable.RECTANGLE); // 设置形状为矩形
        background.setColor(Color.TRANSPARENT); // 设置背景颜色为透明
        background.setCornerRadius(20); // 设置圆角半径
        webView.setBackground(background);
        webView.setBackgroundColor(Color.TRANSPARENT);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        // 启用JavaScript（如果HTML文件中包含JavaScript代码）
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowFileAccess(true); // 启用文件访问
        webView.getSettings().setAllowContentAccess(true); // 启用内容访问
        webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        WebViewAssetLoader assetLoader = new Builder().addPathHandler("/assets/", new AssetsPathHandler(this)).build();

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return super.shouldOverrideUrlLoading(view, request);
            }
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                webView.requestFocus();
            }
        });
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            // 加载assets文件夹中的HTML文件
            webView.loadUrl("https://appassets.androidplatform.net/assets/game/index.html");
        }

        button_menu.setOnClickListener(V->{
            菜单窗口.启动(this);
        });
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // 如果需要，可以在这里处理屏幕旋转后的逻辑
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

}