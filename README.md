# Requirements

In addition to the requirements from the Getting Started guide:

- NPM 3.x
- Visual Studio 2015 Community
- Windows 10 SDK Build 10586

If this is your first time using UWP, you may be able to install the SDK by opening the solution file in the ReactWindows folder in Visual Studio. After opening the solution, right click the Solution in the Solution Explorer and select the option labeled "Install Missing Components". You may have to shutdown Visual Studio to continue the installation.

# Install React Native

install react native cli

```npm install -g react-native-cli```

# Install 

install some package
```npm install```

Initialize Windows project with 
```react-native windows```
command in the project directory.

```Note : Overwrite index.windows.js please type "n"```

Run project
``` react-native run-windows```

# Install for android

install some package
```npm install```

Initialize Android project with 
```react-native upgrade```
command in the project directory.

Run project
``` react-native run-android```

# Install for ios

install some package
```npm install```

Initialize Ios project with 
```react-native upgrade```
command in the project directory.

Run project
``` react-native run-ios```



# Note

for using "react-native-vector-icons" package 

Windows : 

- Open your solution in Visual Studio, right click the Assets folder in your solution, click Add Existing.
- Browse to the node_modules\react-native-vector-icons\Fonts folder, select the required font files
- Click the Add drop-down and select Add as Link.
- Set Copy To Output Directory property of each font file to Copy if newer (each font file)

Note: you need to recompile your project after adding new fonts.

Android : 

This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:

``` apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" ```
To customize the files being copied, add the following instead:

```
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" ```

Ios : 

- Browse to node_modules/react-native-vector-icons and drag the folder Fonts to your project in Xcode. Make sure your app is checked under "Add to targets" and that "Create folder references" is checked.
- Edit Info.plist and add a property called Application fonts resource path (or ATSApplicationFontsPath if Xcode won't autocomplete/not using Xcode) and type Fonts as the value.
Note: you need to recompile your project after adding new fonts, also ensure that the Fonts folder also appear under Copy Bundle Resources in Build Phases.

Remove cache IOS app : 

``` react-native start --reset-cache ```