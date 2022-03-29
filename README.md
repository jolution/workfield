
                                ______ ____________     ______________
         ___      _________________  /____  __/__(_)_______  /_____  /
         __ | /| / /  __ \_  ___/_  //_/_  /_ __  /_  _ \_  /_  __  / 
         __ |/ |/ // /_/ /  /   _  ,<  _  __/ _  / /  __/  / / /_/ /  
         ____/|__/ \____//_/    /_/|_| /_/    /_/  \___//_/  \__,_/   


[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

<!-- TOC -->

- [workfield](#workfield)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Userrighs](#userrighs)
        - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
        - [Compiles and minifies for production](#compiles-and-minifies-for-production)
            - [Example](#example)
        - [Lints and fixes files](#lints-and-fixes-files)
        - [To start the sever, run the following command in the terminal.](#to-start-the-sever-run-the-following-command-in-the-terminal)
        - [Customize configuration](#customize-configuration)
    - [Contributing](#contributing)
        - [ToDos](#todos)
    - [Color Reference](#color-reference)
    - [Authors](#authors)
    - [Contributing](#contributing)
    - [License](#license)

<!-- /TOC -->

# workfield

workfield is a vue.js 3 "Enterprise App" for dealing with montly employee time.
In workfield, you jump through time.
Easy possibles, just one (input) field and a button.

Its free to use and Open Source.
Warning: Early alpha version.
Feel free to contribute.

## Installation

```bash
npm install
```

## Usage

1. subdomain created in Plesk
2. created MariaDB SQL database
3. created and assigned users for database
4. import base database SQL (see database.sql file)
5. copy public/php/config.sample.php to public/php/config.php
6. adjusted database credentials in public/php/config.php
7. created SSL (LetsEncrypt for example)
8. install Node.js in Plesk
9. activate Node.js in subdomain
10. set PHP to version 8
11. upload files via sFTP to the new subdomain
12. connect via SSH (e.g. "ssh USER@IP")
13. change directory (e.g. cd /var/www/vhosts/workfield.DOMAIN.de)
14. install NPM packages (bspw npm i)
15. install Vue CLI service (npm i @vue/cli-service)
    If node to old, it helps to update or use a newer version with nvm.
    https://heynode.com/tutorial/install-nodejs-locally-nvm/
16. generate the dist folder with "npm run build
17. set in Plesk the document root to the dist folder
18. you now see the first page of workfield in the browser (maybe workfield.yourdomain.org)
19. the admin user (for the moment) is already pre-registered (maybe: tkirk pwd: shatner)
    username,varchar(100),empty -> tkirk
    pwd,varchar(255),password_hash() PHP function -> shatner
    rights,int(1),empty -> 1 (see Userrights for other users)
20. log in and now change the username and password of tkirk

### Userrighs

both (rights=0/1)
-> Login, Logout

rights=0 (Normal User)
-> Home, Add Work, List Work "of own" (with edit & delete funktion)

rights=1 (Admin User)
-> Home, Add User, List Users, List Work "of all" (with edit & delete funktion)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### Example

```
ssh root@IP
cd /var/www/vhosts/example.de/folder/
chown user.name:psaserv . -R
clear && npm run build && npm run serve
```

### Lints and fixes files
```
npm run lint
```

### To start the sever, run the following command in the terminal.
node index.mjs

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### ToDos

- [ ] Add new Logo
- [ ] Add Favicons
- [ ] Add new Colors
- [ ] Add new Names
- [ ] Add Credits
- [ ] Add Sponsors Possibility
- [ ] Add requirement docs
- [ ] Maybe add user stories
- [ ] Login Error only shows in Console not in Browser
- [ ] Translation to english (maybe https://kazupon.github.io/vue-i18n/)
- [ ] Security Check (php, docker, pwd)
- [ ] Extend this readme.md (maybe https://readme.so/de/editor)
- [ ] Query security -> mysqli_real_escape_string() and "?" param in SQL
- [ ] Add Email reminder to add time (maybe https://www.freecodecamp.org/news/send-emails-from-your-vue-application/)
- [ ] Integrate node.js
- [ ] Add mobile Menu

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| White | ![#fff](https://via.placeholder.com/10/fff?text=+) #fff |
| Black | ![#000](https://via.placeholder.com/10/000?text=+) #000 |


## Authors

- [@jolutionDE](https://github.com/jolution)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.
Please adhere to this project's `code of conduct`.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)