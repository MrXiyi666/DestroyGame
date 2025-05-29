package fun.android.legendofthebrave.fun;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

import fun.android.legendofthebrave.data.able;

public class Fun_WebView {
    @SuppressLint("SetJavaScriptEnabled")
    public static void 启动(Activity activity){

        able.webView.setBackgroundColor(Color.TRANSPARENT);
        able.webView.setVerticalScrollBarEnabled(false);
        able.webView.setHorizontalScrollBarEnabled(false);

        able.webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        able.webView.getSettings().setJavaScriptEnabled(true);
        able.webView.getSettings().setLoadWithOverviewMode(true); // 适应屏幕宽度
        able.webView.getSettings().setAllowFileAccess(true);
        able.webView.getSettings().setAllowContentAccess(true);
        able.webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(activity)).build();

        able.webView.setWebViewClient(new WebViewClient() {
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
                able.webView.requestFocus();
            }
        });
        able.webView.loadUrl("https://appassets.androidplatform.net/assets/game/index.html");// 注入 CSS 去掉网页内容的内边距和外边距

    }
}
