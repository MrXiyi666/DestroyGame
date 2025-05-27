package fun.android.legendofthebrave.fun;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

import fun.android.legendofthebrave.data.able;

public class Fun_WebView {
    public static void 启动(Activity activity, Bundle savedInstanceState){
        able.webView.setBackgroundColor(Color.TRANSPARENT);
        able.webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
        able.webView.getSettings().setJavaScriptEnabled(true);
        able.webView.getSettings().setLoadWithOverviewMode(true); // 适应屏幕宽度
        able.webView.getSettings().setAllowFileAccess(true);
        able.webView.getSettings().setAllowContentAccess(true);
        able.webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        able.webView.getSettings().setUseWideViewPort(true); // 支持任意比例缩放
        able.webView.getSettings().setBuiltInZoomControls(true); // 显示放大缩小按钮
        able.webView.getSettings().setSupportZoom(true); // 支持缩放
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
        if (savedInstanceState != null) {
            able.webView.restoreState(savedInstanceState);
        } else {
            able.webView.loadUrl("https://appassets.androidplatform.net/assets/game/index.html");
        }
    }
}
