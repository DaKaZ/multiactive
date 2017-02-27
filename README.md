= Multiactive =

This is a simple project meant to demonstrate the problem with multiple
activities and/or intents with Titanium and Alloy.

== Second Intent Problem ==

Scenario: your app is running either in the foreground or background.  Another app
or android service calls your app with an intent.  The new intent has data in it
we need to perform the correct action, but we don't get the data, its like the
intent in `Ti.Android.currentActivity.getIntent()` does not fetch the most recent
intent.

Following this bug: https://jira.appcelerator.org/browse/TIMOB-20459 I have added
an event listener and installed the latest 6.0.2 RC, but this event is not firing either.

Desired result, kill the app the completely, issue the command:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing" com.kaztopia.multiactive
```

You should get a label at the bottom that shows the startup URL of "multiactive://blocked/testing"

Kill the app.  Restart the app from the standard android launcher, then run the command:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing/2" -f 134217728 com.kaztopia.multiactive
```

Only the new intent event should fire, but instead the ENTIRE app is reloaded even though we are using flag 134217728  (FLAG_UPDATE_CURRENT https://developer.android.com/reference/android/app/PendingIntent.html#FLAG_UPDATE_CURRENT)

== Multi-activity Problem ==

=== Desired Result ===

Start app on device, once the app is running, from computer enter:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing/2" -e "message" "HERE_I_AM_2" -f 268435456  com.kaztopia.multiactive/com.kaztopia.multiactive.SecondActivityActivity
```
This should launch the modal window and show the message.  All is good.

== The Problem ==

Now, kill the app on the device.  This could be the state of the device when it
first started or if it was killed off in the background.  

Now, issue the command again:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing/2" -e "message" "HERE_I_AM_2" -f 268435456  com.kaztopia.multiactive/com.kaztopia.multiactive.SecondActivityActivity
```

You will see this error in logcat:
```
I/ActivityManager( 5008): START u0 {act=android.intent.action.VIEW dat=multiactive://blocked/testing/2 flg=0x10000000 cmp=com.kaztopia.multiactive/.SecondActivityActivity (has extras)} from uid 0 on display 0
I/ActivityManager( 5008): Start proc com.kaztopia.multiactive for activity com.kaztopia.multiactive/.SecondActivityActivity: pid=7111 uid=10053 gids={50053, 9997, 3003, 1028, 1015} abi=x86
I/TiApplication( 7111): (main) [0,0] checkpoint, app created.
I/TiApplication( 7111): (main) [16,16] Titanium 6.0.2 (2017/02/15 16:26 undefined)
I/MultiDex( 7111): VM with version 2.1.0 has multidex support
I/MultiDex( 7111): install
I/MultiDex( 7111): VM has multidex support, MultiDex support library is disabled.
W/V8Object( 7111): (main) [101,117] Runtime disposed, cannot set property 'userAgent'
I/TiApplication( 7111): (main) [21,138] Titanium Javascript runtime: v8
I/ActivityManager( 5008): START u0 {cmp=com.kaztopia.multiactive/org.appcelerator.titanium.TiActivity (has extras)} from uid 10053 on display 0
D/TiAPI   ( 7111):  -------------------------  SECOND ACTIVITY -------------------------
D/TiAPI   ( 7111):  Start Intent (2):
D/TiAPI   ( 7111):  ----------------------------------- Got url (2): multiactive://blocked/testing/2
D/TiAPI   ( 7111):  ----------------------------------- Got msg (2): HERE_I_AM_2
D/TiAPI   ( 7111):  Alloy Intent (2):
D/TiAPI   ( 7111):  ----------------------------------- Got url (2): multiactive://blocked/testing/2
D/TiAPI   ( 7111):  ----------------------------------- Got msg (2): HERE_I_AM_2
I/ActivityManager( 5008): START u0 {cmp=com.kaztopia.multiactive/org.appcelerator.titanium.TiActivity (has extras)} from uid 10053 on display 0
D/AndroidRuntime( 7111): Shutting down VM
E/TiApplication( 7111): (main) [113,251] Sending event: exception on thread: main msg:java.lang.RuntimeException: Unable to resume activity {com.kaztopia.multiactive/com.kaztopia.multiactive.SecondActivityActivity}: java.lang.IllegalStateException: APSAnalytics has not been enabled. Call APSAnalytics.getInstance().enable(ctx, key, deploytype) to enable.; Titanium 6.0.2,2017/02/15 16:26,undefined
E/TiApplication( 7111): java.lang.RuntimeException: Unable to resume activity {com.kaztopia.multiactive/com.kaztopia.multiactive.SecondActivityActivity}: java.lang.IllegalStateException: APSAnalytics has not been enabled. Call APSAnalytics.getInstance().enable(ctx, key, deploytype) to enable.
E/TiApplication( 7111): 	at android.app.ActivityThread.performResumeActivity(ActivityThread.java:2951)
E/TiApplication( 7111): 	at android.app.ActivityThread.handleResumeActivity(ActivityThread.java:2982)
E/TiApplication( 7111): 	at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2365)
E/TiApplication( 7111): 	at android.app.ActivityThread.access$800(ActivityThread.java:144)
E/TiApplication( 7111): 	at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1278)
E/TiApplication( 7111): 	at android.os.Handler.dispatchMessage(Handler.java:102)
E/TiApplication( 7111): 	at android.os.Looper.loop(Looper.java:135)
E/TiApplication( 7111): 	at android.app.ActivityThread.main(ActivityThread.java:5221)
E/TiApplication( 7111): 	at java.lang.reflect.Method.invoke(Native Method)
E/TiApplication( 7111): 	at java.lang.reflect.Method.invoke(Method.java:372)
E/TiApplication( 7111): 	at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:899)
E/TiApplication( 7111): 	at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694)
E/TiApplication( 7111): Caused by: java.lang.IllegalStateException: APSAnalytics has not been enabled. Call APSAnalytics.getInstance().enable(ctx, key, deploytype) to enable.
E/TiApplication( 7111): 	at com.appcelerator.aps.APSAnalytics.throwUnlessEnabled(APSAnalytics.java:252)
E/TiApplication( 7111): 	at com.appcelerator.aps.APSAnalytics.sendAppForegroundEvent(APSAnalytics.java:132)
E/TiApplication( 7111): 	at org.appcelerator.titanium.TiBaseActivity.onResume(TiBaseActivity.java:1324)
E/TiApplication( 7111): 	at org.appcelerator.titanium.TiLaunchActivity.onResume(TiLaunchActivity.java:433)
E/TiApplication( 7111): 	at ti.modules.titanium.android.TiJSActivity.onResume(TiJSActivity.java:42)
E/TiApplication( 7111): 	at android.app.Instrumentation.callActivityOnResume(Instrumentation.java:1241)
E/TiApplication( 7111): 	at android.app.Activity.performResume(Activity.java:6023)
E/TiApplication( 7111): 	at android.app.ActivityThread.performResumeActivity(ActivityThread.java:2940)
```
