# giddy
style your GitHub profiles with CSS!

![image](https://github.com/user-attachments/assets/49903264-f173-43d8-8ab6-56536f4e8b92)


## Create profile CSS
TODO: improve section

you'll need to create a repo with your GitHub username

in that repo, create a file named `giddy.css` with your css in it

please do note that Giddy does not have a live CSS editor<br>
instead you'll need to install a userstyle manager, preferrably Stylus
  - [install Stylus (Chrome)](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)
  - [install Stylus (Firefox)](https://addons.mozilla.org/firefox/addon/styl-us/)

also, please check out the profile CSS guidelines


## Publish profile CSS
TODO: improve section

first, you'll need to get the lastest commit hash.<br>
quick way to do so is to click on the short hash

![image](https://github.com/user-attachments/assets/833c2a3c-1b52-4c06-8c09-158ba3f42f8e)

and then copy the hash from your browser's address bar

![image](https://github.com/user-attachments/assets/5c16bb5a-34e9-4ba8-a670-92fcc43c9636)


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
