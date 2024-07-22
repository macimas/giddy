# giddy
minor tweaks to GitHub + style your GitHub profiles with CSS visible to others!

![image](https://github.com/user-attachments/assets/49903264-f173-43d8-8ab6-56536f4e8b92)


## Installation
TODO: actually make it available

to install, you'll need a userscript manager. preferably Tampermonkey, but you may use any managers that implement `GM` functions


## Features
there's nothing much. it just tweaks profile page a bit and lets you style your profile.

if you want to disable profile CSS, you may do so by checking your manager's menu

![image](https://github.com/user-attachments/assets/e67e005d-b104-48f1-a438-8b2839b4cb57)


## Create profile CSS
TODO: improve section

you'll need to create a repo with your GitHub username

in that repo, create a file named `giddy.css` with your css in it

please do note that Giddy does not have a live CSS editor<br>
instead you'll need to install a userstyle manager to work on your css, before pushing to repo

you may use any userstyle manager, but i'd recommend Stylus
  - [install Stylus (Chrome)](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
  - [install Stylus (Firefox)](https://addons.mozilla.org/firefox/addon/styl-us/)

also, please check out the profile CSS guidelines


## Publish profile CSS
TODO: improve section

after you've pushed css to your repo, you'll need to verify css before it's publically shown to others who have Giddy<br>
to do that, [file an issue](https://github.com/macimas/giddy/issues) to let me know


## Profile CSS guidelines
here's some rough guidelines when creating your css. it probably has issues but i think i'll work for now

1. have common sense. don't be a dick.
2. do not style or obstruct the header and footer<br>
   ![image](https://github.com/user-attachments/assets/2bf7b90c-2b8b-422b-b43a-0638e2c8b27b)
3. do not use external or absolute urls. you can only use relative and data urls<br>
    ```css
    body {
      background-image: url("./earth.png");
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADg...");
        /* these are fine */
    
      background-image: url("https://raw.githubusercontent.com/macimas/macimas/master/earth.png");
      background-image: url("/earth.png");
        /* these are not */
    }
    ```
4. make sure that text can be clearly read
5. make sure your css works in dark and light mode
