= Multiactive =

This is a simple project meant to demonstrate the problem with multiple
activities and Alloy.

== Desired Result==

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
