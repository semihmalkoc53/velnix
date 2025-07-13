# Reklam Görüntüleme Sorunu Analizi / Ad Display Issue Analysis

## Sorun Tanımı / Problem Description

**Türkçe:** Auto_merge bölümündeki free butonuna tıklandığında ve lottery bölümündeki ilk free butonuna tıklandıktan sonra reklamlar çıkmıyor.

**English:** Ads are not showing when clicking the free button in the auto_merge section and after clicking the first free button in the lottery section.

## Analiz Sonuçları / Analysis Results

### 1. Auto_merge Bölümü / Auto_merge Section

**Kod Referansı / Code Reference:**
```javascript
// Line 12241 in app-ads.txt
s.GuideInfo.bGuideMode ? this.advIcon.node.active ? d.default.dispatchAdv("auto_merge", null, !0) : (this.advIcon.node.active = !0, this.addAutoSuc()) : d.default.dispatchAdv("auto_merge", null, !0)

// Line 12209 - Button visibility check
d.default.checkActive("auto_merge") || (this.btnAdv.node.active = !1)
```

### 2. Lottery Bölümü / Lottery Section

**Kod Referansı / Code Reference:**
```javascript
// Line 16613 in app-ads.txt
a.default.isFreeLottery ? (this.startRot(), a.default.setLottery()) : s.default.dispatchAdv("lottery", null, !0)

// Line 16523 & 16544 - Button visibility checks
this.btnAdv.node.active = s.default.checkActive("lottery")
```

### 3. Tespit Edilen Sorunlar / Identified Issues

#### A. checkActive Function Issues
- **Line 38557**: `!this.hasAdv(t)` kontrolü yapılıyor ve reklam mevcut değilse gösterilmiyor
- **Line 659**: `dispatchAdv` başarısız olduğunda "ad play failed, try again later." mesajı gösteriliyor

#### B. SDK Module Response Issues
- **Line 28180**: `"no module response"` hatası SDK modülünün yanıt vermediğini gösteriyor
- SDK dispatch komutları başarısız olduğunda reklamlar gösterilmiyor

#### C. Configuration Problems
- **Line 28825**: `CMD_SDK_COLLECTION_MODULE_CHECKER_CONFIG` konfigürasyonu eksik olabilir
- Platform-specific ad configurations may not be properly initialized

## Çözüm Önerileri / Solutions

### 1. Acil Çözümler / Immediate Solutions

#### A. checkActive Function Debug
```javascript
// Bu fonksiyonu kontrol edin / Check this function
e.checkActive = function (t, e, n) {
    // Debug için log ekleyin / Add debug logging
    console.log("checkActive called for:", t, "result:", hasAdResult);
    return hasAdResult;
}
```

#### B. hasAdv Function Debug
```javascript
// Line 38500 civarında / Around line 38500
e.hasAdv = function (t) {
    // Debug için log ekleyin / Add debug logging
    console.log("hasAdv called for:", t, "result:", result);
    return result;
}
```

### 2. SDK Initialization Check
```javascript
// SDK modüllerinin düzgün yüklendiğini kontrol edin
// Check if SDK modules are properly loaded
if (!r.default.getInstance().dispatch(a.default.CMD_SDK_SHOW_VIDEO_ADV, t)) {
    console.error("Video ad SDK not initialized");
    // Fallback mechanism or retry logic
}
```

### 3. Platform Configuration
```javascript
// Platform-specific ad configurations
// Android/iOS/Web için farklı konfigürasyonlar gerekebilir
// Different configurations may be needed for Android/iOS/Web
```

## Test Adımları / Testing Steps

1. **Console Log'larını Kontrol Et / Check Console Logs**
   - `window.tsLog("call ad")` mesajının gelip gelmediğini kontrol edin
   - `checkActive` ve `hasAdv` fonksiyonlarının döndürdüğü değerleri kontrol edin

2. **SDK Status Check**
   - `r.default.getInstance().dispatch` komutlarının başarılı olup olmadığını kontrol edin
   - "no module response" hatalarını arayın

3. **Network Requests**
   - Reklam sunucularına yapılan istekleri kontrol edin
   - AdMob/diğer reklam SDK'larının yanıt verip vermediğini kontrol edin

## Geçici Çözüm / Temporary Workaround

```javascript
// Auto_merge için geçici çözüm / Temporary fix for auto_merge
if (!d.default.checkActive("auto_merge")) {
    // Force enable ad button for testing
    this.btnAdv.node.active = true;
    console.log("Auto_merge ad button force enabled");
}

// Lottery için geçici çözüm / Temporary fix for lottery
if (!s.default.checkActive("lottery")) {
    // Force enable ad button for testing
    this.btnAdv.node.active = true;
    console.log("Lottery ad button force enabled");
}
```

## Sonuç / Conclusion

Sorun temel olarak `checkActive` ve `hasAdv` fonksiyonlarının `false` döndürmesi ve SDK modüllerinin düzgün yanıt vermemesinden kaynaklanıyor. Debug logları ekleyerek tam nedeni belirlemek ve SDK konfigürasyonunu kontrol etmek gerekiyor.

The issue is primarily caused by `checkActive` and `hasAdv` functions returning `false` and SDK modules not responding properly. Adding debug logs to determine the exact cause and checking SDK configuration is necessary.

---

**Oluşturulma Tarihi / Created:** $(date)
**Versiyon / Version:** 1.0