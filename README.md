# jepretgram
jepretgram by Ahmad Nizar for Live code phase2

## Getting Started

Aplikasi web jepretgram adalah sebuah aplikasi yang memiliki fitur utama untuk membagikan foto-foto
ke seluruh pengguna jepretgram. Didalam sistemnya akan terdiri dari dua bagian utama yaitu client dan server. Disisi client, teknologi yang dipakai ialah vue.js, vue-router, vuex, bootstrap css dan webpack. Disisi server (back-end), teknologi yang dipakai ialah express-js, multer, body-parser, mongoo-DB dan mongoose ODM.

### Installing

Kalian membutuhkan 2 terminal untuk menjalankan kedua sisi aplikasi

```
Client-side
- npm install
- npm run dev
```

```
server-side
- npm install
- npm run start
```

### API End-Point

Berikut adalah daftar end-point API dari aplikasi ini

```
User
- /users/register || method: POST || Register new users
- /users/login    || method: POST || Login for users
```

```
Photo
- /photos         || method: GET || Get All Photo
- /photos/:id     || method: GET || Get Specific Photo By Id
- /photos         || method: POST|| Post a photo
- /photos/:id     || method: PUT || Update a photo by id
- /photos/:id     || method: DELETE || Delete a photo by id
```

## Authors

* **Ahmad Nizar** - *Initial work* - [JepretGRAM](https://github.com/AhmadNizar)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

