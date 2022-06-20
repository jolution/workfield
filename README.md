![Logo](./src/assets/img/workfield-logo.png)

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

<!-- TOC -->

- [workfield](#workfield)
    - [Installation](#installation)
    - [Usage](#usage)
        - [User-rights](#user-rights)
        - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
        - [Compiles and minifies for production](#compiles-and-minifies-for-production)
            - [Example](#example)
        - [Lints and fixes files](#lints-and-fixes-files)
        - [To start the sever, run the following command in the terminal.](#to-start-the-sever-run-the-following-command-in-the-terminal)
        - [Customize configuration](#customize-configuration)
    - [Color Reference](#color-reference)
    - [Authors](#authors)
    - [Contributing](#contributing)
    - [Roadmap](#roadmap)
    - [Sponsor](#sponsor)
    - [License](#license)

<!-- /TOC -->

# workfield

workfield is a vue.js 3 "Enterprise App" for dealing with monthly employee time.
In workfield, you jump through time.
Easy possibles, just one (input) field and a button.

Warning: Early alpha version.
Feel free to [contribute](#contributing).

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
14. install NPM packages (npm i)
15. install Vue CLI service (npm i @vue/cli-service)
    If node to old, it helps to update or use a newer version with nvm.
    https://heynode.com/tutorial/install-nodejs-locally-nvm/
16. generate the dist folder with "npm run build
17. set in Plesk the document root to the dist folder
18. you now see the first page of workfield in the browser (maybe workfield.your-domain.org)
19. the admin user (for the moment) is already pre-registered (maybe: tkirk pwd: shatner)
    username,varchar(100),empty -> tkirk
    pwd,varchar(255),password_hash() PHP function -> shatner
    rights,int(1),empty -> 1 (see User-rights for other users)
20. log in and now change the username and password of tkirk

### User-rights

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
chown USERNAME:psaserv . -R
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

## Color Reference

| Color      | Hex                                                        |
|------------|------------------------------------------------------------|
| White      | ![#fff](https://via.placeholder.com/10/fff?text=+) #fff    |
| Slate-200  | ![#e2e8f0](https://via.placeholder.com/10/e2e8f0?text=+) #e2e8f0 |
| Black      | ![#000](https://via.placeholder.com/10/000?text=+) #000    |
| Indigo-500 | ![#6366f1](https://via.placeholder.com/10/6366f1?text=+) #6366f1 |
| Gray-300   | ![#d1d5db](https://via.placeholder.com/10/d1d5db?text=+) #d1d5db |
| Gray-700   | ![#334155](https://via.placeholder.com/10/334155?text=+) #334155 |
| Gray-800   | ![#2d3748](https://via.placeholder.com/10/2d3748?text=+) #2d3748 |

## Authors

- [@jolutionDE](https://github.com/jolution)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.
Please adhere to this project's `code of conduct`.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Roadmap

- [ ] Add mobile Support / Responsive
- [x] Cleanup: Remove unneeded comment-lines
- [ ] Add Files from CDN to local
- [ ] When deleting the user, issue a warning message that the user's data will be deleted as well.
- [ ] When deleting the user, delete the user's data as well.
- [x] Add new Logo
- [ ] Add Favicons
- [x] Add new Colors
- [ ] Add new Names
- [ ] Add Credits
- [x] Add Sponsor
- [ ] Add requirement docs
- [ ] Maybe add user stories
- [ ] Login Error only shows in Console not in Browser
- [ ] Translation to english (see https://kazupon.github.io/vue-i18n/)
- [ ] Security Check (php, docker, pwd)
- [ ] Extend this readme.md (see https://readme.so/de/editor)
- [ ] Query security -> mysqli_real_escape_string() and "?" param in SQL
- [ ] Add Email reminder to add time (see https://www.freecodecamp.org/news/send-emails-from-your-vue-application/)
- [ ] Integrate node.js
- [ ] Add Docker

## Sponsor

Many thanks to JetBrains, which provided us with a yearly license for all their programs for the open source work on this project.

<img style="max-width: 50px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.png" alt="WebStorm logo.">

## License

[MIT](https://choosealicense.com/licenses/mit/)
