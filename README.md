**node version 20.17.0**
**npm version 10.8.2**


Установка appium
```
npm install -g appium
```

При установке appium также нужно установить uiautomator2 
```
appium driver install uiautomator2
```

Для проверки работы appium(установлен ли андроид сдк, джава и тд) 
```
npm i -g appium-doctor
appium-doctor --android
```

environment
- export ANDROID_HOME=.../Android/Sdk


При указывании данных об эмуляторе в wdio.conf.js
```
'appium:deviceName': 'test_android_emulator',
'appium:udid': 'emulator-5554'
```
udid можно узнать командой из android-sdk
```
adb devices
```
покажет список запущенных девайсов 
в случае если это эмулятор то udid будет по примеру выше. в случае реального девайса будет например R5CX32LCS2E

