= Multiactive =

This is a simple project meant to demonstrate the problem with multiple
activities and/or intents with Titanium and Alloy.

== Second Intent Problem ==

Scenario: your app is running either in the foreground or background.  Another app
or android service calls your app with an intent.  The new intent has data in it
we need to perform the correct action, but we don't get the data, its like the
intent in `Ti.Android.currentActivity.getIntent()`` does not fetch the most recent
intent.

Following this bug: https://jira.appcelerator.org/browse/TIMOB-20459 I have added
an event listener and installed the latest 6.0.2 RC, but this event is not firing either.

Desired result, kill the app the completely, issue the command:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing" com.kaztopia.multiactive
```

You should get an alert that says "multiactive://blocked/testing"

Kill the app.  Restart the app from the standard android launcher, then run the command:
```
adb shell am start -W -a android.intent.action.VIEW -d "multiactive://blocked/testing" com.kaztopia.multiactive
```

You will get an alert showing the data is null.

== Multi-activity Problem ==

=== Desired Result ===

Start app on device, from computer enter:
```
adb shell am start -n "com.kaztopia.multiactive/.SecondActivityActivity" -a android.intent.action.VIEW -c android.intent.category.DEFAULT -e "message" "HERE_I_AM"
```
This should launch the modal window and show the message.  All is good.

== The Problem ==

Now, kill the app on the device.  This could be the state of the device when it
first started or if it was killed off in the background.  

Now, issue the command again:
```
adb shell am start -n "com.kaztopia.multiactive/.SecondActivityActivity" -a android.intent.action.VIEW -c android.intent.category.DEFAULT -e "message" "HERE_I_AM"
```

You should see an error (sometimes you have to run it twice to see the error):
```
Warning: Activity not started, its current task has been brought to the front
```
But nothing happens!!
